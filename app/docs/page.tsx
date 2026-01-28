"use client";

import Link from "next/link";
import { TableOfContents } from "../components/TableOfContents";
import { StructuredData } from "../components/StructuredData";
import { Smartphone, Globe, Code, FileCode, ArrowRight, CheckCircle2, FileText } from "lucide-react";

const tableOfContents = [
  { id: "overview", title: "Overview" },
  { id: "api-reference", title: "API Reference" },
  { id: "available-sdks", title: "Available SDKs" },
];

export default function DocsPage() {
  const sdks = [
    {
      name: "Android SDK",
      description: "Kotlin SDK for Android apps",
      href: "/docs/android",
      icon: Smartphone,
      status: "ready" as const,
    },
    {
      name: "Vanilla JavaScript",
      description: "Universal web SDK (framework-agnostic)",
      href: "/docs/javascript",
      icon: Globe,
      status: "ready" as const,
    },
    {
      name: "React SDK",
      description: "React provider + hooks",
      href: "/docs/react",
      icon: Code,
      status: "ready" as const,
    },
    {
      name: "Vue.js SDK",
      description: "Vue 3 plugin + composables",
      href: "/docs/vue",
      icon: FileCode,
      status: "ready" as const,
    },
    {
      name: "Angular SDK",
      description: "Angular module + service",
      href: "/docs/angular",
      icon: FileCode,
      status: "ready" as const,
    },
  ];

  return (
    <>
      <StructuredData
        title="Keverd Developer Documentation"
        description="SDK docs and API reference for Keverd fraud detection."
        path="/docs"
        type="TechArticle"
      />

      <div className="flex max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <TableOfContents items={tableOfContents} />

        <main className="flex-1 max-w-4xl px-10 sm:px-12 lg:px-20 py-12">
          <div id="overview" className="mb-10 scroll-mt-20">
            <h1 className="section-title mb-4">Documentation</h1>
            <p className="text-gray-600 text-lg">
              Go straight to the docs. New here? Start with{" "}
              <Link href="/getting-started" className="text-keverd-blue hover:underline font-semibold">
                Quickstart
              </Link>
              .
            </p>
          </div>

          <div id="api-reference" className="mb-12 scroll-mt-20">
            <h2 className="section-title mb-6">API Reference</h2>
            <Link
              href="/docs/api"
              className="flex items-center justify-between gap-4 py-3 border-b border-gray-200 hover:text-keverd-blue transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-keverd-blue" />
                <div>
                  <div className="font-semibold text-keverd-ink">REST API</div>
                  <div className="text-sm text-gray-600">Endpoints, request/response formats, and errors</div>
                </div>
              </div>
              <ArrowRight size={16} className="text-keverd-blue" />
            </Link>
          </div>

          <div id="available-sdks" className="scroll-mt-20">
            <h2 className="section-title mb-8">Available SDKs</h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {sdks.map((sdk) => {
                const Icon = sdk.icon;
                return (
                  <Link
                    key={sdk.name}
                    href={sdk.href}
                    className="flex items-center justify-between gap-4 py-3 hover:text-keverd-blue transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-keverd-blue" />
                      <div>
                        <div className="font-semibold text-keverd-ink">{sdk.name}</div>
                        <div className="text-sm text-gray-600">{sdk.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {sdk.status === "ready" && <CheckCircle2 className="text-green-600" size={16} />}
                      <ArrowRight size={16} className="text-keverd-blue" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


