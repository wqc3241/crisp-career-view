-- Make the project bucket public so slideshow images can be accessed
UPDATE storage.buckets 
SET public = true 
WHERE name = 'project';