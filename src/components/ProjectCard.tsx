import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const ProjectCard = ({ title, description, image, tags, link }: ProjectCardProps) => {
  const content = (
    <>
      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );

  if (link) {
    return (
      <Link 
        to={link}
        className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow block cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {content}
    </div>
  );
};

export default ProjectCard;
