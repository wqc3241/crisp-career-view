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
      <div className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-lg">
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-background border border-border">
          <img src={logo} alt={`${name} logo`} className="w-full h-full object-contain p-2" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{roleTitle}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>

          <ul className="text-foreground mt-3 leading-relaxed list-disc pl-5 space-y-1">
            {keyImpact.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
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
