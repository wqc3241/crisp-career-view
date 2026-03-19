import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GITHUB_USER = "wqc3241";
const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Fetch all public repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`);
    const repos = await reposRes.json();

    const repoNames = new Set<string>();
    const results: string[] = [];

    for (const repo of repos) {
      if (repo.fork || repo.archived) continue;
      repoNames.add(repo.name);

      // 2. Fetch README
      let readmeContent = "";
      try {
        const readmeRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/readme`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (readmeRes.ok) {
          const readmeData = await readmeRes.json();
          const decoded = atob(readmeData.content.replace(/\n/g, ""));
          readmeContent = decoded.substring(0, 8000); // Limit for AI context
        }
      } catch {
        // No README, will use repo description
      }

      // 3. Generate structured content via AI
      const prompt = `You are generating structured product page data for a portfolio website. Based on the following GitHub repository information, generate a JSON object.

Repository name: ${repo.name}
Repository description: ${repo.description || "No description"}
Language: ${repo.language || "Unknown"}
Stars: ${repo.stargazers_count}
Topics: ${(repo.topics || []).join(", ")}

README content:
${readmeContent || "No README available."}

Generate a JSON object with these exact fields:
{
  "title": "Human-readable project name",
  "tagline": "One compelling sentence about the project",
  "description": "2-3 sentence overview of the project",
  "vision": "2-3 sentences about the project's vision and goals",
  "painpoints": ["problem 1", "problem 2", "problem 3", "problem 4"],
  "customer_segments": [
    {"title": "Segment 1", "description": "Who they are and why they need this"},
    {"title": "Segment 2", "description": "Who they are and why they need this"},
    {"title": "Segment 3", "description": "Who they are and why they need this"}
  ],
  "features": [
    {"title": "Feature 1", "description": "What it does and why it matters"},
    {"title": "Feature 2", "description": "What it does and why it matters"},
    {"title": "Feature 3", "description": "What it does and why it matters"},
    {"title": "Feature 4", "description": "What it does and why it matters"}
  ],
  "tech_stack": ["Tech1", "Tech2", "Tech3"],
  "metrics": [
    {"value": "some number or stat", "label": "what it measures"},
    {"value": "some number or stat", "label": "what it measures"}
  ],
  "future_improvements": ["improvement 1", "improvement 2", "improvement 3", "improvement 4", "improvement 5"],
  "tags": ["tag1", "tag2", "tag3"],
  "card_description": "One sentence for the project card thumbnail"
}

Important: Make the content professional, specific to the actual project, and engaging. Use real details from the README when available. Return ONLY the JSON object, no markdown or extra text.`;

      try {
        const aiRes = await fetch(AI_GATEWAY_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [{ role: "user", content: prompt }],
            tools: [
              {
                type: "function",
                function: {
                  name: "generate_project_data",
                  description: "Generate structured project page data",
                  parameters: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      tagline: { type: "string" },
                      description: { type: "string" },
                      vision: { type: "string" },
                      painpoints: { type: "array", items: { type: "string" } },
                      customer_segments: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            description: { type: "string" },
                          },
                          required: ["title", "description"],
                        },
                      },
                      features: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            description: { type: "string" },
                          },
                          required: ["title", "description"],
                        },
                      },
                      tech_stack: { type: "array", items: { type: "string" } },
                      metrics: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            value: { type: "string" },
                            label: { type: "string" },
                          },
                          required: ["value", "label"],
                        },
                      },
                      future_improvements: { type: "array", items: { type: "string" } },
                      tags: { type: "array", items: { type: "string" } },
                      card_description: { type: "string" },
                    },
                    required: [
                      "title", "tagline", "description", "vision", "painpoints",
                      "customer_segments", "features", "tech_stack", "metrics",
                      "future_improvements", "tags", "card_description",
                    ],
                  },
                },
              },
            ],
            tool_choice: { type: "function", function: { name: "generate_project_data" } },
          }),
        });

        if (!aiRes.ok) {
          const errText = await aiRes.text();
          console.error(`AI error for ${repo.name}: ${aiRes.status} ${errText}`);
          results.push(`${repo.name}: AI error ${aiRes.status}`);
          continue;
        }

        const aiData = await aiRes.json();
        const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
        if (!toolCall) {
          console.error(`No tool call response for ${repo.name}`);
          results.push(`${repo.name}: No tool call in AI response`);
          continue;
        }

        const generated = JSON.parse(toolCall.function.arguments);
        const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

        // 4. Upsert into github_projects
        const { error } = await supabase.from("github_projects").upsert(
          {
            repo_name: repo.name,
            slug,
            title: generated.title,
            tagline: generated.tagline,
            description: generated.description,
            vision: generated.vision,
            painpoints: generated.painpoints,
            customer_segments: generated.customer_segments,
            features: generated.features,
            tech_stack: generated.tech_stack,
            metrics: generated.metrics,
            future_improvements: generated.future_improvements,
            tags: generated.tags,
            card_description: generated.card_description,
            github_link: repo.html_url,
            demo_link: repo.homepage || null,
            images: [],
            last_synced_at: new Date().toISOString(),
          },
          { onConflict: "repo_name" }
        );

        if (error) {
          console.error(`DB error for ${repo.name}:`, error);
          results.push(`${repo.name}: DB error`);
        } else {
          results.push(`${repo.name}: synced`);
        }
      } catch (e) {
        console.error(`Error processing ${repo.name}:`, e);
        results.push(`${repo.name}: error`);
      }

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 1500));
    }

    // 5. Mark removed repos as not visible
    const { data: existingProjects } = await supabase
      .from("github_projects")
      .select("repo_name")
      .eq("is_visible", true);

    if (existingProjects) {
      for (const project of existingProjects) {
        if (!repoNames.has(project.repo_name)) {
          await supabase
            .from("github_projects")
            .update({ is_visible: false })
            .eq("repo_name", project.repo_name);
          results.push(`${project.repo_name}: marked hidden (removed from GitHub)`);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sync-github-projects error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
