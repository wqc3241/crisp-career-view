-- Drop the existing policy
DROP POLICY IF EXISTS "Only admins can view all profiles" ON public.profiles;

-- Create a new policy that explicitly requires authentication AND admin role
CREATE POLICY "Only authenticated admins can view profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Explicitly deny all access to anonymous users
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false);