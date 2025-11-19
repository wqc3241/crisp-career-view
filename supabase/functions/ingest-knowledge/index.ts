import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { items } = await req.json();

        if (!items || !Array.isArray(items)) {
            throw new Error('Invalid input: items array required');
        }

        const openAiKey = Deno.env.get('OPENAI_API_KEY');
        if (!openAiKey) {
            throw new Error('OPENAI_API_KEY is not set');
        }

        const configuration = new Configuration({ apiKey: openAiKey });
        const openai = new OpenAIApi(configuration);

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Process items in batches to avoid hitting rate limits
        const results = [];
        for (const item of items) {
            // Create a text representation of the item
            const content = `
        Type: ${item.type}
        Title: ${item.title || item.name}
        Description: ${item.description || item.roleTitle}
        Details: ${item.keyImpact ? item.keyImpact.join('. ') : ''}
        Tags: ${item.tags ? item.tags.join(', ') : ''}
      `.trim();

            const embeddingResponse = await openai.createEmbedding({
                model: 'text-embedding-3-small',
                input: content,
            });

            const embedding = embeddingResponse.data.data[0].embedding;

            const { error } = await supabase.from('documents').upsert({
                content,
                metadata: item,
                embedding,
            });

            if (error) {
                console.error('Error inserting document:', error);
                results.push({ status: 'error', error });
            } else {
                results.push({ status: 'success', title: item.title || item.name });
            }
        }

        return new Response(JSON.stringify({ results }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
