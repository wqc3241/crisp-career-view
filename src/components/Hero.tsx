import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const handleResumeDownload = () => {
    window.open('https://1drv.ms/b/c/3df2fe05e1e8b622/IQBqQt12-NImS4VU5t4TZbewAYrQSViKhYa5ysAKTUiMp-g?e=OISWPX', '_blank');
  };
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-2">
        Qichao Wang
      </h1>
      <p className="text-xl sm:text-2xl text-primary font-medium mb-3">
        Senior Product Manager
      </p>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
        I specialize in building user-centric products that bridge the gap between
        technology and business goals. With a passion for AI and data-driven
        decisions, I thrive on creating impactful digital experiences.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <a
            href="https://www.linkedin.com/in/qichaowang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn
          </a>
        </Button>
        <Button variant="outline" onClick={handleResumeDownload}>
          Download Resume
        </Button>
      </div>
    </section>
  );
};

export default Hero;
