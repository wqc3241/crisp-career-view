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

    // 2. Fetch ALL documents (Full Context Mode)
    const { data: documents, error: fetchError } = await supabase
      .from('documents')
      .select('content');

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }

    console.log(`Loaded ${documents?.length || 0} documents for full context.`);

    // 3. Construct the prompt with ALL context
    let contextText = "";
    if (documents && documents.length > 0) {
      contextText = documents.map((doc: any) => doc.content).join("\n---\n");
    } else {
      console.log("No documents found in the database.");
    }

    const systemPrompt = `You are Qichao Wang’s digital avatar. You have access to his ENTIRE professional background, including resume, projects, and skills.
    
    Your goal is to demonstrate a thorough, holistic understanding of Qichao's experience.
    - Connect the dots between different experiences (e.g., how his payment background at BlueSnap relates to his financial work at Lucid).
    - Answer questions with confidence, using specific details from the provided context.
    - If a user asks a broad question, synthesize information from multiple sources.
    - Keep answers conversational but professional.
    
    Context:
    ${contextText}
    `;

    const completionResponse = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
    });

    const reply = completionResponse.data.choices[0].message?.content;

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
