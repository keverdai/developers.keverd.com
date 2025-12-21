"use client";

import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { CodeSnippet } from "../components/CodeSnippet";
import { TableOfContents } from "../components/TableOfContents";
import { StructuredData } from "../components/StructuredData";
import { Card } from "../components/Card";
import { ExternalLink, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const tableOfContents = [
  { id: "getting-api-keys", title: "How to Get API Keys" },
  { id: "using-api-keys", title: "Using Your API Key" },
  { id: "android-sdk", title: "Android SDK", level: 2 },
  { id: "javascript-sdk", title: "Vanilla JavaScript", level: 2 },
  { id: "react-sdk", title: "React SDK", level: 2 },
  { id: "vue-sdk", title: "Vue.js SDK", level: 2 },
  { id: "angular-sdk", title: "Angular SDK", level: 2 },
  { id: "best-practices", title: "Best Practices" },
  { id: "store-keys-securely", title: "Store Keys Securely", level: 2 },
  { id: "different-keys-environments", title: "Use Different Keys for Environments", level: 2 },
  { id: "rotate-keys-regularly", title: "Rotate Keys Regularly", level: 2 },
  { id: "monitor-key-usage", title: "Monitor Key Usage", level: 2 },
  { id: "descriptive-names", title: "Use Descriptive Names", level: 2 },
  { id: "workspace-association", title: "Workspace Association" },
];

export default function APIKeysPage() {
  return (
    <>
      <StructuredData
        title="API Keys - Keverd Developer Documentation"
        description="Learn how to obtain, use, and manage API keys for Keverd fraud detection. Complete guide with code examples for all SDKs."
        path="/api-keys"
        type="TechArticle"
      />
      <div className="min-h-screen bg-keverd-sand/20">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 max-w-4xl px-10 sm:px-12 lg:px-20 py-12">
          <div className="mb-6">
            <h1 className="section-title mb-3">API Keys</h1>
            <p className="text-gray-600 text-lg">
              Learn how to obtain and manage your Keverd API keys for authentication
            </p>
          </div>

          <div className="space-y-8">
            {/* Getting API Keys */}
            <section id="getting-api-keys" className="pb-8 border-b border-gray-200">
              <h2 className="section-title mb-4">How to Get API Keys</h2>
              <div className="space-y-4">
                <Card>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-keverd-ink mb-1.5">Sign Up or Log In</h3>
                      <p className="text-gray-700 mb-1.5 leading-relaxed">
                        Create an account or log in to your existing Keverd account at{" "}
                        <a
                          href="https://dashboard.keverd.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-keverd-blue hover:underline font-semibold inline-flex items-center gap-1"
                        >
                          dashboard.keverd.com
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-keverd-ink mb-2">Navigate to API Keys</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed">
                        Once logged in, go to the <strong className="text-keverd-blue">API Keys</strong> section in the dashboard navigation menu.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-keverd-ink mb-2">Create a New API Key</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed">
                        Click the <strong className="text-keverd-blue">"Create API Key"</strong> button and provide a descriptive name for your key.
                      </p>
                      <p className="text-sm text-gray-500 mt-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        Example names: "Production App", "Development Environment", "Mobile App v1.0"
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-keverd-ink mb-2">Copy Your API Key</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed">
                        After creation, your API key will be displayed <strong className="text-keverd-blue">only once</strong>. Make sure to copy it immediately and store it securely.
                      </p>
                      <div className="bg-white/50 border border-gray-200 rounded-lg p-3 mt-2">
                        <div className="flex gap-2">
                          <AlertCircle className="text-keverd-blue flex-shrink-0" size={18} />
                          <p className="text-sm text-gray-700">
                            <strong>Important:</strong> API keys are only shown once. If you lose your key, you'll need to create a new one.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Using API Keys */}
            <section id="using-api-keys" className="pb-8 border-b border-gray-200">
              <h2 className="section-title mb-4">Using Your API Key</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Once you have your API key, you can use it to initialize any of the Keverd SDKs. Here's how to use it in each SDK:
              </p>

              <div className="space-y-4">
                <div id="android-sdk" className="bg-white/50 rounded-xl p-6 border border-gray-200 scroll-mt-20">
                  <h3 className="font-semibold text-keverd-ink mb-3">
                    <Link href="/docs/android" className="hover:text-keverd-blue transition-colors inline-flex items-center gap-2">
                      Android SDK
                      <ArrowRight size={16} className="text-keverd-blue" />
                    </Link>
                  </h3>
                  <CodeSnippet
                    code={String.raw`val config = Config(
    apiBaseUrl = "https://app.keverd.com",
    apiKey = "your-api-key-here",
    consentRequired = true
)
val sdk = KeverdFingerprint.init(context, config)`}
                    language="kotlin"
                  />
                </div>

                <div id="javascript-sdk" className="bg-white/50 rounded-xl p-6 border border-gray-200 scroll-mt-20">
                  <h3 className="font-semibold text-keverd-ink mb-3">
                    <Link href="/docs/javascript" className="hover:text-keverd-blue transition-colors inline-flex items-center gap-2">
                      Vanilla JavaScript
                      <ArrowRight size={16} className="text-keverd-blue" />
                    </Link>
                  </h3>
                  <CodeSnippet
                    code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

Keverd.init({
  apiKey: 'your-api-key-here',
  endpoint: 'https://app.keverd.com'
});`}
                    language="javascript"
                  />
                </div>

                <div id="react-sdk" className="bg-white/50 rounded-xl p-6 border border-gray-200 scroll-mt-20">
                  <h3 className="font-semibold text-keverd-ink mb-3">
                    <Link href="/docs/react" className="hover:text-keverd-blue transition-colors inline-flex items-center gap-2">
                      React SDK
                      <ArrowRight size={16} className="text-keverd-blue" />
                    </Link>
                  </h3>
                  <CodeSnippet
                    code={String.raw`import { KeverdProvider } from '@keverdjs/fraud-sdk-react';

<KeverdProvider
  loadOptions={{
    apiKey: 'your-api-key-here',
  }}
>
  <App />
</KeverdProvider>`}
                    language="javascript"
                  />
                </div>

                <div id="vue-sdk" className="bg-white/50 rounded-xl p-6 border border-gray-200 scroll-mt-20">
                  <h3 className="font-semibold text-keverd-ink mb-3">
                    <Link href="/docs/vue" className="hover:text-keverd-blue transition-colors inline-flex items-center gap-2">
                      Vue.js SDK
                      <ArrowRight size={16} className="text-keverd-blue" />
                    </Link>
                  </h3>
                  <CodeSnippet
                    code={String.raw`import { createApp } from 'vue';
import { KeverdPlugin } from '@keverdjs/fraud-sdk-vue';

const app = createApp(App);
app.use(KeverdPlugin, {
  apiKey: 'your-api-key-here'
});`}
                    language="javascript"
                  />
                </div>

                <div id="angular-sdk" className="bg-white/50 rounded-xl p-6 border border-gray-200 scroll-mt-20">
                  <h3 className="font-semibold text-keverd-ink mb-3">
                    <Link href="/docs/angular" className="hover:text-keverd-blue transition-colors inline-flex items-center gap-2">
                      Angular SDK
                      <ArrowRight size={16} className="text-keverd-blue" />
                    </Link>
                  </h3>
                  <CodeSnippet
                    code={String.raw`import { KeverdModule } from '@keverdjs/fraud-sdk-angular';

@NgModule({
  imports: [
    KeverdModule.forRoot({
      apiKey: 'your-api-key-here'
    })
  ]
})`}
                    language="typescript"
                  />
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="pb-8 border-b border-gray-200">
              <h2 className="section-title mb-6">Best Practices</h2>
              <div className="space-y-4">
                <div id="store-keys-securely" className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200 scroll-mt-20">
                  <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-keverd-ink mb-1">Store Keys Securely</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Never commit API keys to version control. Use environment variables or secure configuration management. For web applications, use environment variables (like <code className="bg-keverd-sand/50 px-1 rounded text-xs">process.env.KEVERD_API_KEY</code>). For mobile apps, use secure storage mechanisms provided by the platform.
                    </p>
                  </div>
                </div>

                <div id="different-keys-environments" className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200 scroll-mt-20">
                  <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-keverd-ink mb-1">Use Different Keys for Environments</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Create separate API keys for development, staging, and production environments. This allows you to track usage separately, apply different rate limits, and rotate keys independently. It also helps isolate issues and prevents production keys from being exposed in development environments.
                    </p>
                  </div>
                </div>

                <div id="rotate-keys-regularly" className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200 scroll-mt-20">
                  <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-keverd-ink mb-1">Rotate Keys Regularly</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Periodically rotate your API keys for enhanced security. Create a new key, update your applications, then delete the old key. We recommend rotating keys every 90 days for production applications. The dashboard allows you to disable keys without deleting them, making it easy to test new keys before fully rotating.
                    </p>
                  </div>
                </div>

                <div id="monitor-key-usage" className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200 scroll-mt-20">
                  <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-keverd-ink mb-1">Monitor Key Usage</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Regularly check your API key usage in the dashboard to monitor activity and detect any unauthorized access. The dashboard provides detailed analytics including request counts, error rates, and usage patterns. Set up alerts for unusual activity or when usage exceeds expected thresholds.
                    </p>
                  </div>
                </div>

                <div id="descriptive-names" className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200 scroll-mt-20">
                  <CheckCircle2 className="text-keverd-blue flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-keverd-ink mb-1">Use Descriptive Names</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Give your API keys descriptive names that indicate their purpose and environment. This makes it easier to manage multiple keys and identify which key is being used in which application. Examples: "Production Web App", "Staging Mobile App", "Development Testing".
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Workspace Association */}
            <section id="workspace-association" className="pb-8">
              <h2 className="section-title mb-6">Workspace Association</h2>
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  API keys can be associated with specific workspaces (tenants) for better organization and access control. When creating an API key, you can optionally specify which workspace it belongs to. This is particularly useful for organizations with multiple teams or projects.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Workspace association allows you to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                  <li>Organize API keys by team, project, or department</li>
                  <li>Apply different access controls and permissions per workspace</li>
                  <li>Track usage and analytics separately for each workspace</li>
                  <li>Manage billing and subscriptions at the workspace level</li>
                </ul>
                <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Note:</strong> If you're part of multiple workspaces, make sure to select the correct workspace when creating API keys to ensure proper access control and analytics tracking. You can switch between workspaces in the dashboard using the workspace selector in the top navigation.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="py-8 border-t border-gray-200">
              <Button href="https://dashboard.keverd.com" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  Go to Dashboard
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
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
