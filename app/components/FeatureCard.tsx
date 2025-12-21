import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Card } from "./Card";
import { cn } from "../lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  tags?: string[];
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  tags = [],
  className,
}: FeatureCardProps) {
  const content = (
    <Card className={cn("group h-full", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-keverd-blue/10 rounded-xl group-hover:bg-keverd-blue/20 transition-colors">
          <Icon className="text-keverd-blue" size={24} />
        </div>
        {href && (
          <ArrowRight className="text-gray-400 group-hover:text-keverd-blue group-hover:translate-x-1 transition-all" size={20} />
        )}
      </div>
      <h3 className="keverd-card-title mb-2">{title}</h3>
      <p className="keverd-card-body mb-4">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

