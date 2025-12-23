"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { CodeSnippet } from "../components/CodeSnippet";
import { TableOfContents } from "../components/TableOfContents";
import { StructuredData } from "../components/StructuredData";
import { Smartphone, Globe, Code, FileCode, ArrowRight, CheckCircle2 } from "lucide-react";

const tableOfContents = [
  { id: "overview", title: "Overview" },
  { id: "integration-example", title: "Quick Integration" },
  { id: "available-sdks", title: "Available SDKs" },
];

const sdkCodeExamples = [
  {
    name: "Android SDK",
    language: "kotlin",
    code: String.raw`// Initialize SDK
val config = Config(
    apiBaseUrl = "https://app.keverd.com",
    apiKey = "YOUR_API_KEY"
)
val sdk = KeverdFingerprint.init(context, config)

// Submit fingerprint
sdk.submit("user123") { result ->
    when (result) {
        is Result.Success -> {
            println("Risk Score: \${result.score}")
        }
        is Result.Error -> {
            println("Error: \${result.error}")
        }
    }
}`,
  },
  {
    name: "Vanilla JavaScript",
    language: "javascript",
    code: String.raw`// Initialize SDK
import { Keverd } from '@keverdjs/fraud-sdk';

Keverd.init({
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://app.keverd.com'
});

// Get visitor data
const visitorData = await Keverd.getVisitorData();
console.log('Risk Score:', visitorData.riskScore);`,
  },
  {
    name: "React SDK",
    language: "javascript",
    code: String.raw`// Setup Provider
import { KeverdProvider } from '@keverdjs/fraud-sdk-react';

function App() {
  return (
    <KeverdProvider
      apiKey="YOUR_API_KEY"
      endpoint="https://app.keverd.com"
    >
      <YourApp />
    </KeverdProvider>
  );
}

// Use in components
import { useKeverdVisitorData } from '@keverdjs/fraud-sdk-react';

function MyComponent() {
  const { data, isLoading, error } = useKeverdVisitorData({
    immediate: true
  });
  
  return <div>Risk Score: {data?.riskScore}</div>;
}`,
  },
  {
    name: "Vue.js SDK",
    language: "javascript",
    code: String.raw`// Setup Plugin
import { createApp } from 'vue';
import KeverdPlugin from '@keverdjs/fraud-sdk-vue';

const app = createApp(App);
app.use(KeverdPlugin, {
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://app.keverd.com'
});

// Use in components
import { useKeverdVisitorData } from '@keverdjs/fraud-sdk-vue';

export default {
  setup() {
    const { data, loading, error } = useKeverdVisitorData({
      immediate: true
    });
    
    return { data, loading, error };
  }
}`,
  },
  {
    name: "Angular SDK",
    language: "typescript",
    code: String.raw`// Setup Module
import { KeverdModule } from '@keverdjs/fraud-sdk-angular';

@NgModule({
  imports: [
    KeverdModule.forRoot({
      apiKey: 'YOUR_API_KEY',
      endpoint: 'https://app.keverd.com'
    })
  ]
})
export class AppModule {}

// Use in components
import { KeverdService } from '@keverdjs/fraud-sdk-angular';

constructor(private keverd: KeverdService) {}

ngOnInit() {
  this.keverd.getVisitorData().subscribe({
    next: (data) => console.log('Risk Score:', data.riskScore),
    error: (err) => console.error(err)
  });
}`,
  },
];

export default function DocsPage() {
  const [currentSdkIndex, setCurrentSdkIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSdkIndex((prev) => (prev + 1) % sdkCodeExamples.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

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

  const currentExample = sdkCodeExamples[currentSdkIndex];

  return (
    <>
      <StructuredData
        title="Keverd Developer Documentation"
        description="Complete documentation for Keverd fraud detection SDKs - Android, Web, React, Vue, and Angular. Get started with fraud detection in minutes."
        path="/docs"
        type="TechArticle"
      />
      <div className="flex max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 max-w-4xl px-10 sm:px-12 lg:px-20 py-12">
          <div id="overview" className="mb-12 scroll-mt-20">
            <h1 className="section-title mb-6">Documentation</h1>
            <p className="text-gray-600 text-lg">
              Comprehensive guides and API references for all Keverd SDKs
            </p>
          </div>

          {/* Rotating Code Snippet */}
          <div id="integration-example" className="mb-12 scroll-mt-20">
            <div className="mb-4">
              <h2 className="font-display text-xl md:text-2xl font-bold text-keverd-ink mb-2">
                Quick Integration Example
              </h2>
              <p className="text-gray-600">
                See how easy it is to integrate Keverd with your favorite framework
              </p>
            </div>
            <div className="relative">
              <CodeSnippet
                code={currentExample.code}
                language={currentExample.language}
                autoType={false}
                className="mb-4"
              />
              <div className="flex items-center justify-center gap-2 mt-4">
                {sdkCodeExamples.map((example, index) => (
                  <button
                    key={example.name}
                    onClick={() => setCurrentSdkIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSdkIndex
                        ? "w-8 bg-keverd-blue"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Show ${example.name} example`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                {currentExample.name}
              </p>
            </div>
          </div>

          <div id="available-sdks" className="scroll-mt-20">
            <h2 className="section-title mb-8">Available SDKs</h2>
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
        </main>
      </div>
    </>
  );
}
