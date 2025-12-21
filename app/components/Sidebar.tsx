"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  status?: "ready" | "coming-soon";
}

const sdkItems: SidebarItem[] = [
  { label: "API Reference", href: "/docs/api", status: "ready" },
  { label: "Android SDK", href: "/docs/android", status: "ready" },
  { label: "Vanilla JavaScript", href: "/docs/javascript", status: "ready" },
  { label: "React SDK", href: "/docs/react", status: "ready" },
  { label: "Vue.js SDK", href: "/docs/vue", status: "ready" },
  { label: "Angular SDK", href: "/docs/angular", status: "ready" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 border-r border-gray-200 bg-gray-50 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-1">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              SDKs
            </h3>
            {sdkItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                    isActive
                      ? "bg-keverd-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span>{item.label}</span>
                  {item.status === "ready" && (
                    <CheckCircle2 size={14} className={cn(isActive ? "text-white" : "text-green-600")} />
                  )}
                  {item.status === "coming-soon" && (
                    <span className="text-xs text-gray-400">Soon</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

