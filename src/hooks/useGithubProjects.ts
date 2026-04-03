import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GithubProject {
  id: string;
  repo_name: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  vision: string;
  painpoints: string[];
  customer_segments: { title: string; description: string }[];
  features: { title: string; description: string }[];
  tech_stack: string[];
  metrics: { value: string; label: string }[];
  future_improvements: string[];
  demo_link: string | null;
  github_link: string;
  test_email: string | null;
  test_password: string | null;
  card_image: string | null;
  card_description: string | null;
  tags: string[];
  is_visible: boolean;
  display_order: number;
  repo_created_at: string | null;
}

export const useGithubProjects = () => {
  return useQuery({
    queryKey: ["github-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("github_projects")
        .select("*")
        .eq("is_visible", true)
        .order("repo_created_at", { ascending: false, nullsFirst: false });

      if (error) throw error;

      return (data as unknown as GithubProject[]) ?? [];
    },
  });
};

export const useGithubProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["github-project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("github_projects")
        .select("*")
        .eq("slug", slug)
        .eq("is_visible", true)
        .single();

      if (error) throw error;

      return data as unknown as GithubProject;
    },
    enabled: !!slug,
  });
};
