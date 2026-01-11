"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { CodeSnippet } from "../components/CodeSnippet";
import { Tag } from "../components/Tag";
import { TableOfContents } from "../components/TableOfContents";
import { StructuredData } from "../components/StructuredData";
import { 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  Smartphone, 
  Globe, 
  FileCode,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const tableOfContents = [
  { id: "what-is-keverd", title: "What is Keverd?" },
  { id: "what-we-offer", title: "What We Offer" },
  { id: "risk-assessment", title: "Real-Time Risk Assessment", level: 2 },
  { id: "device-fingerprinting", title: "Device Fingerprinting", level: 2 },
  { id: "behavioral-biometrics", title: "Behavioral Biometrics", level: 2 },
  { id: "geographic-analysis", title: "Geographic Analysis", level: 2 },
  { id: "sim-swap-detection", title: "SIM Swap Detection", level: 2 },
  { id: "privacy-first", title: "Privacy-First Architecture", level: 2 },
  { id: "how-we-offer", title: "How We Offer It" },
  { id: "available-sdks", title: "Available SDKs" },
  { id: "android-sdk", title: "Android SDK", level: 2 },
  { id: "javascript-sdk", title: "Vanilla JavaScript SDK", level: 2 },
  { id: "react-sdk", title: "React SDK", level: 2 },
  { id: "vue-sdk", title: "Vue.js SDK", level: 2 },
  { id: "angular-sdk", title: "Angular SDK", level: 2 },
  { id: "quick-start", title: "Quick Start Guide" },
  { id: "what-youll-get", title: "What You'll Get" },
];

export default function GettingStartedPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "web">("web");

  return (
    <>
      <StructuredData
        title="Getting Started with Keverd"
        description="Complete getting started guide for Keverd fraud detection. Learn what Keverd offers, how it works, and how to integrate it into your application."
        path="/getting-started"
        type="TechArticle"
      />
      <div className="min-h-screen bg-keverd-sand/20">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 max-w-4xl px-10 sm:px-12 lg:px-20 py-12">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="section-title mb-3">Getting Started with Keverd</h1>
            <p className="text-gray-600 text-xl max-w-3xl leading-relaxed">
              Welcome to Keverd, the comprehensive fraud detection platform designed to protect your applications from account takeover, fraudulent transactions, and malicious activity. This guide will walk you through everything you need to know to get started.
            </p>
          </div>

          {/* What is Keverd */}
          <section id="what-is-keverd" className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="section-title mb-4">What is Keverd?</h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong className="text-keverd-ink">Keverd</strong> is a cutting-edge fraud detection and prevention platform that provides real-time risk assessment for user interactions across web and mobile applications. Built with privacy-first principles, Keverd helps businesses identify and prevent fraudulent activities without compromising user privacy or experience.
              </p>
              
              <p>
                Our platform combines multiple advanced technologies including <strong className="text-keverd-blue">device fingerprinting</strong>, <strong className="text-keverd-blue">behavioral biometrics</strong>, <strong className="text-keverd-blue">geographic analysis</strong>, and <strong className="text-keverd-blue">SIM swap detection</strong> to create a comprehensive fraud detection system. Unlike traditional fraud prevention methods that rely solely on IP addresses or cookies, Keverd uses a multi-layered approach that works even when users are using VPNs, incognito mode, or have cleared their browser data.
              </p>

              <p>
                Keverd is designed to be developer-friendly, with easy-to-integrate SDKs for multiple platforms and programming languages. Whether you're building a web application, a mobile app, or a hybrid solution, we have the tools you need to implement robust fraud detection in minutes, not days.
              </p>
            </div>
          </section>

          {/* What We Offer */}
          <section id="what-we-offer" className="mb-12 pb-12 border-b border-gray-200">
            <h2 className="section-title mb-4">What We Offer</h2>

            <div className="space-y-8">
              <div id="risk-assessment" className="bg-keverd-blue/5 rounded-xl p-6 border border-keverd-blue/20 scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">1. Real-Time Risk Assessment</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Keverd provides instant risk scores (0-100) for every user interaction, allowing you to make informed decisions in real-time. Our scoring algorithm analyzes multiple data points including device characteristics, user behavior patterns, geographic location, and historical data to generate accurate risk assessments. Scores are calculated in under 100ms (p99 latency), ensuring minimal impact on your application's performance.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The risk score is accompanied by actionable recommendations: <span className="bg-white/50 text-keverd-ink px-2 py-1 rounded font-semibold text-sm border border-gray-200">allow</span> for low-risk interactions (0-29), <span className="bg-white/50 text-keverd-ink px-2 py-1 rounded font-semibold text-sm border border-gray-200">soft_challenge</span> for moderate risk (30-49), <span className="bg-white/50 text-keverd-ink px-2 py-1 rounded font-semibold text-sm border border-gray-200">hard_challenge</span> for high risk (50-69), and <span className="bg-white/50 text-keverd-ink px-2 py-1 rounded font-semibold text-sm border border-gray-200">block</span> for very high risk (70-100). This allows you to implement graduated security measures that balance user experience with security.
                </p>
              </div>

              <div id="device-fingerprinting" className="bg-keverd-gold/10 rounded-xl p-6 border border-keverd-gold/30 scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">2. Device Fingerprinting</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Our device fingerprinting technology creates a unique identifier for each device without storing any personally identifiable information (PII). We collect and hash device characteristics such as screen resolution, timezone, installed fonts, canvas fingerprint, WebGL fingerprint, and hardware specifications to create a stable, privacy-compliant device identifier.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The fingerprint is generated using SHA-256 hashing, ensuring that raw device information never leaves the client in an unhashed form. This approach provides persistent device identification that works across sessions, browsers, and even after clearing cookies, while maintaining full compliance with GDPR, CCPA, and the Kenya Data Protection Act.
                </p>
              </div>

              <div id="behavioral-biometrics" className="bg-keverd-clay/10 rounded-xl p-6 border border-keverd-clay/30 scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">3. Behavioral Biometrics</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Keverd analyzes user behavior patterns to detect anomalies that may indicate fraudulent activity. We track typing patterns (dwell time and flight time between keystrokes), mouse movements, touch gestures, swipe velocities, and session entropy to build a behavioral profile for each user.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These behavioral patterns are unique to each individual and are extremely difficult for fraudsters to replicate. When a user's behavior deviates significantly from their established patterns, Keverd flags this as a potential risk indicator. This technology is particularly effective at detecting account takeover attempts, where a fraudster may have obtained login credentials but cannot replicate the legitimate user's typing and interaction patterns.
                </p>
              </div>

              <div id="geographic-analysis" className="bg-keverd-blue/5 rounded-xl p-6 border border-keverd-blue/20 scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">4. Geographic Analysis</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Our platform analyzes geographic patterns to detect suspicious location changes. We track IP addresses, timezones, and geographic coordinates to identify impossible travel scenarios, VPN usage, and location-based anomalies. For example, if a user logs in from New York and then attempts to log in from London 30 minutes later, this would be flagged as a geographic anomaly.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Geographic analysis is enhanced by MaxMind GeoLite2 database integration, providing accurate location data for risk assessment. We also detect VPN and proxy usage, which can be legitimate (privacy-conscious users) or suspicious (fraudsters attempting to hide their location).
                </p>
              </div>

              <div id="sim-swap-detection" className="bg-keverd-gold/10 rounded-xl p-6 border border-keverd-gold/30 scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">5. SIM Swap Detection (Mobile Only)</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  For Android applications, Keverd provides advanced SIM swap detection capabilities. SIM swapping is a common attack vector where fraudsters convince a mobile carrier to transfer a victim's phone number to a new SIM card, allowing them to intercept SMS-based two-factor authentication codes.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our SIM swap detection engine monitors SIM card changes, device changes, behavioral anomalies, timing patterns, and velocity anomalies to identify potential SIM swap attacks. When a SIM swap is detected, the risk score is automatically elevated, and you can implement additional security measures such as requiring alternative authentication methods.
                </p>
              </div>

              <div id="privacy-first" className="bg-keverd-clay/10 rounded-xl p-6 border border-keverd-clay/30 scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">6. Privacy-First Architecture</h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Privacy is at the core of Keverd's design. All device identifiers are hashed client-side before transmission, ensuring that no raw PII is ever sent to our servers. We comply with major privacy regulations including GDPR, CCPA, and the Kenya Data Protection Act, and provide tools for data deletion and user consent management.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our platform is designed to provide effective fraud detection while respecting user privacy. We don't track users across different websites, we don't create advertising profiles, and we don't sell user data. Everything we collect is used solely for fraud detection and prevention purposes.
                </p>
              </div>
            </div>
          </section>

          {/* How We Offer It */}
          <section id="how-we-offer" className="mb-12 pb-12 border-b border-gray-200">
            <h2 className="section-title mb-4">How We Offer It</h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Keverd is delivered through a combination of <strong className="text-keverd-blue">client-side SDKs</strong> and a <strong className="text-keverd-blue">cloud-based API</strong>. The SDKs run in your application (web browser or mobile app) and collect device and behavioral data, then send this data to our API endpoint for risk assessment. The entire process is designed to be fast, secure, and non-intrusive.
              </p>

              <p>
                <strong className="text-keverd-ink">Client-Side SDKs:</strong> Our SDKs are lightweight, easy to integrate, and designed to have minimal impact on your application's performance. They handle all the complexity of data collection, hashing, and API communication, so you can focus on building your application. SDKs are available for multiple platforms and programming languages, ensuring you can integrate Keverd regardless of your technology stack.
              </p>

              <p>
                <strong className="text-keverd-ink">Cloud-Based API:</strong> Our API endpoint (<code className="bg-keverd-sand/50 px-1.5 py-0.5 rounded text-sm">https://api.keverd.com/fingerprint/score</code>) receives fingerprint data from your SDKs and returns risk assessments in real-time. The API is built for scale, with sub-100ms response times (p99) and the ability to handle millions of requests per day. All API communication is encrypted using HTTPS, and we provide comprehensive rate limiting and monitoring.
              </p>

              <p>
                <strong className="text-keverd-ink">Dashboard and Analytics:</strong> In addition to the SDKs and API, Keverd provides a comprehensive dashboard where you can view analytics, manage API keys, monitor usage, and configure settings. The dashboard gives you insights into fraud patterns, risk score distributions, and the effectiveness of your fraud prevention measures.
              </p>

              <p>
                <strong className="text-keverd-ink">Documentation and Support:</strong> We provide extensive documentation, code examples, and integration guides for all our SDKs. Our documentation includes detailed API references, troubleshooting guides, and best practices. If you need additional help, our support team is available to assist with integration and answer any questions.
              </p>
            </div>
          </section>

          {/* Available SDKs */}
          <section id="available-sdks" className="mb-12 pb-12 border-b border-gray-200">
            <h2 className="section-title mb-4">Available SDKs</h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Keverd provides official SDKs for multiple platforms and programming languages. Each SDK is designed to integrate seamlessly with its target platform, following platform-specific best practices and conventions. All SDKs provide the same core functionality: device fingerprinting, behavioral data collection, and risk assessment, but they're packaged in ways that feel natural to developers working in each ecosystem.
            </p>

            <div className="space-y-6">
              {/* Android SDK */}
              <div id="android-sdk" className="bg-keverd-blue/5 rounded-xl p-6 border border-keverd-blue/20 scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-keverd-ink text-lg">
                    <Link href="/docs/android" className="hover:text-keverd-blue transition-colors">
                      Android SDK
                    </Link>
                  </h3>
                  <Tag variant="primary">Kotlin</Tag>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Our Android SDK is built with Kotlin and provides comprehensive fraud detection capabilities for Android applications. It includes device fingerprinting, behavioral analytics, and <strong>SIM swap detection</strong>, which is unique to mobile platforms. The SDK is distributed via Maven Central and can be integrated into your Android project with just a few lines of code.
                </p>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The Android SDK collects device information such as manufacturer, model, OS version, screen dimensions, and hardware specifications. It also tracks behavioral patterns including typing patterns, swipe velocities, and session entropy. For SIM swap detection, it monitors SIM card information and detects changes that may indicate account takeover attempts.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The SDK is designed to be privacy-compliant, with user consent management built-in. All data collection can be configured to require explicit user consent, and the SDK provides callbacks for consent management. Performance is optimized for mobile devices, with data collection taking less than 50ms and total API call time under 100ms.
                </p>
                <Button href="/docs/android" variant="primary" size="sm" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    View Android Documentation
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </div>

              {/* JavaScript SDK */}
              <div id="javascript-sdk" className="bg-keverd-gold/10 rounded-xl p-6 border border-keverd-gold/30 scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-keverd-ink text-lg">
                    <Link href="/docs/javascript" className="hover:text-keverd-blue transition-colors">
                      Vanilla JavaScript SDK
                    </Link>
                  </h3>
                  <Tag variant="primary">Universal</Tag>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The Vanilla JavaScript SDK is our most versatile SDK, designed to work in any browser environment. It's framework-agnostic, meaning you can use it with any JavaScript framework or in plain HTML/JavaScript applications. The SDK is lightweight (under 50KB minified) and has zero dependencies, making it easy to integrate and deploy.
                </p>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  This SDK provides comprehensive device fingerprinting capabilities including canvas fingerprinting, WebGL fingerprinting, screen characteristics, timezone detection, and more. It also collects behavioral data such as typing patterns, mouse movements, and session entropy. The SDK is designed to work seamlessly with modern build tools and can be installed via npm, yarn, or included directly via CDN.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The JavaScript SDK is perfect for web applications that need fraud detection but don't want to be tied to a specific framework. It provides a simple, promise-based API that's easy to use and understand. The SDK automatically handles data collection, hashing, and API communication, so you just need to initialize it with your API key and call a single method to get risk assessments.
                </p>
                <div className="mb-4">
                  <CodeSnippet
                    code={`import { Keverd } from '@keverdjs/fraud-sdk';

// Initialize with your API key
Keverd.init('your-api-key-here');

// Get visitor data and risk assessment
const result = await Keverd.getVisitorData();

console.log('Risk Score:', result.risk_score);
console.log('Action:', result.action);
console.log('Session ID:', result.session_id);`}
                    language="javascript"
                  />
                </div>
                <Button href="/docs/javascript" variant="primary" size="sm" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    View JavaScript Documentation
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </div>

              {/* React SDK */}
              <div id="react-sdk" className="bg-keverd-clay/10 rounded-xl p-6 border border-keverd-clay/30 scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-keverd-ink text-lg">
                    <Link href="/docs/react" className="hover:text-keverd-blue transition-colors">
                      React SDK
                    </Link>
                  </h3>
                  <Tag variant="primary">React Hooks</Tag>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The React SDK is designed specifically for React applications and provides a seamless integration using React hooks and context. It follows React best practices and integrates naturally with React's component lifecycle. The SDK provides a <code className="bg-keverd-sand/50 px-1 rounded text-sm">KeverdProvider</code> component for global configuration and a <code className="bg-keverd-sand/50 px-1 rounded text-sm">useKeverdVisitorData</code> hook for accessing visitor data and risk assessments.
                </p>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The React SDK is perfect for Next.js applications, Create React App projects, and any other React-based web application. It provides TypeScript support out of the box, with comprehensive type definitions for all data structures and API responses. The SDK handles all the complexity of data collection and API communication, so you can focus on building your React components.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  One of the key advantages of the React SDK is its reactive nature. When visitor data is updated, React components automatically re-render with the new data. The SDK also provides loading and error states, making it easy to handle different states in your UI. The hook-based API makes it simple to access visitor data from any component in your application tree.
                </p>
                <div className="mb-4">
                  <CodeSnippet
                    code={`import { KeverdProvider, useKeverdVisitorData } from '@keverdjs/fraud-sdk-react';

function App() {
  return (
    <KeverdProvider loadOptions={{ apiKey: 'your-api-key' }}>
      <HomePage />
    </KeverdProvider>
  );
}

function HomePage() {
  const { data, loading, error } = useKeverdVisitorData({
    immediate: true
  });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <p>Risk Score: {data?.riskScore}</p>
      <p>Action: {data?.action}</p>
    </div>
  );
}`}
                    language="javascript"
                  />
                </div>
                <Button href="/docs/react" variant="primary" size="sm" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    View React Documentation
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </div>

              {/* Vue SDK */}
              <div id="vue-sdk" className="bg-keverd-blue/5 rounded-xl p-6 border border-keverd-blue/20 scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-keverd-ink text-lg">
                    <Link href="/docs/vue" className="hover:text-keverd-blue transition-colors">
                      Vue.js SDK
                    </Link>
                  </h3>
                  <Tag variant="primary">Vue 3</Tag>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The Vue.js SDK is built for Vue 3 applications and leverages Vue's Composition API to provide a modern, reactive integration. It provides composables (similar to React hooks) for accessing visitor data and a plugin system for global SDK configuration. The SDK is designed to work seamlessly with Vue 3's reactivity system, ensuring that your components automatically update when visitor data changes.
                </p>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The Vue SDK provides a <code className="bg-keverd-sand/50 px-1 rounded text-sm">useKeverdProvider</code> composable for SDK initialization and a <code className="bg-keverd-sand/50 px-1 rounded text-sm">useKeverdVisitorData</code> composable for accessing visitor data. It also includes a Vue plugin that can be installed globally, making it easy to access the SDK from any component in your application.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The SDK is perfect for Vue 3 applications built with Vite, Nuxt 3, or any other Vue 3 setup. It provides full TypeScript support and follows Vue 3 best practices. The composable-based API makes it easy to use the SDK in both Options API and Composition API components.
                </p>
                <Button href="/docs/vue" variant="primary" size="sm" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    View Vue.js Documentation
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </div>

              {/* Angular SDK */}
              <div id="angular-sdk" className="bg-keverd-gold/10 rounded-xl p-6 border border-keverd-gold/30 scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-keverd-ink text-lg">
                    <Link href="/docs/angular" className="hover:text-keverd-blue transition-colors">
                      Angular SDK
                    </Link>
                  </h3>
                  <Tag variant="primary">Angular</Tag>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The Angular SDK is built specifically for Angular applications and follows Angular's dependency injection and service-based architecture. It provides an <code className="bg-keverd-sand/50 px-1 rounded text-sm">KeverdService</code> that can be injected into any Angular component or service, and a <code className="bg-keverd-sand/50 px-1 rounded text-sm">KeverdModule</code> for easy module-based integration.
                </p>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  The Angular SDK uses RxJS observables for reactive data access, making it easy to integrate with Angular's change detection system. The service-based API provides a clean, testable interface that follows Angular best practices. The SDK is designed to work seamlessly with Angular's dependency injection system and can be easily mocked for testing.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The SDK is perfect for Angular applications built with Angular CLI or any other Angular setup. It provides full TypeScript support and follows Angular style guide recommendations. The observable-based API makes it easy to use with Angular's async pipe and other reactive patterns.
                </p>
                <Button href="/docs/angular" variant="primary" size="sm" className="w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    View Angular Documentation
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Start Steps */}
          <section id="quick-start" className="mb-12 pb-12 border-b border-gray-200">
            <h2 className="section-title mb-4">Quick Start Guide</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center font-bold text-lg text-keverd-ink">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-keverd-ink text-lg">Get Your API Key</h3>
                    <Link
                      href="/api-keys"
                      className="text-sm text-keverd-blue hover:underline inline-flex items-center gap-1"
                    >
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    The first step to using Keverd is to obtain an API key. API keys are used to authenticate your application with the Keverd API and are required for all API requests. To get your API key, you'll need to sign up for a Keverd account at <Link href="https://dashboard.keverd.com" className="text-keverd-blue hover:underline font-semibold" target="_blank">dashboard.keverd.com</Link>.
                  </p>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Once you've created an account, navigate to the API Keys section in the dashboard. You can create multiple API keys for different environments (development, staging, production) or different applications. Each API key has its own usage limits and can be enabled or disabled independently. For detailed instructions on obtaining and managing API keys, see our <Link href="/api-keys" className="text-keverd-blue hover:underline font-semibold">API Keys documentation</Link>.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Important:</strong> Keep your API keys secure and never commit them to version control. Use environment variables or secure configuration management to store your API keys. API keys should be treated as sensitive credentials, similar to passwords or database connection strings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center font-bold text-lg text-keverd-ink">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-keverd-ink text-lg">Choose Your Platform</h3>
                    <Link
                      href="/docs"
                      className="text-sm text-keverd-blue hover:underline inline-flex items-center gap-1"
                    >
                      View all SDKs
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Next, choose the SDK that matches your application's platform. Keverd provides SDKs for Android (Kotlin) and multiple web frameworks (Vanilla JavaScript, React, Vue.js, and Angular). Each SDK is designed to integrate seamlessly with its target platform.
                  </p>
                  
                  {/* Platform Toggle */}
                  <div className="mb-4 flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                    <button
                      onClick={() => setSelectedPlatform("android")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedPlatform === "android"
                          ? "bg-white text-keverd-ink shadow-sm"
                          : "text-gray-600 hover:text-keverd-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Smartphone size={16} />
                        Android
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedPlatform("web")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedPlatform === "web"
                          ? "bg-white text-keverd-ink shadow-sm"
                          : "text-gray-600 hover:text-keverd-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Globe size={16} />
                        Web
                      </span>
                    </button>
                  </div>

                  {/* Android Instructions */}
                  {selectedPlatform === "android" && (
                    <div className="space-y-4">
                      <div className="bg-keverd-blue/5 rounded-xl p-6 border border-keverd-blue/20">
                        <h4 className="font-semibold text-keverd-ink mb-3">Android SDK Installation</h4>
                        <p className="text-sm text-gray-700 mb-4">Add the dependency to your <code className="bg-white/50 px-1.5 py-0.5 rounded text-xs">build.gradle.kts</code> file:</p>
                        <CodeSnippet
                          code={`repositories {
    mavenCentral()
}

dependencies {
    implementation("com.keverd:sdk:1.0.0")
}`}
                          language="kotlin"
                        />
                        <p className="text-sm text-gray-700 mt-4 mb-2">Add required permissions to your <code className="bg-white/50 px-1.5 py-0.5 rounded text-xs">AndroidManifest.xml</code>:</p>
                        <CodeSnippet
                          code={`<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />`}
                          language="xml"
                        />
                      </div>
                    </div>
                  )}

                  {/* Web Instructions */}
                  {selectedPlatform === "web" && (
                    <div className="space-y-4">
                      <div className="bg-keverd-gold/10 rounded-xl p-6 border border-keverd-gold/30">
                        <h4 className="font-semibold text-keverd-ink mb-3">Web SDK Installation</h4>
                        <p className="text-sm text-gray-700 mb-4">Choose your framework and install the corresponding package:</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-keverd-ink mb-1">Vanilla JavaScript:</p>
                            <CodeSnippet
                              code={`npm install @keverdjs/fraud-sdk`}
                              language="bash"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-keverd-ink mb-1">React:</p>
                            <CodeSnippet
                              code={`npm install @keverdjs/fraud-sdk-react`}
                              language="bash"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-keverd-ink mb-1">Vue.js:</p>
                            <CodeSnippet
                              code={`npm install @keverdjs/fraud-sdk-vue`}
                              language="bash"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-keverd-ink mb-1">Angular:</p>
                            <CodeSnippet
                              code={`npm install @keverdjs/fraud-sdk-angular`}
                              language="bash"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center font-bold text-lg text-keverd-ink">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-keverd-ink mb-2 text-lg">Initialize the SDK</h3>
                  
                  {selectedPlatform === "android" && (
                    <div className="space-y-4">
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        Initialize the SDK in your <code className="bg-keverd-sand/50 px-1 rounded text-sm">Application</code> class:
                      </p>
                      <CodeSnippet
                        code={`import com.keverd.sdk.Config
import com.keverd.sdk.KeverdFingerprint

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        val config = Config(
            apiBaseUrl = "https://api.keverd.com",
            apiKey = "YOUR_API_KEY",
            consentRequired = true
        )
        
        KeverdFingerprint.init(this, config)
    }
}`}
                        language="kotlin"
                      />
                      <p className="text-gray-700 mt-4 leading-relaxed">
                        Then submit fingerprints and receive risk scores:
                      </p>
                      <CodeSnippet
                        code={`val sdk = KeverdFingerprint.init(context, config)

lifecycleScope.launch {
    sdk.submit("user123") { result ->
        when (result) {
            is Result.Success -> {
                println("Risk Score: \${result.score}")
            }
            is Result.Error -> {
                println("Error: \${result.error}")
            }
        }
    }
}`}
                        language="kotlin"
                      />
                    </div>
                  )}

                  {selectedPlatform === "web" && (
                    <div className="space-y-4">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-keverd-ink mb-2">Vanilla JavaScript:</p>
                        <CodeSnippet
                          code={`import { Keverd } from '@keverdjs/fraud-sdk';

Keverd.init({
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://api.keverd.com'
});

// Get visitor data
const visitorData = await Keverd.getVisitorData();
console.log('Risk Score:', visitorData.riskScore);`}
                          language="javascript"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-keverd-ink mb-2">React:</p>
                        <CodeSnippet
                          code={`import { KeverdProvider } from '@keverdjs/fraud-sdk-react';

function App() {
  return (
    <KeverdProvider
      loadOptions={{
        apiKey: 'YOUR_API_KEY'
      }}
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
}`}
                          language="javascript"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center font-bold text-lg text-keverd-ink">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-keverd-ink mb-2 text-lg">Start Using</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Once initialized, the SDK automatically collects device and behavioral data, sends it to the Keverd API, and returns risk assessments. You'll receive a response containing the risk score (0-100), recommended action (allow, soft_challenge, hard_challenge, or block), and additional metadata.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    For detailed code examples and API references for each SDK, see the specific SDK documentation pages. Each SDK's documentation includes complete examples showing initialization, data retrieval, error handling, and best practices.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What You'll Get */}
          <section id="what-youll-get" className="mb-8 pb-8">
            <h2 className="section-title mb-4">What You'll Get</h2>

            <div className="space-y-4">
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Real-time Risk Scores</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Get instant risk assessments (0-100) for every user interaction. Risk scores are calculated in under 100ms (p99 latency) and include actionable recommendations (allow, soft_challenge, hard_challenge, or block) that you can use to implement graduated security measures.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Device Fingerprinting</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Unique device identification without storing PII. Our SHA-256 hashed fingerprints work across sessions, browsers, and even after clearing cookies, providing persistent device identification while maintaining full privacy compliance.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Behavioral Analytics</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Track user behavior patterns including typing patterns, mouse movements, touch gestures, and session entropy to detect anomalies. Behavioral biometrics are unique to each individual and extremely difficult for fraudsters to replicate.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">SIM Swap Detection</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Detect SIM card changes that may indicate account takeover attempts. Available for Android applications, SIM swap detection monitors SIM card information, device changes, behavioral anomalies, and timing patterns to identify potential attacks.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Geographic Analysis</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Detect suspicious location changes, impossible travel scenarios, and VPN usage. Our geographic analysis uses IP addresses, timezones, and MaxMind GeoLite2 data to identify location-based anomalies.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 bg-teal-50 rounded-lg p-4 border border-teal-200">
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Privacy-First Design</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    All device identifiers are hashed client-side before transmission. We comply with GDPR, CCPA, and the Kenya Data Protection Act, and provide tools for data deletion and user consent management.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <div className="py-8 space-y-4 border-t border-gray-200">
            <h2 className="section-title mb-2">Ready to Get Started?</h2>
            <p className="text-gray-600 max-w-2xl">
              Get your API key and start protecting your application from fraud in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/api-keys" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  Get Your API Key
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </Button>
              <Button href="/docs/api" variant="outline" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  View API Reference
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
