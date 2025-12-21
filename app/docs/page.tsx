import Link from "next/link";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Smartphone, Globe, Code, FileCode, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DocsPage() {
  const sdks = [
    {
      name: "Android SDK",
      description: "Complete Kotlin-based SDK for Android applications",
      href: "/docs/android",
      icon: Smartphone,
      status: "ready",
    },
    {
      name: "Vanilla JavaScript",
      description: "Universal JavaScript SDK for any web application",
      href: "/docs/javascript",
      icon: Globe,
      status: "ready",
    },
    {
      name: "React SDK",
      description: "React hooks and components for React applications",
      href: "/docs/react",
      icon: Code,
      status: "ready",
    },
    {
      name: "Vue.js SDK",
      description: "Vue 3 composables and plugin for Vue.js applications",
      href: "/docs/vue",
      icon: FileCode,
      status: "ready",
    },
    {
      name: "Angular SDK",
      description: "Angular service and module for Angular applications",
      href: "/docs/angular",
      icon: FileCode,
      status: "ready",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-12">
        <h1 className="section-title mb-6">Documentation</h1>
        <p className="text-gray-600 text-lg">
          Comprehensive guides and API references for all Keverd SDKs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sdks.map((sdk) => {
          const Icon = sdk.icon;
          return (
            <Link key={sdk.name} href={sdk.href}>
              <Card className="hover:border-keverd-blue transition-colors cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-keverd-blue/10 rounded-xl">
                    <Icon className="text-keverd-blue" size={24} />
                  </div>
                  {sdk.status === "ready" && (
                    <CheckCircle2 className="text-green-600" size={20} />
                  )}
                  {sdk.status === "coming-soon" && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                      Soon
                    </span>
                  )}
                </div>
                <h3 className="keverd-card-title mb-2">{sdk.name}</h3>
                <p className="keverd-card-body">{sdk.description}</p>
                <div className="mt-4 flex items-center text-keverd-blue font-medium text-sm">
                  View documentation
                  <ArrowRight className="ml-2" size={16} />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

