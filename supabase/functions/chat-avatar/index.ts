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

    // 2. Generate embedding for the user's query
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: query,
    });

    const embedding = embeddingResponse.data.data[0].embedding;

    // 3. Search for relevant documents
    const { data: documents, error: searchError } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.1,
      match_count: 10, // Increased from 5 to 10 to get more context
    });

    if (searchError) {
      console.error("Search error:", searchError);
      throw searchError;
    }

    console.log(`Found ${documents?.length || 0} documents for query: "${query}"`);

    // 4. Construct the prompt with context
    let contextText = "";
    if (documents && documents.length > 0) {
      contextText = documents.map((doc: any) => doc.content).join("\n---\n");
    } else {
      console.log("No documents found matching the criteria.");
    }

    const systemPrompt = `You are Qichao Wang’s digital avatar. Use the provided context to answer questions about his experience, skills, and projects.
    If the context contains relevant information, use it to form a comprehensive answer.
    If the context is empty or irrelevant, politely state that you don't have that specific information but offer to discuss his known projects (Lucid Motors, BlueSnap, etc.).
    
    Keep your answers conversational, professional, and concise (under 3 sentences if possible).
    
    Context:
    ${contextText}
    `;

    // 5. Generate response from OpenAI
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
