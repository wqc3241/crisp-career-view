import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const handleResumeDownload = async () => {
    const { data } = supabase.storage
      .from('resumes')
      .getPublicUrl('Qichao_Wang_Resume.pdf');
    
    window.open(data.publicUrl, '_blank');
  };
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Qichao Wang</h1>
        <nav className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/qichaowang/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={handleResumeDownload}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Resume
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
