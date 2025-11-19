-- Allow authenticated admins to delete documents
CREATE POLICY "Authenticated admins can delete documents"
ON documents
FOR DELETE
TO public
USING (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow authenticated admins to update documents
CREATE POLICY "Authenticated admins can update documents"
ON documents
FOR UPDATE
TO public
USING (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
);