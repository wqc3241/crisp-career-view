import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";
import CompanyListItem from "./CompanyListItem";
import GithubProjectListItem from "./GithubProjectListItem";
import { companies, sideProjects } from "@/constants/projectData";
import { useGithubProjects } from "@/hooks/useGithubProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
const Projects = () => {
  const { data: githubProjects, isLoading } = useGithubProjects();

  const featuredProjects = useMemo(
    () => githubProjects?.filter((p) => !!p.demo_link) ?? [],
    [githubProjects]
  );
  const otherProjects = useMemo(
    () => githubProjects?.filter((p) => !p.demo_link) ?? [],
    [githubProjects]
  );
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Tabs defaultValue="side" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="side">AI Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="career" className="mt-0">
          <div className="space-y-4">
            {companies.map((company) => (
              <CompanyListItem key={company.name} {...company} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="side" className="mt-0">
          {/* Static projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          {/* Dynamic GitHub projects */}
          {isLoading && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {githubProjects && githubProjects.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground font-medium">More from GitHub</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.card_description || project.description}
                    image={project.card_image || (project.images && project.images.length > 0 ? project.images[0] : "/placeholder.svg")}
                    tags={project.tags || []}
                    link={`/projects/${project.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Projects;
