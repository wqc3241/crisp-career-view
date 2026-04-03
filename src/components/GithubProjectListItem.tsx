import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { ChevronRight } from "lucide-react";

interface GithubProjectListItemProps {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  githubLink: string;
}

const GithubProjectListItem = ({ title, description, tags, slug }: GithubProjectListItemProps) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="group flex items-start gap-4 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-md">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {title}
            </h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GithubProjectListItem;
