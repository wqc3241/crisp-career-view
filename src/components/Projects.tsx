import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";
import CompanyListItem from "./CompanyListItem";
import { companies, sideProjects } from "@/constants/projectData";

const Projects = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Projects;
