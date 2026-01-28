import React from "react";
import { cn } from "../lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

export function Button({ 
  variant = "primary", 
  size = "md",
  className, 
  children, 
  href,
  ...props 
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  const variantClasses = {
    primary: "btn-primary rounded-lg",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg px-6 py-3 transition-colors duration-200 font-medium",
    ghost: "btn-ghost rounded-lg",
    outline: "border-2 border-keverd-blue/40 bg-white text-keverd-ink hover:bg-keverd-blue/10 hover:border-keverd-blue/60 rounded-lg transition-colors duration-200",
  };
  
  const baseClasses = cn(
    variantClasses[variant],
    variant !== "primary" && sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...(props as any)}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}

