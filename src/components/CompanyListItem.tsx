import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { ChevronRight } from "lucide-react";

interface CompanyListItemProps {
  name: string;
  logo: string;
  roleTitle: string;
  keyImpact: string[];
  tags: string[];
  link: string;
}

const CompanyListItem = ({ name, logo, roleTitle, keyImpact, tags, link }: CompanyListItemProps) => {
  return (
    <Link to={link}>
      <div className="group flex flex-col sm:flex-row items-start gap-2 sm:gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-lg">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-background border border-border">
          <img src={logo} alt={`${name} logo`} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{roleTitle}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>

          <ul className="text-xs text-foreground mt-1.5 leading-relaxed list-disc pl-4 space-y-0.5">
            {keyImpact.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyListItem;
