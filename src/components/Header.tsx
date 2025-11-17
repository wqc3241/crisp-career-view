import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleResumeDownload = () => {
    window.open('https://1drv.ms/b/c/3df2fe05e1e8b622/IQBqQt12-NImS4VU5t4TZbewAYrQSViKhYa5ysAKTUiMp-g?e=OISWPX', '_blank');
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
