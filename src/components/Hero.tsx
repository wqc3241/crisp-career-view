import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RESUME_FILE_PATH, RESUME_BUCKET } from "@/constants/config";
import AvatarChat from "@/components/chat/AvatarChat";
import { Linkedin, Github, FileText } from "lucide-react";

const Hero = () => {
  const { user, isAdmin } = useAuth();

  const handleResumeView = () => {
    const { data } = supabase.storage.from(RESUME_BUCKET).getPublicUrl(RESUME_FILE_PATH);
    window.open(data.publicUrl, "_blank");
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center">
      {user ? (
        <p className="text-sm text-muted-foreground mb-3">
          Welcome back{isAdmin ? ", Admin" : ""} · {user.email}
        </p>
      ) : (
        <div className="mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Qichao Wang
            <span className="text-primary font-medium text-lg sm:text-xl ml-2">· Experienced Product Manager</span>
          </h1>
        </div>
      )}

      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <AvatarChat />
        <a href="https://www.linkedin.com/in/qichaowang/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href="https://github.com/wqc3241" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
          <Github size={20} />
        </a>
        <button onClick={handleResumeView} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Resume">
          <FileText size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
