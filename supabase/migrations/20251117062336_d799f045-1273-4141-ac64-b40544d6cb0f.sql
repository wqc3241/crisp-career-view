-- Allow admins to view files in the project bucket
CREATE POLICY "Admins can view project files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'project' 
  AND has_role(auth.uid(), 'admin'::app_role)
);