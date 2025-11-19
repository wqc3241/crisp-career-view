-- Enable the pgvector extension to work with embedding vectors
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table to store your documents
CREATE TABLE IF NOT EXISTS public.documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Allow public read access to documents (for the chatbot to query)
CREATE POLICY "Public read access to documents"
ON public.documents
FOR SELECT
USING (true);

-- Allow authenticated users to insert documents (for knowledge base management)
CREATE POLICY "Authenticated users can insert documents"
ON public.documents
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Create a function to search for documents
CREATE OR REPLACE FUNCTION public.match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  FROM public.documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create an index for faster vector similarity searches
CREATE INDEX IF NOT EXISTS documents_embedding_idx ON public.documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);