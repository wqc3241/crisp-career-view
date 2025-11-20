import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      throw new Error("No query provided");
    }

    // 1. Initialize OpenAI and Supabase
    const openAiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Fetch ALL documents (Full Context Mode) - including metadata for better context
    console.log(`[${new Date().toISOString()}] Fetching all documents from knowledge base...`);
    const { data: documents, error: fetchError } = await supabase
      .from('documents')
      .select('content, metadata');

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }

    const docCount = documents?.length || 0;
    console.log(`[${new Date().toISOString()}] Successfully loaded ${docCount} documents`);

    if (docCount === 0) {
      console.warn("WARNING: No documents found in the database!");
      throw new Error("Knowledge base is empty");
    }

    // 3. Construct structured context with section markers
    let contextText = "";
    if (documents && documents.length > 0) {
      contextText = documents.map((doc: any, index: number) => {
        const metadata = doc.metadata || {};
        const docType = metadata.type || metadata.source || `Document ${index + 1}`;
        return `=== ${docType.toUpperCase()} ===\n${doc.content}`;
      }).join("\n\n---\n\n");
    }

    const systemPrompt = `You are Qichao Wang's AI avatar with COMPLETE and DETAILED access to his professional background.

CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE RULES:
1. You have EXTENSIVE information about Qichao in the context below
2. NEVER say "I don't know", "I'm not sure", or "I don't have specific information" when the context contains relevant details
3. ALWAYS answer with SPECIFIC facts: cite actual numbers, dates, company names, technologies, and achievements
4. When asked about experience, roles, or projects, provide concrete examples and accomplishments from the context
5. Be confident, detailed, and informative - you ARE Qichao's professional representative
6. Connect experiences across different roles when relevant (e.g., how payment expertise at BlueSnap applies to financial work at Lucid)
7. Keep responses conversational but professional - 2-4 sentences unless more detail is requested

RESPONSE EXAMPLES:
❌ BAD: "I don't have specific details about that role"
✅ GOOD: "At BlueSnap, I optimized global payment flows, reducing checkout friction by 25% and launched fraud prevention that decreased chargebacks by 40%"

❌ BAD: "I have some product management experience"
✅ GOOD: "I'm currently Sr. Product Manager for Financial Services at Lucid Motors, and previously led payment optimization at BlueSnap where I drove $50M+ in annual transaction value"

AVAILABLE INFORMATION ABOUT QICHAO:
${contextText}

Now answer user questions using ONLY the specific details from the context above.`;

    console.log(`[${new Date().toISOString()}] Calling OpenAI with query: "${query.substring(0, 50)}..."`);

    const completionResponse = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
      import "https://deno.land/x/xhr@0.1.0/mod.ts";
      import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
      import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      };

      serve(async (req) => {
      if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
      }

      try {
        const { query, captchaToken } = await req.json();

        if (!query) {
          return new Response(JSON.stringify({ error: "No query provided" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          });
        }

        // Verify Turnstile Token
        const turnstileSecret = Deno.env.get("CLOUDFLARE_SECRET_KEY") || "1x00000000000000000000AA"; // Default to test key if not set
        const ip = req.headers.get("CF-Connecting-IP");

        const formData = new FormData();
        formData.append("secret", turnstileSecret);
        formData.append("response", captchaToken);
        formData.append("remoteip", ip || "");

        const turnstileResult = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            body: formData,
          }
        );

        const turnstileOutcome = await turnstileResult.json();

        if (!turnstileOutcome.success) {
          console.error("Turnstile validation failed:", turnstileOutcome);
          return new Response(JSON.stringify({ error: "Captcha validation failed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 403,
          });
        }

        // 1. Initialize OpenAI and Supabase
        const openAiKey = Deno.env.get("OPENAI_API_KEY");
        if (!openAiKey) {
          throw new Error("OPENAI_API_KEY is not set");
        }

        const configuration = new Configuration({ apiKey: openAiKey });
        const openai = new OpenAIApi(configuration);

        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // 2. Fetch ALL documents (Full Context Mode) - including metadata for better context
        console.log(`[${new Date().toISOString()}] Fetching all documents from knowledge base...`);
        const { data: documents, error: fetchError } = await supabase
          .from('documents')
          .select('content, metadata');

        if (fetchError) {
          console.error("Fetch error:", fetchError);
          throw fetchError;
        }

        const docCount = documents?.length || 0;
        console.log(`[${new Date().toISOString()}] Successfully loaded ${docCount} documents`);

        if (docCount === 0) {
          console.warn("WARNING: No documents found in the database!");
          throw new Error("Knowledge base is empty");
        }

        // 3. Construct structured context with section markers
        let contextText = "";
        if (documents && documents.length > 0) {
          contextText = documents.map((doc: any, index: number) => {
            const metadata = doc.metadata || {};
            const docType = metadata.type || metadata.source || `Document ${index + 1}`;
            return `=== ${docType.toUpperCase()} ===\n${doc.content}`;
          }).join("\n\n---\n\n");
        }

        const systemPrompt = `You are Qichao Wang's AI avatar with COMPLETE and DETAILED access to his professional background.

CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE RULES:
1. You have EXTENSIVE information about Qichao in the context below
2. NEVER say "I don't know", "I'm not sure", or "I don't have specific information" when the context contains relevant details
3. ALWAYS answer with SPECIFIC facts: cite actual numbers, dates, company names, technologies, and achievements
4. When asked about experience, roles, or projects, provide concrete examples and accomplishments from the context
5. Be confident, detailed, and informative - you ARE Qichao's professional representative
6. Connect experiences across different roles when relevant (e.g., how payment expertise at BlueSnap applies to financial work at Lucid)
7. Keep responses conversational but professional - 2-4 sentences unless more detail is requested

RESPONSE EXAMPLES:
❌ BAD: "I don't have specific details about that role"
✅ GOOD: "At BlueSnap, I optimized global payment flows, reducing checkout friction by 25% and launched fraud prevention that decreased chargebacks by 40%"

❌ BAD: "I have some product management experience"
✅ GOOD: "I'm currently Sr. Product Manager for Financial Services at Lucid Motors, and previously led payment optimization at BlueSnap where I drove $50M+ in annual transaction value"

AVAILABLE INFORMATION ABOUT QICHAO:
${contextText}

Now answer user questions using ONLY the specific details from the context above.`;

        console.log(`[${new Date().toISOString()}] Calling OpenAI with query: "${query.substring(0, 50)}..."`);

        const completionResponse = await openai.createChatCompletion({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query },
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        const reply = completionResponse.data.choices[0].message?.content;
        console.log(`[${new Date().toISOString()}] OpenAI response generated (${reply?.length || 0} chars)`);

        return new Response(JSON.stringify({ reply }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    });
