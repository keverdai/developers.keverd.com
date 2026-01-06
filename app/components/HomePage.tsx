"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { Card } from "./Card";
import { Button } from "./Button";
import { CodeSnippet } from "./CodeSnippet";
import { Tag } from "./Tag";
import { SearchBar } from "./SearchBar";
import { PatternBackground } from "./PatternBackground";
import { FeatureCard } from "./FeatureCard";
import {
  Smartphone,
  Globe,
  Code,
  FileCode,
  ArrowRight,
  Key,
  BookOpen,
  Zap,
  Shield,
  Search,
  Terminal,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

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

const sdks = [
  {
    name: "Android SDK",
    description: "Kotlin-based SDK for Android applications with device fingerprinting, SIM swap detection, and behavioral analytics",
    href: "/docs/android",
    icon: Smartphone,
    status: "ready",
  },
  {
    name: "Vanilla JavaScript",
    description: "Lightweight JavaScript SDK that works in any browser environment",
    href: "/docs/javascript",
    icon: Globe,
    status: "ready",
  },
  {
    name: "React SDK",
    description: "React hooks and components for seamless integration in React applications",
    href: "/docs/react",
    icon: Code,
    status: "ready",
  },
  {
    name: "Vue.js SDK",
    description: "Vue 3 composables and plugin for seamless integration in Vue.js applications",
    href: "/docs/vue",
    icon: FileCode,
    status: "ready",
  },
  {
    name: "Angular SDK",
    description: "Angular service and module for seamless integration in Angular applications",
    href: "/docs/angular",
    icon: FileCode,
    status: "ready",
  },
];

const features = [
  {
    title: "Device Fingerprinting",
    description: "Unique device identification using hardware and software characteristics",
    icon: Smartphone,
    tags: ["Android", "Web", "iOS"],
  },
  {
    title: "Behavioral Analytics",
    description: "Track user interaction patterns to detect anomalies and fraud",
    icon: Sparkles,
    tags: ["Real-time", "Privacy-first"],
  },
  {
    title: "Risk Assessment",
    description: "Get instant risk scores and action recommendations for every transaction",
    icon: Shield,
    tags: ["API", "SDK"],
  },
  {
    title: "SIM Swap Detection",
    description: "Detect SIM card changes and device switches for enhanced security",
    icon: Smartphone,
    tags: ["Android", "Mobile"],
  },
];

export function HomePage() {
  const [currentSdkIndex, setCurrentSdkIndex] = useState(0);

  const currentExample = sdkCodeExamples[currentSdkIndex];

  return (
    <div className="min-h-screen bg-keverd-sand/20">
      <Navbar />
      <div className="relative">
        <PatternBackground />
        
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Text Content */}
              <div className="text-left">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-keverd-ink mb-6 leading-tight">
                  Keverd Developer
                  <span className="text-keverd-blue"> Documentation</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Complete documentation for Keverd fraud detection SDKs. Get started with Android, JavaScript, React, Vue, and Angular in minutes.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button href="/docs" variant="primary" size="lg">
                    Browse Documentation
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button href="/docs/api" variant="ghost" size="lg">
                    View API Reference
                    <BookOpen className="ml-2" size={20} />
                  </Button>
                </div>

                <SearchBar placeholder="Search documentation, APIs, SDKs..." className="max-w-2xl" />
              </div>

              {/* Right Side - Code Snippet with Tabs */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col" style={{ height: '500px' }}>
                  {/* Mac-style Header with Traffic Light Buttons */}
                  <div className="flex items-center gap-2 bg-gray-50 border-b border-gray-200 px-3 py-2 flex-shrink-0">
                    {/* Mac Traffic Light Buttons */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    {/* Editor-style Tabs */}
                    <div className="flex items-center gap-1 flex-1 overflow-x-auto ml-2">
                      {sdkCodeExamples.map((example, index) => (
                        <button
                          key={example.name}
                          onClick={() => setCurrentSdkIndex(index)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-t transition-all whitespace-nowrap ${
                            index === currentSdkIndex
                              ? "bg-white text-keverd-blue border-t border-l border-r border-gray-200"
                              : "text-gray-600 hover:text-keverd-blue hover:bg-gray-100"
                          }`}
                          aria-label={`Show ${example.name} example`}
                        >
                          {example.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Code Content with Smooth Transition - Fixed Height */}
                  <div className="p-4 relative flex-1 overflow-hidden">
                    <div
                      key={currentSdkIndex}
                      className="animate-fade-in h-full overflow-y-auto"
                    >
                      <CodeSnippet
                        code={currentExample.code}
                        language={currentExample.language}
                        autoType={false}
                        showCopy={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available SDKs */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-keverd-ink mb-4">
                Available SDKs
              </h2>
              <p className="text-gray-700 text-lg">
                Choose the SDK that fits your technology stack
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sdks.map((sdk) => {
                const Icon = sdk.icon;
                return (
                  <Card key={sdk.name} href={sdk.href} className="group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-keverd-blue/10 rounded-xl group-hover:bg-keverd-blue/20 transition-colors">
                        <Icon className="text-keverd-blue" size={24} />
                      </div>
                      {sdk.status === "ready" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/50 text-gray-700 border border-gray-200 rounded-full text-xs font-medium">
                          <CheckCircle2 size={12} />
                          Ready
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-keverd-ink mb-2 text-lg">{sdk.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{sdk.description}</p>
                    <div className="mt-4 flex items-center text-keverd-blue group-hover:gap-2 transition-all">
                      <span className="text-sm font-medium">View Docs</span>
                      <ArrowRight size={16} className="ml-1" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-keverd-ink mb-4">
                Key Features
              </h2>
              <p className="text-gray-700 text-lg">
                Everything you need for comprehensive fraud detection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <FeatureCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    icon={Icon}
                    tags={feature.tags}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card href="/getting-started" className="text-center">
                <Terminal className="text-keverd-blue mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-keverd-ink mb-2">Quick Start</h3>
                <p className="text-gray-600 text-sm">Get up and running in minutes</p>
              </Card>
              <Card href="/api-keys" className="text-center">
                <Key className="text-keverd-blue mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-keverd-ink mb-2">API Keys</h3>
                <p className="text-gray-600 text-sm">Learn how to obtain and use API keys</p>
              </Card>
              <Card href="/docs/api" className="text-center">
                <Code className="text-keverd-blue mx-auto mb-4" size={32} />
                <h3 className="font-semibold text-keverd-ink mb-2">API Reference</h3>
                <p className="text-gray-600 text-sm">Complete API documentation</p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

