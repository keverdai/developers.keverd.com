"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface TableOfContentsItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={cn("hidden lg:block w-64 flex-shrink-0", className)}>
      <div className="sticky top-20 pt-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
          On This Page
        </h3>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm transition-colors rounded-lg",
                  "hover:bg-keverd-blue/10 hover:text-keverd-blue",
                  activeId === item.id
                    ? "bg-keverd-blue/15 text-keverd-blue font-semibold"
                    : "text-gray-600"
                )}
                style={{
                  paddingLeft: item.level && item.level > 1 ? `${1 + item.level * 0.5}rem` : "1rem",
                }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

