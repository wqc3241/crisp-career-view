
-- Create github_projects table
CREATE TABLE public.github_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  images text[] DEFAULT '{}',
  vision text NOT NULL DEFAULT '',
  painpoints text[] DEFAULT '{}',
  customer_segments jsonb DEFAULT '[]',
  features jsonb DEFAULT '[]',
  tech_stack text[] DEFAULT '{}',
  metrics jsonb DEFAULT '[]',
  future_improvements text[] DEFAULT '{}',
  demo_link text,
  github_link text NOT NULL DEFAULT '',
  test_email text,
  test_password text,
  card_image text,
  card_description text,
  tags text[] DEFAULT '{}',
  is_visible boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  last_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.github_projects ENABLE ROW LEVEL SECURITY;

-- Public read access (portfolio visitors)
CREATE POLICY "Anyone can view visible github projects"
ON public.github_projects FOR SELECT
USING (is_visible = true);

-- Admin-only write
CREATE POLICY "Admins can insert github projects"
ON public.github_projects FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update github projects"
ON public.github_projects FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete github projects"
ON public.github_projects FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Timestamp trigger
CREATE TRIGGER update_github_projects_updated_at
BEFORE UPDATE ON public.github_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable extensions for cron
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
