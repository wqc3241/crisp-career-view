import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Qichao Wang</h1>
        <nav className="flex gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            download
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
