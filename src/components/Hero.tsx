import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
        Alex Doe
      </h1>
      <p className="text-xl sm:text-2xl text-primary font-medium mb-6">
        Senior Product Manager
      </p>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
        I specialize in building user-centric products that bridge the gap between
        technology and business goals. With a passion for AI and data-driven
        decisions, I thrive on creating impactful digital experiences.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
