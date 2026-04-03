import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";
import CompanyListItem from "./CompanyListItem";
import GithubProjectListItem from "./GithubProjectListItem";
import { companies, sideProjects } from "@/constants/projectData";
import { useGithubProjects } from "@/hooks/useGithubProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const Projects = () => {
  const { data: githubProjects, isLoading } = useGithubProjects();
  const [currentPage, setCurrentPage] = useState(1);

  const featuredProjects = useMemo(
    () => githubProjects?.filter((p) => !!p.demo_link) ?? [],
    [githubProjects]
  );
  const otherProjects = useMemo(
    () => githubProjects?.filter((p) => !p.demo_link) ?? [],
    [githubProjects]
  );

  const totalPages = Math.ceil(otherProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(
    () => otherProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [otherProjects, currentPage]
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

          {otherProjects.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground font-medium">More from GitHub</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="divide-y divide-border">
                {paginatedProjects.map((project) => (
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
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Projects;
