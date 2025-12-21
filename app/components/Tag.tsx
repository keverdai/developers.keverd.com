import Link from "next/link";
import { cn } from "../lib/utils";

interface TagProps {
  children: React.ReactNode;
  href?: string;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function Tag({
  children,
  href,
  variant = "default",
  className,
}: TagProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    primary: "bg-keverd-blue/10 text-keverd-blue hover:bg-keverd-blue/20",
    secondary: "bg-keverd-gold/20 text-keverd-clay hover:bg-keverd-gold/30",
  };

  const content = (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

