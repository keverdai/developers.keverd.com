"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface SDKNavigationProps {
  currentSDK: "android" | "javascript" | "react" | "vue" | "angular";
  className?: string;
}

const sdkOrder = [
  { id: "android", name: "Android SDK", href: "/docs/android" },
  { id: "javascript", name: "Vanilla JavaScript SDK", href: "/docs/javascript" },
  { id: "react", name: "React SDK", href: "/docs/react" },
  { id: "vue", name: "Vue.js SDK", href: "/docs/vue" },
  { id: "angular", name: "Angular SDK", href: "/docs/angular" },
];

export function SDKNavigation({ currentSDK, className }: SDKNavigationProps) {
  const currentIndex = sdkOrder.findIndex((sdk) => sdk.id === currentSDK);
  const nextSDK = currentIndex < sdkOrder.length - 1 ? sdkOrder[currentIndex + 1] : null;

  if (!nextSDK) {
    // If it's the last SDK, link to API Reference
    return (
      <div className={cn("mt-12 pt-8 border-t border-gray-200", className)}>
        <Link
          href="/docs/api"
          className="group flex items-center justify-between w-full p-6 bg-white/50 rounded-xl border border-gray-200 hover:border-keverd-blue hover:bg-keverd-blue/5 transition-all"
        >
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Next Documentation</p>
            <p className="text-lg font-semibold text-keverd-ink group-hover:text-keverd-blue transition-colors">
              API Reference
            </p>
          </div>
          <ArrowRight className="text-keverd-blue flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform" size={24} />
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("mt-12 pt-8 border-t border-gray-200", className)}>
      <Link
        href={nextSDK.href}
        className="group flex items-center justify-between w-full p-4 sm:p-6 bg-white/50 rounded-xl border border-gray-200 hover:border-keverd-blue hover:bg-keverd-blue/5 transition-all"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">Next SDK Documentation</p>
          <p className="text-base sm:text-lg font-semibold text-keverd-ink group-hover:text-keverd-blue transition-colors truncate">
            View {nextSDK.name}
          </p>
        </div>
        <ArrowRight className="text-keverd-blue flex-shrink-0 ml-2 sm:ml-4 group-hover:translate-x-1 transition-transform" size={20} />
      </Link>
    </div>
  );
}

