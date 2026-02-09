"use client";

import Link from "next/link";
import { CodeSnippet } from "../../components/CodeSnippet";
import { TableOfContents } from "../../components/TableOfContents";
import { StructuredData } from "../../components/StructuredData";
import { SDKNavigation } from "../../components/SDKNavigation";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const tableOfContents = [
  { id: "installation", title: "Installation" },
  { id: "quick-start", title: "Quick Start" },
  { id: "session-management", title: "Session Management" },
  { id: "api-reference", title: "API Reference" },
  { id: "keverd-provider", title: "KeverdProvider", level: 2 },
  { id: "use-keverd-visitor-data", title: "useKeverdVisitorData", level: 2 },
  { id: "use-keverd-context", title: "useKeverdContext", level: 2 },
  { id: "keverd-visitor-data", title: "KeverdVisitorData", level: 2 },
  { id: "data-collection", title: "Data Collection", level: 2 },
  { id: "complete-example", title: "Complete Example" },
  { id: "error-handling", title: "Error Handling" },
  { id: "best-practices", title: "Best Practices" },
  { id: "risk-score-interpretation", title: "Risk Score Interpretation" },
  { id: "features", title: "Features" },
  { id: "requirements", title: "Requirements" },
];

export default function ReactDocsPage() {
  return (
    <>
      <StructuredData
        title="React SDK Documentation"
        description="Complete React SDK documentation for Keverd fraud detection. Learn how to integrate device fingerprinting and behavioral analytics into your React application using hooks and providers."
        path="/docs/react"
        type="TechArticle"
      />
      <div className="flex w-full max-w-7xl mx-auto p-4">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8 py-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title mb-3">React SDK</h1>
            <p className="text-gray-600 text-lg">
              React hooks and components for seamless integration in React applications
            </p>
          </div>

          {/* Installation */}
          <section id="installation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Installation</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">npm (Recommended)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Install the React SDK using npm, the Node.js package manager. This is the recommended installation method for most React projects.
                </p>
                <CodeSnippet
                  code={String.raw`npm install @keverdjs/fraud-sdk-react`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">yarn</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Alternatively, install using Yarn if you prefer it over npm.
                </p>
                <CodeSnippet
                  code={String.raw`yarn add @keverdjs/fraud-sdk-react`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Peer Dependencies</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The React SDK requires React 16.8.0 or higher (for hooks support) and React DOM 16.8.0 or higher. These should already be installed in your React project, but if not, install them:
                </p>
                <CodeSnippet
                  code={String.raw`npm install react react-dom
# or
yarn add react react-dom`}
                  language="bash"
                />
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  <strong>Note:</strong> The SDK uses React hooks (useState, useEffect, useCallback, useContext) internally, so React 16.8.0+ is required. The SDK is compatible with both class components and function components, but hooks can only be used in function components.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Quick Start</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">1. Wrap Your App with KeverdProvider</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">KeverdProvider</code> component initializes the SDK and provides it to all child components via React Context. Wrap your root component (or the highest component that needs access to the SDK) with <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">KeverdProvider</code>.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>For Next.js:</strong> Place the provider in your <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">_app.tsx</code> or <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">_app.js</code> file. For Create React App or other React setups, place it in your root <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">App.js</code> or <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">index.js</code>.
                </p>
                <CodeSnippet
                  code={String.raw`import { KeverdProvider } from '@keverdjs/fraud-sdk-react';

// Next.js: _app.tsx or _app.js
function MyApp({ Component, pageProps }) {
  return (
    <KeverdProvider
      loadOptions={{
        apiKey: process.env.NEXT_PUBLIC_KEVERD_API_KEY, // Use environment variables
        debug: process.env.NODE_ENV === 'development', // Enable debug in dev only
      }}
    >
      <Component {...pageProps} />
    </KeverdProvider>
  );
}

export default MyApp;`}
                  language="javascript"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Context Pattern:</strong> The <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdProvider</code> uses React Context to provide the SDK instance to all child components. This ensures the SDK is initialized once and shared across your entire application.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Initialization:</strong> The SDK is initialized automatically when the provider mounts. The initialization is synchronous and non-blocking, but you should wait for the SDK to be ready before making API calls (the <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdVisitorData</code> hook handles this automatically).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">2. Use the Hook in Your Components</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">useKeverdVisitorData</code> hook provides a React-friendly interface for accessing visitor data and risk assessment. The hook manages loading states, error handling, and data fetching automatically.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Performance:</strong> Data collection typically completes in under 50ms. The total time (including network request) is typically under 200ms (p99 latency). The hook uses React's state management to prevent unnecessary re-renders.
                </p>
                <CodeSnippet
                  code={String.raw`import { useKeverdVisitorData } from '@keverdjs/fraud-sdk-react';

export default function Home() {
  const { isLoading, error, data, getData } = useKeverdVisitorData({
    extendedResult: true, // Include extended result data
    immediate: true, // Automatically fetch data on mount
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading risk assessment...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => getData({ ignoreCache: true })}>
          Retry
        </button>
      </div>
    );
  }

  // Handle success state
  return (
    <div>
      <button onClick={() => getData({ ignoreCache: true })}>
        Reload data
      </button>
      <p>Visitor ID: {data?.visitorId}</p>
      <p>Risk Score: {data?.riskScore}/100</p>
      <p>Action: {data?.action}</p>
      <p>Reasons: {data?.reasons.join(', ')}</p>
      
      {/* Handle risk score */}
      {data && data.riskScore >= 70 && (
        <div className="alert alert-warning">
          High risk detected. Additional verification required.
        </div>
      )}
    </div>
  );
}`}
                  language="javascript"
                />
              </div>
            </div>
          </section>

          {/* Session Management */}
          <section id="session-management" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Session Management</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The React SDK provides comprehensive session management capabilities through the SDK instance. Sessions are automatically started when the SDK is initialized and ended when it's destroyed, but you can also manage them manually using the SDK instance from <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdContext</code>.
            </p>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Accessing Session Methods</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Use the <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdContext</code> hook to access the SDK instance and call session methods:
                </p>
                <CodeSnippet
                  code={String.raw`import { useKeverdContext } from '@keverdjs/fraud-sdk-react';

function MyComponent() {
  const { sdk, isReady } = useKeverdContext();

  const handleStartSession = async () => {
    if (isReady && sdk) {
      await sdk.startSession('user-123', undefined, {
        page: 'checkout'
      });
    }
  };

  const handlePauseSession = async () => {
    if (isReady && sdk) {
      await sdk.pauseSession();
    }
  };

  const handleResumeSession = async () => {
    if (isReady && sdk) {
      await sdk.resumeSession();
    }
  };

  const handleGetStatus = async () => {
    if (isReady && sdk) {
      const status = await sdk.getSessionStatus();
      if (status) {
        console.log('Session:', status.session_id);
        console.log('Events:', status.event_count);
      }
    }
  };

  const handleEndSession = async () => {
    if (isReady && sdk) {
      await sdk.endSession();
    }
  };

  return (
    <div>
      <button onClick={handleStartSession}>Start Session</button>
      <button onClick={handlePauseSession}>Pause Session</button>
      <button onClick={handleResumeSession}>Resume Session</button>
      <button onClick={handleGetStatus}>Get Status</button>
      <button onClick={handleEndSession}>End Session</button>
    </div>
  );
}`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Session Methods</h3>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">sdk.startSession(userId?: string, deviceHash?: string, metadata?: Record&lt;string, unknown&gt;): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Start a new session. Called automatically on initialization, but can be called manually.</p>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">sdk.endSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">End the current session. Called automatically when the provider unmounts.</p>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">sdk.pauseSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Pause the current session (e.g., when app goes to background).</p>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">sdk.resumeSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Resume a paused session (e.g., when app comes to foreground).</p>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">sdk.getSessionStatus(): Promise&lt;SessionStatus | null&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Get current session status including session ID, status, event count, and duration.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">API Reference</h2>
            
            <div className="space-y-10">
              <div id="keverd-provider" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">KeverdProvider</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">React Context Provider component that initializes the Keverd SDK and makes it available to all child components via React Context. This component should wrap your application root or the highest component that needs access to the SDK.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">KeverdProvider Props</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Prop</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Required</th>
                            <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 font-mono text-sm text-keverd-ink">loadOptions</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">KeverdLoadOptions</code></td>
                            <td className="py-3 px-4 text-gray-700">Yes</td>
                            <td className="py-3 px-4 text-gray-700">Configuration object for SDK initialization. See <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdLoadOptions</code> below for details.</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 font-mono text-sm text-keverd-ink">children</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">ReactNode</code></td>
                            <td className="py-3 px-4 text-gray-700">Yes</td>
                            <td className="py-3 px-4 text-gray-700">React children components that will have access to the SDK via context.</td>
                          </tr>
                        </tbody>
                      </table>
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

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Usage Example</h4>
                    <CodeSnippet
                      code={String.raw`<KeverdProvider
  loadOptions={{
    apiKey: process.env.NEXT_PUBLIC_KEVERD_API_KEY,
    debug: process.env.NODE_ENV === 'development',
  }}
>
  {children}
</KeverdProvider>`}
                      language="javascript"
                      showCopy={false}
                    />
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Lifecycle:</strong> The SDK is initialized when the provider mounts and destroyed when it unmounts. The initialization is synchronous and non-blocking.</p>
                      <p className="text-xs text-gray-600"><strong>Context:</strong> The provider uses React Context to share the SDK instance with all child components. Child components can access the SDK using the <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdContext</code> hook or the <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdVisitorData</code> hook.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="use-keverd-visitor-data" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">useKeverdVisitorData</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">React hook for accessing visitor data and risk assessment. This hook provides a React-friendly interface that manages loading states, error handling, and data fetching automatically. The hook must be used within a <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdProvider</code> component.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">useKeverdVisitorData(options?: KeverdVisitorDataHookOptions)</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Hook that returns visitor data, loading state, error state, and a function to manually fetch data.</p>
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
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">isLoading</code> (boolean): Whether data is currently being fetched. This is <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> during the initial fetch and when <code className="bg-white/50 px-1 rounded border border-gray-200">getData</code> is called.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">error</code> (KeverdError | null): Error object if the request failed. This is <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> when there's no error.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">data</code> (KeverdVisitorData | null): Visitor data and risk assessment. This is <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> until data is successfully fetched.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">getData</code> (function): Function to manually fetch data. Accepts optional <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdVisitorDataOptions</code> parameter. Returns a Promise that resolves to <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdVisitorData</code>.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Performance:</strong> The hook uses React's state management to prevent unnecessary re-renders. Data collection typically completes in under 50ms, and the total time (including network request) is typically under 200ms (p99 latency).</p>
                      <p className="text-xs text-gray-600"><strong>Error Handling:</strong> Errors are automatically caught and stored in the <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> state. The hook will not throw errors, so you can safely use it without try-catch blocks. However, the <code className="bg-white/50 px-1 rounded border border-gray-200">getData</code> function can throw errors if called manually.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Usage Example</h4>
                    <CodeSnippet
                      code={String.raw`const { isLoading, error, data, getData } = useKeverdVisitorData({
  extendedResult: true,
  immediate: true,
});

// Manual fetch with options
await getData({ ignoreCache: true });`}
                      language="javascript"
                      showCopy={false}
                    />
                  </div>
                </div>
              </div>

              <div id="use-keverd-context" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">useKeverdContext</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Hook to access the Keverd SDK instance directly from React Context. This hook provides direct access to the SDK instance and the ready state, allowing you to call SDK methods directly if needed. The hook must be used within a <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdProvider</code> component.</p>
                
                <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">useKeverdContext(): KeverdContextValue</h4>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">Hook that returns the SDK instance and ready state from React Context.</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                    <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdContextValue</code> object containing:</p>
                    <ul className="text-xs text-gray-600 ml-4 space-y-1">
                      <li><code className="bg-white/50 px-1 rounded border border-gray-200">sdk</code> (KeverdSDK): The SDK instance. Use this to call SDK methods directly (e.g., <code className="bg-white/50 px-1 rounded border border-gray-200">sdk.getVisitorData()</code>).</li>
                      <li><code className="bg-white/50 px-1 rounded border border-gray-200">isReady</code> (boolean): Whether the SDK is initialized and ready to use. This is <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> after the provider has initialized the SDK.</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2"><strong>Throws:</strong> Throws an error if called outside of a <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdProvider</code> component.</p>
                  </div>
                  <div className="mt-4">
                    <CodeSnippet
                      code={String.raw`import { useKeverdContext } from '@keverdjs/fraud-sdk-react';

function MyComponent() {
  const { sdk, isReady } = useKeverdContext();
  
  const handleCustomAction = async () => {
    if (isReady) {
      const data = await sdk.getVisitorData();
      // Custom logic with direct SDK access
    }
  };
  
  return <button onClick={handleCustomAction}>Check Risk</button>;
}`}
                      language="javascript"
                      showCopy={false}
                    />
                  </div>
                </div>
              </div>

              <div id="keverd-visitor-data" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">KeverdVisitorData</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">The visitor data object returned by the SDK. This object contains the risk assessment, action recommendation, and session information.</p>
                
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
  
  // Registration-specific fields (when using verifyRegistration via SDK)
  behavior_change?: {           // Behavioral change analysis
    baseline_available: boolean;
    behavior_changed: boolean;
    change_score: number;
    change_reasons: string[];
    similarity_score?: number;
  };
  adaptive_response?: {          // Adaptive response recommendations
    recommended_action: string;
    challenges: string[];
    reason: string;
    confidence: number;
  };
  
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

          {/* Registration Behavioral Monitoring */}
          <section id="registration-behavioral-monitoring" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-8">Registration Behavioral Monitoring</h2>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Overview</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  For registration flows, use the SDK's <code className="bg-white/50 px-1 rounded border border-gray-200">verifyRegistration</code> method (available via <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdContext</code>) to enable continuous behavioral monitoring. This provides enhanced bot detection and behavior change analysis.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Key Features:</p>
                  <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
                    <li><strong>Automatic Baseline:</strong> SDK automatically establishes behavioral baseline from first interactions</li>
                    <li><strong>Session Tracking:</strong> All events in a registration session are linked together</li>
                    <li><strong>Behavior Change Detection:</strong> Detects mid-session behavior deviations</li>
                    <li><strong>Adaptive Responses:</strong> Receives recommendations for MFA, CAPTCHA, or custom flows</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Registration Flow Example</h3>
                <CodeSnippet
                  code={String.raw`import { useKeverdContext } from '@keverdjs/fraud-sdk-react';
import { useState } from 'react';

function RegistrationForm() {
  const { sdk, isReady } = useKeverdContext();
  const [step, setStep] = useState('form');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (formData: RegistrationFormData) => {
    if (!isReady || !sdk) {
      setError('SDK not ready');
      return;
    }
    
    try {
      // Verify registration with behavioral monitoring
      const result = await sdk.verifyRegistration({
        email: formData.email,
        username: formData.username
      });
      
      // Check risk level and adaptive response
      if (result.action === 'block') {
        setError('Registration blocked due to security concerns');
        return;
      }
      
      // Handle challenges based on adaptive response
      if (result.action === 'hard_challenge' || result.action === 'soft_challenge') {
        const challenges = result.adaptive_response?.challenges || [];
        
        if (challenges.includes('captcha')) {
          setStep('captcha');
          // Show CAPTCHA component
        }
        
        if (challenges.includes('mfa')) {
          setStep('mfa');
          // Send verification code
          await sendVerificationCode(formData.email);
        }
        
        // After challenges, re-verify
        const recheck = await sdk.verifyRegistration();
        if (recheck.action !== 'allow') {
          setError('Verification failed. Please try again.');
          return;
        }
      }
      
      // Check for behavior changes
      if (result.behavior_change?.behavior_changed) {
        console.warn('Behavior change detected:', result.behavior_change.change_reasons);
        
        // If significant change, require additional verification
        if (result.behavior_change.change_score > 50) {
          await sendEmailVerification(formData.email);
          setStep('verify-email');
          return;
        }
      }
      
      // Proceed with registration
      await createUserAccount(formData);
      setStep('success');
      
    } catch (err) {
      console.error('Registration verification failed:', err);
      setError('Registration failed. Please try again.');
    }
  };
  
  return (
    // Your registration form JSX
  );
}`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Understanding the Response</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The <code className="bg-white/50 px-1 rounded border border-gray-200">verifyRegistration</code> response includes enhanced fields for behavioral monitoring:
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">action</p>
                    <p className="text-xs text-gray-700">Recommended action: <code className="bg-gray-100 px-1 rounded">"allow"</code>, <code className="bg-gray-100 px-1 rounded">"soft_challenge"</code>, <code className="bg-gray-100 px-1 rounded">"hard_challenge"</code>, or <code className="bg-gray-100 px-1 rounded">"block"</code></p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">behavior_change</p>
                    <p className="text-xs text-gray-700">Object containing baseline comparison, behavior change detection, similarity score, and change reasons</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">adaptive_response</p>
                    <p className="text-xs text-gray-700">Recommended challenges (MFA, CAPTCHA) and confidence level</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mt-4">
                  <Info className="inline mr-1" size={12} />
                  See <Link href="/docs/api#registration-behavioral-monitoring" className="underline">API Documentation</Link> for complete response format and handling guide.
                </p>
              </div>
            </div>
          </section>

          {/* Data Collection */}
          <section id="data-collection" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Data Collection</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The React SDK collects the same types of data as the Vanilla JavaScript SDK: device information, session information, and behavioral data. All sensitive identifiers are hashed client-side before transmission to ensure privacy and compliance with data protection regulations. No personally identifiable information (PII) is collected or transmitted in plain text.
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
              Here's a complete example showing how to integrate the React SDK into a Next.js application. This example demonstrates provider setup, hook usage, risk assessment, and error handling.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <CodeSnippet
                code={String.raw`import { KeverdProvider, useKeverdVisitorData } from '@keverdjs/fraud-sdk-react';

// App.tsx or _app.tsx
function App() {
  return (
    <KeverdProvider
      loadOptions={{
        apiKey: 'your-api-key-here',
        debug: false,
      }}
    >
      <HomePage />
    </KeverdProvider>
  );
}

// HomePage.tsx
function HomePage() {
  const { isLoading, error, data, getData } = useKeverdVisitorData({
    extendedResult: true,
    immediate: true,
  });

  const handleRiskCheck = async () => {
    try {
      await getData({ ignoreCache: true });
    } catch (err) {
      console.error('Failed to get visitor data:', err);
    }
  };

  if (isLoading) {
    return <div>Loading risk assessment...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={handleRiskCheck}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return <button onClick={handleRiskCheck}>Check Risk</button>;
  }

  // Handle risk score
  const getRiskLevel = () => {
    if (data.riskScore >= 70) return 'high';
    if (data.riskScore >= 30) return 'medium';
    return 'low';
  };

  return (
    <div>
      <h1>Risk Assessment</h1>
      <div>
        <p>Risk Score: {data.riskScore}/100</p>
        <p>Action: {data.action}</p>
        <p>Reasons: {data.reasons.join(', ')}</p>
        <p>Risk Level: {getRiskLevel()}</p>
      </div>
      <button onClick={handleRiskCheck}>Refresh</button>
    </div>
  );
}`}
                language="javascript"
              />
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Error Handling</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The React SDK handles errors gracefully and provides them through the <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> state in the <code className="bg-white/50 px-1 rounded border border-gray-200">useKeverdVisitorData</code> hook. Here's how to handle different error scenarios:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Network Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Network errors occur when the device cannot connect to the API or when the request times out. The SDK uses 30-second timeouts for connection, read, and write operations.
                </p>
                <CodeSnippet
                  code={String.raw`const { isLoading, error, data, getData } = useKeverdVisitorData({
  immediate: true,
});

useEffect(() => {
  if (error) {
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      // Handle timeout - retry with exponential backoff
      console.warn('Request timed out, retrying...');
      setTimeout(() => getData({ ignoreCache: true }), 1000);
    } else if (error.message.includes('network') || error.message.includes('Network')) {
      // Handle network connectivity issues
      console.error('Network error:', error.message);
      showNetworkError();
    }
  }
}, [error, getData]);`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">API Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  API errors occur when the server returns an error status code (4xx or 5xx). Common causes include invalid API keys, rate limiting, or server errors.
                </p>
                <CodeSnippet
                  code={String.raw`useEffect(() => {
  if (error) {
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      // Invalid API key
      console.error('Invalid API key. Please check your configuration.');
      showConfigurationError();
    } else if (error.message.includes('429') || error.message.includes('rate limit')) {
      // Rate limit exceeded
      console.warn('Rate limit exceeded. Please retry after some time.');
      showRateLimitError();
    } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
      // Server errors - retry with backoff
      console.error('Server error:', error.message);
      retryWithBackoff();
    } else {
      // Other API errors
      console.error('API error:', error.message);
      handleApiError(error);
    }
  }
}, [error]);`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">SDK Not Ready Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  These errors occur when you try to use the SDK before it's initialized or when the provider hasn't mounted yet.
                </p>
                <CodeSnippet
                  code={String.raw`const { isLoading, error, data, getData } = useKeverdVisitorData({
  immediate: true,
});

useEffect(() => {
  if (error && error.code === 'SDK_NOT_READY') {
    // SDK not initialized - wait a bit and retry
    console.warn('SDK not ready, retrying...');
    setTimeout(() => getData({ ignoreCache: true }), 100);
  }
}, [error, getData]);`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Best Practices for Error Handling</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use useEffect to monitor errors:</strong> Set up a <code className="bg-white/50 px-1 rounded border border-gray-200">useEffect</code> hook to monitor the <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> state and handle errors appropriately.</li>
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
              Follow these best practices to ensure optimal performance, security, and user experience when integrating the React SDK:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Provider Setup</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Place provider high in component tree:</strong> Place the <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdProvider</code> as high as possible in your component tree (ideally at the root level) to ensure all components have access to the SDK.</li>
                  <li><strong>Use environment variables:</strong> Store your API key in environment variables and never commit it to version control. Use different API keys for development, staging, and production environments.</li>
                  <li><strong>Enable debug in development only:</strong> Set <code className="bg-white/50 px-1 rounded border border-gray-200">debug: true</code> only in development environments. Disable it in production to avoid exposing sensitive information in the console.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Hook Usage</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use immediate option wisely:</strong> Set <code className="bg-white/50 px-1 rounded border border-gray-200">immediate: true</code> only when you need data immediately on component mount. For on-demand fetching, use <code className="bg-white/50 px-1 rounded border border-gray-200">immediate: false</code> and call <code className="bg-white/50 px-1 rounded border border-gray-200">getData()</code> manually.</li>
                  <li><strong>Avoid excessive calls:</strong> Don't call <code className="bg-white/50 px-1 rounded border border-gray-200">getData()</code> on every render or user interaction. Use it strategically for high-value or high-risk operations.</li>
                  <li><strong>Handle loading and error states:</strong> Always handle the <code className="bg-white/50 px-1 rounded border border-gray-200">isLoading</code> and <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> states in your components to provide good user experience.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Security</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Protect your API key:</strong> Never expose your API key in client-side code that can be viewed in the browser. Use environment variables or a secure configuration management system.</li>
                  <li><strong>Secure Communication:</strong> All SDK communication uses HTTPS to ensure secure data transmission.</li>
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
                  <h3 className="font-semibold text-keverd-ink mb-1">React Hooks</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Easy-to-use hooks for React components</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Provider Pattern</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Centralized configuration with context</p>
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
                  <h3 className="font-semibold text-keverd-ink mb-1">Next.js Compatible</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Works seamlessly with Next.js</p>
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
                  <span className="text-gray-700">React 16.8.0 or higher</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">React DOM 16.8.0 or higher</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Modern browser with ES2020 support</span>
                </li>
              </ul>
            </div>
          </section>
          
          <SDKNavigation currentSDK="react" />
        </main>
      </div>
    </>
  );
}
