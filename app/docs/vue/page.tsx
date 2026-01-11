"use client";

import { CodeSnippet } from "../../components/CodeSnippet";
import { TableOfContents } from "../../components/TableOfContents";
import { StructuredData } from "../../components/StructuredData";
import { SDKNavigation } from "../../components/SDKNavigation";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const tableOfContents = [
  { id: "installation", title: "Installation" },
  { id: "quick-start", title: "Quick Start" },
  { id: "api-reference", title: "API Reference" },
  { id: "use-keverd-provider", title: "useKeverdProvider", level: 2 },
  { id: "use-keverd-visitor-data", title: "useKeverdVisitorData", level: 2 },
  { id: "use-keverd-context", title: "useKeverdContext", level: 2 },
  { id: "keverd-visitor-data", title: "KeverdVisitorData", level: 2 },
  { id: "data-collection", title: "Data Collection", level: 2 },
  { id: "complete-example", title: "Complete Example" },
  { id: "plugin-installation", title: "Plugin Installation" },
  { id: "error-handling", title: "Error Handling" },
  { id: "best-practices", title: "Best Practices" },
  { id: "risk-score-interpretation", title: "Risk Score Interpretation" },
  { id: "features", title: "Features" },
  { id: "requirements", title: "Requirements" },
];

export default function VueDocsPage() {
  return (
    <>
      <StructuredData
        title="Vue.js SDK Documentation"
        description="Complete Vue.js SDK documentation for Keverd fraud detection. Learn how to integrate device fingerprinting and behavioral analytics into your Vue 3 application using composables and plugins."
        path="/docs/vue"
        type="TechArticle"
      />
      <div className="flex w-full max-w-7xl mx-auto p-4">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8 py-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title mb-3">Vue.js SDK</h1>
            <p className="text-gray-600 text-lg">
              Vue 3 composables and plugin for seamless integration in Vue.js applications
            </p>
          </div>

          {/* Installation */}
          <section id="installation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Installation</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">npm (Recommended)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Install the Vue SDK using npm, the Node.js package manager. This is the recommended installation method for most Vue projects.
                </p>
                <CodeSnippet
                  code={String.raw`npm install @keverdjs/fraud-sdk-vue`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">yarn</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Alternatively, install using Yarn if you prefer it over npm.
                </p>
                <CodeSnippet
                  code={String.raw`yarn add @keverdjs/fraud-sdk-vue`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Peer Dependencies</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The Vue SDK requires Vue 3.0 or higher (for Composition API support). Vue should already be installed in your project, but if not, install it:
                </p>
                <CodeSnippet
                  code={String.raw`npm install vue@^3.0.0
# or
yarn add vue@^3.0.0`}
                  language="bash"
                />
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  <strong>Note:</strong> The SDK uses Vue 3's Composition API (composables, refs, provide/inject) internally, so Vue 3.0+ is required. The SDK is compatible with both Options API and Composition API components, but composables can only be used in Composition API components.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Quick Start</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">1. Setup Provider or Install Plugin</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  You can use the SDK in two ways: install it as a Vue plugin (recommended for global access) or use the <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">useKeverdProvider</code> composable in your root component.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Important:</strong> The <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">endpoint</code> must use HTTPS. The SDK will throw an error if you provide an HTTP URL. The default API endpoint is <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">https://api.keverd.com</code>.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Option A - Plugin Installation (Recommended):</strong> Install the SDK as a Vue plugin for global access across all components.
                </p>
                <CodeSnippet
                  code={String.raw`import { createApp } from 'vue';
import App from './App.vue';
import KeverdPlugin from '@keverdjs/fraud-sdk-vue';

const app = createApp(App);

app.use(KeverdPlugin, {
  apiKey: process.env.VUE_APP_KEVERD_API_KEY, // Use environment variables
  endpoint: 'https://api.keverd.com', // Optional: defaults to https://api.keverd.com
  debug: process.env.NODE_ENV === 'development', // Enable debug in dev only
});

app.mount('#app');`}
                  language="javascript"
                />
                <p className="text-sm text-gray-600 mt-4 mb-4 leading-relaxed">
                  <strong>Option B - Composable Setup:</strong> Use the <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">useKeverdProvider</code> composable in your root component.
                </p>
                <CodeSnippet
                  code={String.raw`<script setup>
import { useKeverdProvider } from '@keverdjs/fraud-sdk-vue';

// Setup provider (call once in root component, e.g., App.vue)
useKeverdProvider({
  apiKey: import.meta.env.VITE_KEVERD_API_KEY,
  endpoint: 'https://api.keverd.com',
  debug: import.meta.env.DEV
});
</script>`}
                  language="vue"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Dependency Injection:</strong> The SDK uses Vue's <code className="bg-white/50 px-1 rounded border border-gray-200">provide/inject</code> API to share the SDK instance with all child components. This ensures the SDK is initialized once and shared across your entire application.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Reactive State:</strong> The SDK instance and ready state are provided as Vue refs, making them reactive. Components can reactively respond to SDK state changes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">2. Use Composable in Components</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">useKeverdVisitorData</code> composable provides a Vue-friendly interface for accessing visitor data and risk assessment. The composable manages loading states, error handling, and data fetching automatically using Vue's reactivity system.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Performance:</strong> Data collection typically completes in under 50ms. The total time (including network request) is typically under 200ms (p99 latency). The composable uses Vue's reactivity system to prevent unnecessary re-renders.
                </p>
                <CodeSnippet
                  code={String.raw`<script setup>
import { useKeverdVisitorData } from '@keverdjs/fraud-sdk-vue';

// Use composable in any component
const { data, loading, error, getData } = useKeverdVisitorData({
  extendedResult: true, // Include extended result data
  immediate: true, // Automatically fetch data on mount
});

// Handle risk score reactively
const riskLevel = computed(() => {
  if (!data.value) return 'unknown';
  if (data.value.riskScore >= 70) return 'high';
  if (data.value.riskScore >= 30) return 'medium';
  return 'low';
});
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading">Loading risk assessment...</div>
    
    <!-- Error state -->
    <div v-else-if="error">
      <p>Error: {{ error.message }}</p>
      <button @click="getData">Retry</button>
    </div>
    
    <!-- Success state -->
    <div v-else-if="data">
      <p>Risk Score: {{ data.riskScore }}/100</p>
      <p>Action: {{ data.action }}</p>
      <p>Reasons: {{ data.reasons.join(', ') }}</p>
      <p>Risk Level: {{ riskLevel }}</p>
      <button @click="getData">Reload data</button>
    </div>
    
    <!-- No data state -->
    <div v-else>
      <button @click="getData">Check Risk</button>
    </div>
  </div>
</template>`}
                  language="vue"
                />
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">API Reference</h2>
            
            <div className="space-y-8">
              <div id="use-keverd-provider" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">useKeverdProvider</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Composable that sets up the Keverd SDK provider using Vue's dependency injection system. This composable initializes the SDK and provides it to all child components via Vue's <code className="bg-white/50 px-1 rounded border border-gray-200">provide/inject</code> API. Call this composable once in your root component (e.g., <code className="bg-white/50 px-1 rounded border border-gray-200">App.vue</code>) or app setup.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">useKeverdProvider(options: KeverdLoadOptions)</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Composable that initializes the SDK and provides it to child components via dependency injection.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">options</code> (KeverdLoadOptions): Configuration object for SDK initialization. See <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdLoadOptions</code> below for details.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">void</code></p>
                      <p className="text-xs text-gray-600"><strong>Dependency Injection:</strong> The composable uses Vue's <code className="bg-white/50 px-1 rounded border border-gray-200">provide</code> API to inject the SDK instance and ready state into the component tree. Child components can access these via <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdContext</code> or <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdVisitorData</code>.</p>
                      <p className="text-xs text-gray-600"><strong>Reactive State:</strong> The SDK instance and ready state are provided as Vue refs, making them reactive. Components can reactively respond to SDK state changes.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">KeverdLoadOptions</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Property</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Required</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Default</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 font-mono text-sm text-keverd-ink">apiKey</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                            <td className="py-3 px-4 text-gray-700">Yes</td>
                            <td className="py-3 px-4 text-gray-700">—</td>
                            <td className="py-3 px-4 text-gray-700">API key for authenticating requests to the Keverd API. Obtain your API key from the <a href="/api-keys" className="text-keverd-blue hover:underline">API Keys page</a> in the dashboard. Keep your API key secure and never commit it to version control. Use environment variables in production.</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 font-mono text-sm text-keverd-ink">endpoint</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                            <td className="py-3 px-4 text-gray-700">No</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">'https://api.keverd.com'</code></td>
                            <td className="py-3 px-4 text-gray-700">Base URL for the fingerprint API endpoint. Must start with "https://" (HTTP is not allowed for security). Only change this if you're using a custom endpoint or testing environment.</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 font-mono text-sm text-keverd-ink">debug</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">boolean</code></td>
                            <td className="py-3 px-4 text-gray-700">No</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">false</code></td>
                            <td className="py-3 px-4 text-gray-700">Enable debug logging. When <code className="bg-white/50 px-1 rounded border border-gray-200">true</code>, the SDK will log debug information to the browser console. Set to <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> during development and <code className="bg-white/50 px-1 rounded border border-gray-200">false</code> in production.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div id="use-keverd-visitor-data" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">useKeverdVisitorData</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Vue composable for accessing visitor data and risk assessment. This composable provides a Vue-friendly interface that manages loading states, error handling, and data fetching automatically using Vue's reactivity system. The composable must be used within a component that has access to the SDK via <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdProvider</code> or the Vue plugin.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">useKeverdVisitorData(options?: KeverdVisitorDataHookOptions)</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Composable that returns reactive visitor data, loading state, error state, and a function to manually fetch data.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">options</code> (optional): Hook configuration object</li>
                        <li className="ml-4">- <code className="bg-white/50 px-1 rounded border border-gray-200">extendedResult</code> (boolean, optional): Include extended result data in the response. Default: <code className="bg-white/50 px-1 rounded border border-gray-200">false</code></li>
                        <li className="ml-4">- <code className="bg-white/50 px-1 rounded border border-gray-200">immediate</code> (boolean, optional): Automatically fetch data when the component mounts. Default: <code className="bg-white/50 px-1 rounded border border-gray-200">false</code></li>
                        <li className="ml-4">- <code className="bg-white/50 px-1 rounded border border-gray-200">ignoreCache</code> (boolean, optional): Ignore cached results and force a fresh API call. Default: <code className="bg-white/50 px-1 rounded border border-gray-200">false</code></li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdVisitorDataResult</code> object containing:</p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">data</code> (Ref&lt;KeverdVisitorData | null&gt;): Reactive visitor data. This is a Vue ref that updates automatically when data is fetched.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">loading</code> (Ref&lt;boolean&gt;): Reactive loading state. This is <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> during the initial fetch and when <code className="bg-white/50 px-1 rounded border border-gray-200">getData</code> is called.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">error</code> (Ref&lt;KeverdError | null&gt;): Reactive error state. This is <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> when there's no error.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">getData</code> (function): Function to manually fetch data. Returns a Promise that resolves when data is fetched. Can throw errors if the request fails.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Reactivity:</strong> All returned values are Vue refs, making them reactive. Components will automatically re-render when these values change. Use <code className="bg-white/50 px-1 rounded border border-gray-200">.value</code> to access the underlying values in JavaScript, or use them directly in templates.</p>
                      <p className="text-xs text-gray-600"><strong>Performance:</strong> The composable uses Vue's reactivity system to prevent unnecessary re-renders. Data collection typically completes in under 50ms, and the total time (including network request) is typically under 200ms (p99 latency).</p>
                      <p className="text-xs text-gray-600"><strong>Error Handling:</strong> Errors are automatically caught and stored in the <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> ref. The composable will not throw errors, so you can safely use it without try-catch blocks. However, the <code className="bg-white/50 px-1 rounded border border-gray-200">getData</code> function can throw errors if called manually.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Usage Example</h4>
                    <CodeSnippet
                      code={String.raw`const { data, loading, error, getData } = useKeverdVisitorData({
  extendedResult: true,
  immediate: true
});

// Manual fetch
await getData();`}
                      language="javascript"
                      showCopy={false}
                    />
                  </div>
                </div>
              </div>

              <div id="use-keverd-context" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">useKeverdContext</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Composable to access the Keverd SDK instance directly from Vue's dependency injection system. This composable provides direct access to the SDK instance and the ready state, allowing you to call SDK methods directly if needed. The composable must be used within a component that has access to the SDK via <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdProvider</code> or the Vue plugin.</p>
                
                <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">useKeverdContext()</h4>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">Composable that returns the SDK instance and ready state from Vue's dependency injection system. Returns an object with <code className="bg-white/50 px-1 rounded border border-gray-200">sdk: Ref&lt;KeverdSDK | null&gt;</code> and <code className="bg-white/50 px-1 rounded border border-gray-200">isReady: Ref&lt;boolean&gt;</code>.</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                    <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> Object containing:</p>
                    <ul className="text-xs text-gray-600 ml-4 space-y-1">
                      <li><code className="bg-white/50 px-1 rounded border border-gray-200">sdk</code> (Ref&lt;KeverdSDK | null&gt;): The SDK instance as a Vue ref. Use <code className="bg-white/50 px-1 rounded border border-gray-200">sdk.value</code> to access the SDK instance and call methods directly (e.g., <code className="bg-white/50 px-1 rounded border border-gray-200">sdk.value.getVisitorData()</code>).</li>
                      <li><code className="bg-white/50 px-1 rounded border border-gray-200">isReady</code> (Ref&lt;boolean&gt;): Whether the SDK is initialized and ready to use. This is <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> after the provider has initialized the SDK. Use <code className="bg-white/50 px-1 rounded border border-gray-200">isReady.value</code> to check the ready state.</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2"><strong>Throws:</strong> Throws an error if called outside of a component that has access to the SDK (i.e., if <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdProvider</code> was not called or the plugin was not installed).</p>
                  </div>
                  <div className="mt-4">
                    <CodeSnippet
                      code={String.raw`const { sdk, isReady } = useKeverdContext();

if (isReady.value && sdk.value) {
  const data = await sdk.value.getVisitorData();
  // Custom logic with direct SDK access
}`}
                      language="javascript"
                      showCopy={false}
                    />
                  </div>
                </div>
              </div>

              <div id="keverd-visitor-data" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">KeverdVisitorData</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">The visitor data object returned by the SDK. This object contains the risk assessment, action recommendation, and session information. When returned from <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdVisitorData</code>, this object is wrapped in a Vue ref for reactivity.</p>
                
                <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">KeverdVisitorData Interface</h4>
                  <CodeSnippet
                    code={String.raw`interface KeverdVisitorData {
  visitorId: string;           // Unique visitor identifier (UUID)
  riskScore: number;            // Risk score (0-100, where 100 is highest risk)
  score: number;                // Risk score as float (0.0-1.0, normalized)
  action: 'allow' | 'soft_challenge' | 'hard_challenge' | 'block';
  reasons: string[];            // Array of risk reasons
  sessionId: string;            // Session identifier (UUID)
  requestId: string;            // Request identifier (UUID, same as sessionId)
  simSwapEngine?: {             // SIM swap detection results (null for web SDKs)
    risk: number;
    flags: {
      sim_changed?: boolean;
      device_changed?: boolean;
      behavior_anomaly?: boolean;
      time_anomaly?: boolean;
      velocity_anomaly?: boolean;
    };
  };
  confidence?: number;          // Confidence score (inverse of risk, 0.0-1.0)
}`}
                    language="typescript"
                    showCopy={false}
                  />
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-600"><strong>visitorId:</strong> Unique visitor identifier in UUID format. This identifier is consistent across sessions for the same device/browser.</p>
                    <p className="text-xs text-gray-600"><strong>riskScore:</strong> Risk score as an integer from 0 (lowest risk) to 100 (highest risk). Use this score to make security decisions in your application.</p>
                    <p className="text-xs text-gray-600"><strong>score:</strong> Normalized risk score as a float between 0.0 (lowest risk) and 1.0 (highest risk). This is equal to <code className="bg-white/50 px-1 rounded border border-gray-200">riskScore / 100</code>.</p>
                    <p className="text-xs text-gray-600"><strong>action:</strong> Recommended action based on the risk score. Possible values: <code className="bg-white/50 px-1 rounded border border-gray-200">'allow'</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">'soft_challenge'</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">'hard_challenge'</code>, or <code className="bg-white/50 px-1 rounded border border-gray-200">'block'</code>.</p>
                    <p className="text-xs text-gray-600"><strong>reasons:</strong> Array of strings explaining why the risk score was assigned. Each string describes a specific risk factor.</p>
                    <p className="text-xs text-gray-600"><strong>sessionId:</strong> Unique session identifier in UUID format. This identifier is generated client-side and is consistent across requests within the same browser session.</p>
                    <p className="text-xs text-gray-600"><strong>requestId:</strong> Unique request identifier in UUID format. This is the same as <code className="bg-white/50 px-1 rounded border border-gray-200">sessionId</code> and is included for backward compatibility.</p>
                    <p className="text-xs text-gray-600"><strong>simSwapEngine:</strong> SIM swap detection data. This field is always <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> or <code className="bg-white/50 px-1 rounded border border-gray-200">undefined</code> for web SDKs, as SIM card information is only available on mobile devices.</p>
                    <p className="text-xs text-gray-600"><strong>confidence:</strong> Confidence score as a float between 0.0 and 1.0. This is the inverse of the risk score (confidence = 1.0 - score). Higher values indicate higher confidence in the assessment.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Collection */}
          <section id="data-collection" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Data Collection</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Vue SDK collects the same types of data as the Vanilla JavaScript SDK: device information, session information, and behavioral data. All sensitive identifiers are hashed client-side before transmission to ensure privacy and compliance with data protection regulations. No personally identifiable information (PII) is collected or transmitted in plain text.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Device Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected automatically by the SDK. Includes device fingerprint, screen dimensions, timezone, locale, and hardware information. All sensitive data is hashed using SHA-256 before transmission.
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Session Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Tracks session and installation data. Session data is persisted in localStorage and is consistent across page reloads within the same browser session.
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Behavioral Data</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected passively as users interact with your application. The collector tracks mouse movements, keyboard input, touch gestures, and scroll events. Data collection starts automatically when the SDK is initialized and stops when the provider unmounts.
                </p>
                <p className="text-xs text-gray-600 mt-2"><strong>Privacy:</strong> Behavioral data is aggregated and anonymized. Individual keystrokes or mouse movements are not transmitted; only statistical summaries are sent to the API.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Hashing and Privacy</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  All sensitive identifiers are hashed using SHA-256 before transmission. The SDK handles all hashing operations internally. This approach ensures compliance with GDPR, CCPA, and other data protection regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Complete Example */}
          <section id="complete-example" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Complete Example</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Here's a complete example showing how to integrate the Vue SDK into a Vue 3 application. This example demonstrates provider setup, composable usage, risk assessment, and error handling.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <CodeSnippet
                code={String.raw`<script setup>
import { ref } from 'vue';
import { useKeverdProvider, useKeverdVisitorData } from '@keverdjs/fraud-sdk-vue';

// Setup provider (in root component)
useKeverdProvider({
  apiKey: 'your-api-key-here',
  endpoint: 'https://api.keverd.com',
  debug: false
});

// Use composable
const { data, loading, error, getData } = useKeverdVisitorData({
  extendedResult: true,
  immediate: true
});

const handleRiskCheck = async () => {
  try {
    await getData();
  } catch (err) {
    console.error('Failed to get visitor data:', err);
  }
};

const getRiskLevel = () => {
  if (!data.value) return 'unknown';
  if (data.value.riskScore >= 70) return 'high';
  if (data.value.riskScore >= 30) return 'medium';
  return 'low';
};
</script>

<template>
  <div>
    <h1>Risk Assessment</h1>
    
    <div v-if="loading">Loading risk assessment...</div>
    
    <div v-else-if="error">
      <p>Error: {{ error.message }}</p>
      <button @click="handleRiskCheck">Retry</button>
    </div>
    
    <div v-else-if="data">
      <p>Risk Score: {{ data.riskScore }}/100</p>
      <p>Action: {{ data.action }}</p>
      <p>Reasons: {{ data.reasons.join(', ') }}</p>
      <p>Risk Level: {{ getRiskLevel() }}</p>
      <button @click="handleRiskCheck">Refresh</button>
    </div>
    
    <div v-else>
      <button @click="handleRiskCheck">Check Risk</button>
    </div>
  </div>
</template>`}
                language="vue"
              />
            </div>
          </section>

          {/* Plugin Installation */}
          <section id="plugin-installation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Plugin Installation</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You can install the SDK as a Vue plugin for global access across all components. This is the recommended approach if you want to use the SDK throughout your entire application without calling <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdProvider</code> in each component.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                You can also install the SDK as a Vue plugin for global access:
              </p>
              <CodeSnippet
                code={String.raw`import { createApp } from 'vue';
import App from './App.vue';
import KeverdPlugin from '@keverdjs/fraud-sdk-vue';

const app = createApp(App);

app.use(KeverdPlugin, {
  apiKey: 'your-api-key-here',
  endpoint: 'https://api.keverd.com',
  debug: false
});

app.mount('#app');`}
                language="javascript"
              />
              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                After installing the plugin, you can use <code className="bg-keverd-sand/50 px-1 rounded text-xs">useKeverdVisitorData</code> and <code className="bg-keverd-sand/50 px-1 rounded text-xs">useKeverdContext</code> in any component without calling <code className="bg-keverd-sand/50 px-1 rounded text-xs">useKeverdProvider</code>.
              </p>
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Error Handling</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Vue SDK handles errors gracefully and provides them through the reactive <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> ref in the <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdVisitorData</code> composable. Here's how to handle different error scenarios:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Network Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Network errors occur when the device cannot connect to the API or when the request times out. The SDK uses 30-second timeouts for connection, read, and write operations.
                </p>
                <CodeSnippet
                  code={String.raw`<script setup>
import { watch } from 'vue';
import { useKeverdVisitorData } from '@keverdjs/fraud-sdk-vue';

const { data, loading, error, getData } = useKeverdVisitorData({
  immediate: true,
});

watch(error, (err) => {
  if (err) {
    if (err.message.includes('timeout') || err.message.includes('Timeout')) {
      // Handle timeout - retry with exponential backoff
      console.warn('Request timed out, retrying...');
      setTimeout(() => getData(), 1000);
    } else if (err.message.includes('network') || err.message.includes('Network')) {
      // Handle network connectivity issues
      console.error('Network error:', err.message);
      showNetworkError();
    }
  }
});
</script>`}
                  language="vue"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">API Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  API errors occur when the server returns an error status code (4xx or 5xx). Common causes include invalid API keys, rate limiting, or server errors.
                </p>
                <CodeSnippet
                  code={String.raw`watch(error, (err) => {
  if (err) {
    if (err.message.includes('401') || err.message.includes('Unauthorized')) {
      // Invalid API key
      console.error('Invalid API key. Please check your configuration.');
      showConfigurationError();
    } else if (err.message.includes('429') || err.message.includes('rate limit')) {
      // Rate limit exceeded
      console.warn('Rate limit exceeded. Please retry after some time.');
      showRateLimitError();
    } else if (err.message.includes('500') || err.message.includes('502') || err.message.includes('503')) {
      // Server errors - retry with backoff
      console.error('Server error:', err.message);
      retryWithBackoff();
    }
  }
});`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">SDK Not Ready Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  These errors occur when you try to use the SDK before it's initialized or when the provider hasn't mounted yet.
                </p>
                <CodeSnippet
                  code={String.raw`watch(error, (err) => {
  if (err && err.code === 'SDK_NOT_READY') {
    // SDK not initialized - wait a bit and retry
    console.warn('SDK not ready, retrying...');
    setTimeout(() => getData(), 100);
  }
});`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Best Practices for Error Handling</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use watch to monitor errors:</strong> Set up a <code className="bg-white/50 px-1 rounded border border-gray-200">watch</code> to monitor the <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> ref and handle errors appropriately.</li>
                  <li><strong>Implement retry logic:</strong> For transient errors (network timeouts, server errors), implement retry logic with exponential backoff.</li>
                  <li><strong>Fail gracefully:</strong> Decide on a fail-open or fail-closed strategy. Fail-open allows access when the SDK fails, while fail-closed blocks access. Choose based on your security requirements.</li>
                  <li><strong>Log errors:</strong> Log errors to your error tracking service (e.g., Sentry, LogRocket) for debugging and monitoring.</li>
                  <li><strong>User feedback:</strong> Provide clear feedback to users when errors occur, especially for authentication or security-related failures.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Best Practices</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Follow these best practices to ensure optimal performance, security, and user experience when integrating the Vue SDK:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Provider Setup</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Call provider once:</strong> Call <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdProvider</code> once in your root component (e.g., <code className="bg-white/50 px-1 rounded border border-gray-200">App.vue</code>) or install the plugin globally in your app setup.</li>
                  <li><strong>Use environment variables:</strong> Store your API key in environment variables and never commit it to version control. Use different API keys for development, staging, and production environments.</li>
                  <li><strong>Enable debug in development only:</strong> Set <code className="bg-white/50 px-1 rounded border border-gray-200">debug: true</code> only in development environments. Disable it in production to avoid exposing sensitive information in the console.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Composable Usage</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use immediate option wisely:</strong> Set <code className="bg-white/50 px-1 rounded border border-gray-200">immediate: true</code> only when you need data immediately on component mount. For on-demand fetching, use <code className="bg-white/50 px-1 rounded border border-gray-200">immediate: false</code> and call <code className="bg-white/50 px-1 rounded border border-gray-200">getData()</code> manually.</li>
                  <li><strong>Avoid excessive calls:</strong> Don't call <code className="bg-white/50 px-1 rounded border border-gray-200">getData()</code> on every render or user interaction. Use it strategically for high-value or high-risk operations.</li>
                  <li><strong>Handle loading and error states:</strong> Always handle the <code className="bg-white/50 px-1 rounded border border-gray-200">loading</code> and <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> refs in your components to provide good user experience.</li>
                  <li><strong>Use computed properties:</strong> Use Vue's <code className="bg-white/50 px-1 rounded border border-gray-200">computed</code> to derive values from the data ref for better performance and reactivity.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Security</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Protect your API key:</strong> Never expose your API key in client-side code that can be viewed in the browser. Use environment variables or a secure configuration management system.</li>
                  <li><strong>Use HTTPS:</strong> Always use HTTPS endpoints. The SDK will not work with HTTP endpoints for security reasons.</li>
                  <li><strong>Validate risk scores:</strong> Don't blindly trust risk scores. Use them as one factor in your security decision-making process, along with other signals.</li>
                  <li><strong>Monitor for anomalies:</strong> Set up monitoring and alerting for unusual patterns in risk scores or error rates.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Performance</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Non-blocking:</strong> The SDK is designed to be non-blocking. Data collection and API calls happen asynchronously and won't block your UI.</li>
                  <li><strong>Minimal impact:</strong> Behavioral data collection is passive and has minimal impact on page performance. The SDK uses efficient event listeners that are automatically cleaned up.</li>
                  <li><strong>Bundle size:</strong> The SDK is lightweight and has a small bundle size. It won't significantly impact your application's load time.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Privacy and Compliance</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>GDPR compliance:</strong> The SDK is designed to be GDPR-compliant. All sensitive data is hashed client-side, and no PII is collected or transmitted.</li>
                  <li><strong>User consent:</strong> Consider obtaining user consent before initializing the SDK, especially in regions with strict privacy regulations.</li>
                  <li><strong>Privacy policy:</strong> Update your privacy policy to inform users about data collection and how it's used for fraud detection.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Risk Score Interpretation */}
          <section id="risk-score-interpretation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Risk Score Interpretation</h2>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Score Range</th>
                      <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Action</th>
                      <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-mono text-sm text-keverd-ink">0-29</td>
                      <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">allow</code></td>
                      <td className="py-3 px-4 text-gray-700">Low risk, proceed with login</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-mono text-sm text-keverd-ink">30-69</td>
                      <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">soft_challenge</code> or <code className="text-keverd-blue">hard_challenge</code></td>
                      <td className="py-3 px-4 text-gray-700">Moderate risk, require MFA</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-mono text-sm text-keverd-ink">70-100</td>
                      <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">block</code></td>
                      <td className="py-3 px-4 text-gray-700">High risk, deny access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Vue 3 Composables</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Reactive composables using Vue 3 Composition API</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Plugin System</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Easy global installation with Vue plugin</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">TypeScript Support</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Full type definitions included</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Reactive Data</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">All data is reactive using Vue refs</p>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section id="requirements" className="mb-10 pb-10">
            <h2 className="section-title mb-8">Requirements</h2>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Vue 3.0 or higher</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Modern browser with ES2020 support</span>
                </li>
              </ul>
            </div>
          </section>
          
          <SDKNavigation currentSDK="vue" />
        </main>
      </div>
    </>
  );
}
