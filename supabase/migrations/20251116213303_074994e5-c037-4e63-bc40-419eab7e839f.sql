-- Create a public storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Create RLS policies for the resumes bucket
CREATE POLICY "Public can view resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their resumes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete their resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');