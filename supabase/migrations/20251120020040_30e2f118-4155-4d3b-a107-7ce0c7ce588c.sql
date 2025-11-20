-- Remove public read access to documents table
DROP POLICY IF EXISTS "Public read access to documents" ON public.documents;

-- Allow only authenticated users to read documents
CREATE POLICY "Authenticated users can read documents"
ON public.documents
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);