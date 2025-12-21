"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "../lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search documentation...",
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 bg-white border-2 rounded-xl transition-all",
          isFocused
            ? "border-keverd-blue shadow-lg shadow-keverd-blue/10"
            : "border-gray-200 hover:border-gray-300"
        )}
      >
        <Search
          className={cn(
            "transition-colors",
            isFocused ? "text-keverd-blue" : "text-gray-400"
          )}
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 outline-none text-keverd-ink placeholder:text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Clear search"
          >
            <X className="text-gray-400" size={16} />
          </button>
        )}
        <kbd className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-mono text-gray-600">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </div>
    </form>
  );
}

