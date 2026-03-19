import { useParams, useNavigate } from "react-router-dom";
import { useGithubProjectBySlug } from "@/hooks/useGithubProjects";
import ProductTemplate from "@/components/ProductTemplate";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DynamicProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useGithubProjectBySlug(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Skeleton className="h-10 w-40" />
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ProductTemplate
      name={project.title}
      tagline={project.tagline}
      description={project.description}
      images={project.images?.length ? project.images : ["/placeholder.svg"]}
      vision={project.vision}
      painpoints={project.painpoints || []}
      customerSegments={project.customer_segments || []}
      features={project.features || []}
      techStack={project.tech_stack || []}
      metrics={project.metrics || []}
      futureImprovements={project.future_improvements || []}
      demoLink={project.demo_link || undefined}
      githubLink={project.github_link || undefined}
      testEmail={project.test_email || undefined}
      testPassword={project.test_password || undefined}
    />
  );
};

export default DynamicProduct;
