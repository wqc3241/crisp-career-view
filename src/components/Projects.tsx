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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <Tabs defaultValue="side" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          {/* Dynamic GitHub projects */}
          {isLoading && (
            <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {featuredProjects.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground font-medium">More from GitHub</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {featuredProjects.map((project) => (
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

          {otherProjects.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground font-medium">Other Projects</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-2">
                {otherProjects.map((project) => (
                  <GithubProjectListItem
                    key={project.id}
                    title={project.title}
                    description={project.card_description || project.description}
                    tags={project.tags || []}
                    slug={project.slug}
                    githubLink={project.github_link}
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
