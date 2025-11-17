import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Header from "./Header";
import Footer from "./Footer";

interface CompanyProject {
  title: string;
  description: string;
  impact: string;
  tags: string[];
}

interface Metric {
  label: string;
  value: string;
}

interface CompanyTemplateProps {
  companyName: string;
  logo: string;
  roleTitle: string;
  duration: string;
  companyDescription: string;
  projects: CompanyProject[];
  keyMetrics: Metric[];
  techStack: string[];
  teamSize?: string;
  location?: string;
}

const CompanyTemplate = ({
  companyName,
  logo,
  roleTitle,
  duration,
  companyDescription,
  projects,
  keyMetrics,
  techStack,
  teamSize,
  location,
}: CompanyTemplateProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-background border border-border">
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="w-full h-full object-contain p-3"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {companyName}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                <span className="font-semibold text-foreground">{roleTitle}</span>
                <span>•</span>
                <span>{duration}</span>
                {location && (
                  <>
                    <span>•</span>
                    <span>{location}</span>
                  </>
                )}
                {teamSize && (
                  <>
                    <span>•</span>
                    <span>{teamSize}</span>
                  </>
                )}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        {keyMetrics.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Impact & Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric) => (
                <Card key={metric.label}>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">
                      {metric.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Key Projects & Initiatives</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="p-4 bg-accent/50 rounded-lg border-l-4 border-primary">
                    <p className="font-semibold text-sm text-foreground">Impact:</p>
                    <p className="text-sm text-muted-foreground mt-1">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Technologies & Skills</h2>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CompanyTemplate;
