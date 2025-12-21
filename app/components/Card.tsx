import React from "react";
import Link from "next/link";
import { cn } from "../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function Card({ children, className, onClick, href }: CardProps) {
  const cardContent = (
    <div
      className={cn("keverd-card", className, href && "cursor-pointer")}
      onClick={onClick}
      role={onClick || href ? "button" : undefined}
      tabIndex={onClick || href ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

