import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleResumeDownload = () => {
    const { data } = supabase.storage.from('resumes').getPublicUrl('QichaoWangResume.pdf');
    window.open(data.publicUrl, '_blank');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Qichao Wang</h1>
        <nav className="flex gap-4 items-center">
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
          
          {user && (
            <>
              {isAdmin && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="gap-2"
                >
                  Admin Panel
                  <Badge variant="default" className="text-xs">Admin</Badge>
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
