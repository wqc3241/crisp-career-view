import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Feature {
  title: string;
  description: string;
}

interface Metric {
  value: string;
  label: string;
}

interface CustomerSegment {
  title: string;
  description: string;
}

interface ProductTemplateProps {
  name: string;
  tagline: string;
  description: string;
  image: string;
  vision: string;
  painpoints: string[];
  customerSegments: CustomerSegment[];
  features: Feature[];
  techStack: string[];
  metrics: Metric[];
  futureImprovements: string[];
  demoLink?: string;
  githubLink?: string;
}

const ProductTemplate = ({
  name,
  tagline,
  description,
  image,
  vision,
  painpoints,
  customerSegments,
  features,
  techStack,
  metrics,
  futureImprovements,
  demoLink,
  githubLink,
}: ProductTemplateProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {name}
            </h1>
            <p className="text-xl text-primary font-medium mb-6">{tagline}</p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              {demoLink && (
                <Button asChild>
                  <a href={demoLink} target="_blank" rel="noopener noreferrer">
                    Try Demo
                  </a>
                </Button>
              )}
              {githubLink && (
                <Button variant="outline" asChild>
                  <a href={githubLink} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {vision}
          </p>
        </div>
      </section>

      {/* Painpoints Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Problems We Solve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painpoints.map((painpoint, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-muted/30"
            >
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-muted-foreground">{painpoint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Segmentation Section */}
      <section className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Who We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerSegments.map((segment) => (
              <Card key={segment.title}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {segment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {segment.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Future Improvements Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Future Roadmap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureImprovements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg border border-border"
            >
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-muted-foreground">{improvement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Interested in this project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how similar solutions can help your business grow.
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            View More Projects
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductTemplate;
