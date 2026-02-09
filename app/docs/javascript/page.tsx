"use client";

import { CodeSnippet } from "../../components/CodeSnippet";
import { TableOfContents } from "../../components/TableOfContents";
import { StructuredData } from "../../components/StructuredData";
import { SDKNavigation } from "../../components/SDKNavigation";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

const tableOfContents = [
  { id: "installation", title: "Installation" },
  { id: "quick-start", title: "Quick Start" },
    { id: "session-management", title: "Session Management" },
  { id: "api-reference", title: "API Reference" },
  { id: "keverd-class", title: "Keverd", level: 2 },
  { id: "config", title: "SDKConfig", level: 2 },
  { id: "response-types", title: "Response Types", level: 2 },
  { id: "data-collection", title: "Data Collection", level: 2 },
  { id: "use-cases", title: "Use Case Integration Examples" },
  { id: "complete-example", title: "Complete Example" },
  { id: "error-handling", title: "Error Handling" },
  { id: "best-practices", title: "Best Practices" },
  { id: "risk-score-interpretation", title: "Risk Score Interpretation" },
  { id: "features", title: "Features" },
  { id: "browser-support", title: "Browser Support" },
];

export default function JavaScriptDocsPage() {
  return (
    <>
      <StructuredData
        title="JavaScript SDK Documentation"
        description="Complete Vanilla JavaScript SDK documentation for Keverd fraud detection. Learn how to integrate device fingerprinting and behavioral analytics into your web application."
        path="/docs/javascript"
        type="TechArticle"
      />
      <div className="flex w-full max-w-7xl mx-auto p-4">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8 py-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title mb-3">Vanilla JavaScript SDK</h1>
            <p className="text-gray-600 text-lg">
              Lightweight JavaScript SDK that works in any browser environment
            </p>
          </div>

          {/* Installation */}
          <section id="installation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Installation</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">npm (Recommended)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Install the SDK using npm, the Node.js package manager. This is the recommended installation method for most projects.
                </p>
                <CodeSnippet
                  code={String.raw`npm install @keverdjs/fraud-sdk`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">yarn</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Alternatively, install using Yarn if you prefer it over npm.
                </p>
                <CodeSnippet
                  code={String.raw`yarn add @keverdjs/fraud-sdk`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">CDN (Alternative)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  For projects that don't use a package manager, you can include the SDK via a CDN. Add this script tag to your HTML:
                </p>
                <CodeSnippet
                  code={String.raw`<script src="https://cdn.keverd.com/sdk/v1/keverd-sdk.min.js"></script>`}
                  language="html"
                />
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  <strong>Note:</strong> When using the CDN, the SDK is available globally as <code className="bg-white/50 px-1 rounded border border-gray-200">window.Keverd</code>. The CDN version is automatically minified and optimized for production use.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Quick Start</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">1. Import and Initialize</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Import the SDK and initialize it with your API key. The SDK follows a singleton pattern, so you only need to initialize it once in your application. Initialization is synchronous and non-blocking, but you should call it early in your application lifecycle (e.g., in your main entry point or app initialization code).
                </p>
                <CodeSnippet
                  code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

// Simple initialization with API key only
Keverd.init('your-api-key-here');

// Or with full configuration object
Keverd.init({
  apiKey: 'your-api-key-here',
  userId: 'user-123', // Optional: user identifier
  debug: true, // Optional: enable debug logging (default: false)
});`}
                  language="javascript"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Singleton Pattern:</strong> The SDK uses a singleton pattern. Subsequent calls to <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> with different configurations will be ignored after the first initialization. If you need to reinitialize with a new configuration, call <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code> first.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Behavioral Collection:</strong> When initialized, the SDK automatically starts passive behavioral data collection (mouse movements, keyboard events, touch gestures). This collection is non-blocking and does not impact page performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">2. Get Visitor Data</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Call <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">getVisitorData()</code> to collect device information, behavioral data, and receive a risk assessment from the Keverd API. This method is asynchronous and returns a Promise that resolves to a <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">FingerprintResponse</code> object.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Performance:</strong> Data collection typically completes in under 50ms. The total time (including network request) is typically under 200ms (p99 latency). The method uses the browser's native <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">fetch</code> API with a default timeout of 30 seconds.
                </p>
                <CodeSnippet
                  code={String.raw`// Get visitor data and risk assessment
try {
  const result = await Keverd.getVisitorData();
  
  console.log('Risk Score:', result.risk_score); // 0-100
  console.log('Normalized Score:', result.score); // 0.0-1.0
  console.log('Action:', result.action); // 'allow' | 'soft_challenge' | 'hard_challenge' | 'block'
  console.log('Session ID:', result.session_id); // UUID
  console.log('Request ID:', result.requestId); // UUID (same as session_id)
  console.log('Reasons:', result.reason); // Array of risk reasons
  
  // Handle risk score
  if (result.risk_score >= 70) {
    // High risk - block or require additional verification
    handleHighRisk(result);
  } else if (result.risk_score >= 30) {
    // Medium risk - require MFA
    requireMFA(result);
  } else {
    // Low risk - proceed normally
    proceedNormally(result);
  }
} catch (error) {
  // Handle errors (see Error Handling section)
  console.error('Error getting visitor data:', error);
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
              The SDK provides comprehensive session management capabilities, allowing you to start, pause, resume, and end sessions programmatically. Sessions are automatically started when the SDK is initialized and ended when it's destroyed, but you can also manage them manually for more control.
            </p>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Automatic Session Management</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  By default, the SDK automatically manages sessions for you:
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed mb-4">
                  <li><strong>Session starts automatically:</strong> When you call <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code>, a session is automatically started on the server.</li>
                  <li><strong>Session ends automatically:</strong> When you call <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code>, the current session is automatically ended.</li>
                  <li><strong>Events linked to sessions:</strong> All fingerprint events (from <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> and other methods) are automatically linked to the current session.</li>
                </ul>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Note:</strong> You don't need to manually manage sessions unless you want to pause/resume them or create custom session boundaries.
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Manual Session Management</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  For advanced use cases, you can manually control sessions:
                </p>
                <CodeSnippet
                  code={String.raw`// Start a new session (optional - called automatically on init)
await Keverd.startSession(
  'user-123', // Optional: user ID
  undefined, // Optional: device hash (auto-detected if not provided)
  { // Optional: custom metadata
    page: 'checkout',
    transactionId: 'txn-456'
  }
);

// Pause session (e.g., when app goes to background)
await Keverd.pauseSession();

// Resume session (e.g., when app comes to foreground)
await Keverd.resumeSession();

// Get current session status
const status = await Keverd.getSessionStatus();
if (status) {
  console.log('Session ID:', status.session_id);
  console.log('Status:', status.status); // 'active' | 'paused' | 'ended'
  console.log('Event Count:', status.event_count);
  console.log('Duration:', status.duration_seconds, 'seconds');
}

// End session manually (optional - called automatically on destroy)
await Keverd.endSession();`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Session Methods</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">startSession(userId?: string, deviceHash?: string, metadata?: Record&lt;string, unknown&gt;): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Start a new session. Called automatically on <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code>, but can be called manually to create a new session or restart an ended session.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">userId</code> (optional): User identifier for the session</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">deviceHash</code> (optional): Device hash (auto-detected if not provided)</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Custom metadata object to attach to the session</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">endSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">End the current session. Called automatically on <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code>, but can be called manually to end a session without destroying the SDK.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">pauseSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Pause the current session. Useful when the app goes to background or when you want to temporarily stop tracking. Events can still be collected, but the session is marked as paused.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">resumeSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Resume a paused session. Call this when the app comes to foreground or when you want to resume tracking after pausing.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">getSessionStatus(): Promise&lt;SessionStatus | null&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Get the current session status, including session ID, status, event count, duration, and timestamps.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;SessionStatus | null&gt;</code> - Session status object or <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> if no active session</p>
                      <p className="text-xs text-gray-600"><strong>SessionStatus:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">session_id</code> (string): Session identifier</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">status</code> (string): 'active' | 'paused' | 'ended'</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">is_active</code> (boolean): Whether session is active</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">is_paused</code> (boolean): Whether session is paused</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">event_count</code> (number): Number of events in this session</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">started_at</code> (string): ISO timestamp when session started</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">last_activity_at</code> (string): ISO timestamp of last activity</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">duration_seconds</code> (number | null): Session duration in seconds</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Use Cases</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-keverd-ink mb-2">Page Visibility (Background/Foreground)</h4>
                    <CodeSnippet
                      code={String.raw`// Pause when page goes to background
document.addEventListener('visibilitychange', async () => {
  if (document.hidden) {
    await Keverd.pauseSession();
  } else {
    await Keverd.resumeSession();
  }
});`}
                      language="javascript"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-keverd-ink mb-2">User Login/Logout</h4>
                    <CodeSnippet
                      code={String.raw`// Start new session on login
async function onUserLogin(userId) {
  await Keverd.startSession(userId, undefined, {
    loginMethod: 'email',
    timestamp: new Date().toISOString()
  });
}

// End session on logout
async function onUserLogout() {
  await Keverd.endSession();
}`}
                      language="javascript"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-keverd-ink mb-2">Check Session Status</h4>
                    <CodeSnippet
                      code={String.raw`// Check session status periodically
setInterval(async () => {
  const status = await Keverd.getSessionStatus();
  if (status) {
    console.log('Session ' + status.session_id + ' has ' + status.event_count + ' events');
    console.log('Duration: ' + status.duration_seconds + 's');
  }
}, 60000); // Every minute`}
                      language="javascript"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">API Reference</h2>
            
            <div className="space-y-10">
              <div id="keverd-class" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Keverd</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Main SDK class for fingerprint collection and risk assessment. The SDK is exported as a singleton instance, so you can use it directly without instantiating a new class.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">init(config: string | SDKConfig): void</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Initializes the SDK singleton instance. This method follows the singleton pattern, so subsequent calls with different configurations will be ignored after the first initialization. The SDK uses the browser's native APIs internally and starts passive behavioral data collection automatically.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">config</code>: Either a string (API key) or an <code className="bg-white/50 px-1 rounded border border-gray-200">SDKConfig</code> object. If a string is provided, the SDK will use default values for all other options.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">void</code></p>
                      <p className="text-xs text-gray-600"><strong>Thread Safety:</strong> Initialization is synchronous and safe to call from any thread. The SDK uses a singleton pattern with internal checks to prevent multiple initializations.</p>
                      <p className="text-xs text-gray-600"><strong>Throws:</strong> No exceptions are thrown. If initialization fails, errors will be logged to the console if <code className="bg-white/50 px-1 rounded border border-gray-200">debug</code> is enabled, but the SDK will still attempt to function with default values.</p>
                      <p className="text-xs text-gray-600"><strong>Behavioral Collection:</strong> When initialized, the SDK automatically starts passive behavioral data collection (mouse movements, keyboard events, touch gestures). This collection is non-blocking and does not impact page performance.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">getVisitorData(): Promise&lt;FingerprintResponse&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Collects device information, behavioral data, and session information, then sends it to the Keverd API to receive a risk assessment. This is the main method for fraud detection. The method is asynchronous and returns a Promise that resolves to a <code className="bg-white/50 px-1 rounded border border-gray-200">FingerprintResponse</code> object.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;FingerprintResponse&gt;</code> - A promise that resolves to a <code className="bg-white/50 px-1 rounded border border-gray-200">FingerprintResponse</code> object containing the risk score, action recommendation, and session information.</p>
                      <p className="text-xs text-gray-600"><strong>Asynchronous:</strong> This method is asynchronous and must be called with <code className="bg-white/50 px-1 rounded border border-gray-200">await</code> or using <code className="bg-white/50 px-1 rounded border border-gray-200">.then()</code>. The method uses the browser's native <code className="bg-white/50 px-1 rounded border border-gray-200">fetch</code> API for network requests.</p>
                      <p className="text-xs text-gray-600"><strong>Performance:</strong> Data collection typically completes in under 50ms. The total time (including network request) is typically under 200ms (p99 latency). Network timeouts are set to 30 seconds for connection, read, and write operations.</p>
                      <p className="text-xs text-gray-600"><strong>Error Handling:</strong> If an error occurs during data collection or API submission, the Promise will reject with an <code className="bg-white/50 px-1 rounded border border-gray-200">Error</code> object. You should wrap calls in a <code className="bg-white/50 px-1 rounded border border-gray-200">try-catch</code> block to handle errors gracefully. See the Error Handling section for more details.</p>
                      <p className="text-xs text-gray-600"><strong>Throws:</strong> Throws an <code className="bg-white/50 px-1 rounded border border-gray-200">Error</code> if the SDK is not initialized (call <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> first) or if the API request fails (network errors, invalid API key, server errors, etc.).</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">verifyLogin(userId?: string, metadata?: Record&lt;string, any&gt;): Promise&lt;FingerprintResponse&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Use-case-specific method for login verification. Collects enhanced behavioral signals optimized for login scenarios (typing patterns, form interactions, copy-paste detection) and sends them to the Keverd API with <code className="bg-white/50 px-1 rounded border border-gray-200">use_case: "login"</code>.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">userId</code> (optional): User identifier for profile matching</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Additional metadata to include in the request</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;FingerprintResponse&gt;</code> - Same response format as <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">verifyCheckout(amount?: number, currency?: string, metadata?: Record&lt;string, any&gt;): Promise&lt;FingerprintResponse&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Use-case-specific method for checkout/payment verification. Optimized for detecting fraud during payment flows with enhanced form interaction and behavioral analysis.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">amount</code> (optional): Transaction amount</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">currency</code> (optional): Currency code (e.g., "USD", "KES")</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Additional metadata</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;FingerprintResponse&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">verifyRegistration(metadata?: Record&lt;string, any&gt;): Promise&lt;FingerprintResponse&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Use-case-specific method for account registration verification with <strong>continuous behavioral monitoring</strong>. Detects bot signups, suspicious registration patterns, and mid-session behavior changes.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Additional metadata (e.g., email, username)</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;FingerprintResponse&gt;</code></p>
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-semibold text-blue-900 mb-2">✨ Enhanced Response Includes:</p>
                        <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
                          <li><code className="bg-white/50 px-1 rounded">behavior_change</code> - Baseline comparison and behavior change detection</li>
                          <li><code className="bg-white/50 px-1 rounded">adaptive_response</code> - Recommended actions (MFA, CAPTCHA, etc.)</li>
                          <li><code className="bg-white/50 px-1 rounded">recommended_action</code> - Suggested challenge level</li>
                        </ul>
                        <p className="text-xs text-blue-700 mt-2">
                          <Info className="inline mr-1" size={12} />
                          See <Link href="/docs/api#registration-behavioral-monitoring" className="underline">API Documentation</Link> for complete response format and adaptive response handling.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">verifyPasswordReset(metadata?: Record&lt;string, any&gt;): Promise&lt;FingerprintResponse&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Use-case-specific method for password reset verification. High-risk use case requiring enhanced security checks.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Additional metadata</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;FingerprintResponse&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">verifyAccountChange(metadata?: Record&lt;string, any&gt;): Promise&lt;FingerprintResponse&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Use-case-specific method for account modification verification (email change, phone change, etc.).</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Additional metadata</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;FingerprintResponse&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">createTransactionID(metadata?: TransactionMetadata): Promise&lt;string&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Legacy method for backward compatibility. This method internally calls <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> and returns the <code className="bg-white/50 px-1 rounded border border-gray-200">session_id</code> from the response. For new implementations, use <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> instead, as it provides more comprehensive information including the risk score.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">metadata</code> (optional): Transaction metadata object. Currently not used by the SDK, but included for backward compatibility with older API versions.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;string&gt;</code> - A promise that resolves to the session ID (UUID format).</p>
                      <p className="text-xs text-gray-600"><strong>Note:</strong> This method is deprecated. Use <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> instead to get both the session ID and risk assessment.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">destroy(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Destroys the SDK instance and stops all data collection. This method ends the current session, stops behavioral data collection, clears the internal configuration, and resets the initialization state. After calling this method, you must call <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> again before using the SDK.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code> - A promise that resolves when the SDK is destroyed and the session is ended.</p>
                      <p className="text-xs text-gray-600"><strong>Use Cases:</strong> Call this method when you want to stop all SDK activity, such as when a user logs out, when switching to a different API key, or when cleaning up resources. After destroying, you can reinitialize with a new configuration.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">startSession(userId?: string, deviceHash?: string, metadata?: Record&lt;string, unknown&gt;): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Start a new session. Called automatically on <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code>, but can be called manually to create a new session or restart an ended session. See the <a href="#session-management" className="text-keverd-blue hover:underline">Session Management</a> section for details.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> See <a href="#session-management" className="text-keverd-blue hover:underline">Session Management</a> section</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">endSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">End the current session. Called automatically on <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code>, but can be called manually to end a session without destroying the SDK. See the <a href="#session-management" className="text-keverd-blue hover:underline">Session Management</a> section for details.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">pauseSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Pause the current session. Useful when the app goes to background or when you want to temporarily stop tracking. See the <a href="#session-management" className="text-keverd-blue hover:underline">Session Management</a> section for details.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">resumeSession(): Promise&lt;void&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Resume a paused session. Call this when the app comes to foreground or when you want to resume tracking after pausing. See the <a href="#session-management" className="text-keverd-blue hover:underline">Session Management</a> section for details.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;void&gt;</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">getSessionStatus(): Promise&lt;SessionStatus | null&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Get the current session status, including session ID, status, event count, duration, and timestamps. See the <a href="#session-management" className="text-keverd-blue hover:underline">Session Management</a> section for details.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Promise&lt;SessionStatus | null&gt;</code> - Session status object or <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> if no active session</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="config" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">SDKConfig</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Configuration object for SDK initialization. All parameters are optional except <code className="bg-white/50 px-1 rounded border border-gray-200">apiKey</code>.</p>
                
                <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    The <code className="bg-white/50 px-1 rounded border border-gray-200">SDKConfig</code> object is used to configure the SDK during initialization. You can also pass a string (API key) directly to <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code>, which will use default values for all other options.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Parameter</th>
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
                          <td className="py-3 px-4 text-gray-700">API key for authenticating requests to the Keverd API. Obtain your API key from the <a href="/api-keys" className="text-keverd-blue hover:underline">API Keys page</a> in the dashboard. The API key is sent in the request header as <code className="bg-white/50 px-1 rounded border border-gray-200">x-keverd-key</code>. Keep your API key secure and never commit it to version control. Consider using environment variables or a secure configuration management system.</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm text-keverd-ink">userId</td>
                          <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                          <td className="py-3 px-4 text-gray-700">No</td>
                          <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">undefined</code></td>
                          <td className="py-3 px-4 text-gray-700">User identifier (string). This is not hashed and is sent as-is to the API. If not provided or empty, the backend will auto-generate an identifier from the device fingerprint. Use this to associate fingerprint requests with specific users in your system. This is useful for tracking user behavior across sessions and devices.</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm text-keverd-ink">debug</td>
                          <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">boolean</code></td>
                          <td className="py-3 px-4 text-gray-700">No</td>
                          <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">false</code></td>
                          <td className="py-3 px-4 text-gray-700">Enable debug logging. When <code className="bg-white/50 px-1 rounded border border-gray-200">true</code>, the SDK will log debug information to the browser console, including initialization status, API requests, and errors. Set to <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> during development and <code className="bg-white/50 px-1 rounded border border-gray-200">false</code> in production to avoid exposing sensitive information in the console.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div id="response-types" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">FingerprintResponse</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">The response object returned by <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code>. Contains the risk assessment, action recommendation, and session information.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">FingerprintResponse Structure</h4>
                    <CodeSnippet
                      code={String.raw`interface FingerprintResponse {
  risk_score: number;        // 0-100 risk score (integer)
  score: number;             // 0.0-1.0 normalized score (float)
  action: 'allow' | 'soft_challenge' | 'hard_challenge' | 'block';
  reason: string[];          // Array of risk reasons
  session_id: string;         // UUID session identifier
  requestId: string;         // UUID request identifier (same as session_id)
  sim_swap_engine?: {        // SIM swap detection (null for web SDKs)
    userId?: string;
    risk: number;
    flags: {
      sim_changed?: boolean;
      device_changed?: boolean;
      behavior_anomaly?: boolean;
      time_anomaly?: boolean;
      velocity_anomaly?: boolean;
    };
    updatedProfile?: Record<string, unknown>;
  };
}`}
                      language="typescript"
                      showCopy={false}
                    />
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>risk_score:</strong> Risk score as an integer from 0 (lowest risk) to 100 (highest risk). This is the primary score used for risk assessment. Use this score to make security decisions in your application.</p>
                      <p className="text-xs text-gray-600"><strong>score:</strong> Normalized risk score as a float between 0.0 (lowest risk) and 1.0 (highest risk). This is equal to <code className="bg-white/50 px-1 rounded border border-gray-200">risk_score / 100</code>. Use this for calculations that require a normalized value.</p>
                      <p className="text-xs text-gray-600"><strong>action:</strong> Recommended action based on the risk score. Possible values: <code className="bg-white/50 px-1 rounded border border-gray-200">'allow'</code> (low risk, proceed normally), <code className="bg-white/50 px-1 rounded border border-gray-200">'soft_challenge'</code> (medium risk, require additional verification like MFA), <code className="bg-white/50 px-1 rounded border border-gray-200">'hard_challenge'</code> (high risk, require strong verification), or <code className="bg-white/50 px-1 rounded border border-gray-200">'block'</code> (very high risk, deny access).</p>
                      <p className="text-xs text-gray-600"><strong>reason:</strong> Array of strings explaining why the risk score was assigned. Each string describes a specific risk factor (e.g., "Device fingerprint mismatch", "Unusual behavioral patterns", "High velocity transactions"). Use this to provide context to users or for debugging purposes.</p>
                      <p className="text-xs text-gray-600"><strong>session_id:</strong> Unique session identifier in UUID format. This identifier is generated client-side and is consistent across requests within the same browser session. Use this to track and correlate events, debug issues, or reference the request in support tickets.</p>
                      <p className="text-xs text-gray-600"><strong>requestId:</strong> Unique request identifier in UUID format. This is the same as <code className="bg-white/50 px-1 rounded border border-gray-200">session_id</code> and is included for backward compatibility. Use this to track individual API requests.</p>
                      <p className="text-xs text-gray-600"><strong>sim_swap_engine:</strong> SIM swap detection data. This field is always <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> or <code className="bg-white/50 px-1 rounded border border-gray-200">undefined</code> for web SDKs, as SIM card information is only available on mobile devices. This field is included for API consistency with mobile SDKs.</p>
                    <p className="text-xs text-gray-600 mt-2"><strong>behavior_change:</strong> (Registration only) Behavioral change analysis comparing current behavior to baseline. Includes <code className="bg-white/50 px-1 rounded border border-gray-200">baseline_available</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">behavior_changed</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">change_score</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">change_reasons</code>, and <code className="bg-white/50 px-1 rounded border border-gray-200">similarity_score</code>.</p>
                    <p className="text-xs text-gray-600"><strong>adaptive_response:</strong> (Registration only) Recommended adaptive actions based on risk and behavior. Includes <code className="bg-white/50 px-1 rounded border border-gray-200">recommended_action</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">challenges</code> array (e.g., ["captcha", "mfa"]), <code className="bg-white/50 px-1 rounded border border-gray-200">reason</code>, and <code className="bg-white/50 px-1 rounded border border-gray-200">confidence</code>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Collection */}
          <section id="data-collection" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Data Collection</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The SDK collects three types of data: device information, session information, and behavioral data. All sensitive identifiers are hashed client-side before transmission to ensure privacy and compliance with data protection regulations. No personally identifiable information (PII) is collected or transmitted in plain text.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Device Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the <code className="bg-white/50 px-1 rounded border border-gray-200">DeviceCollector</code> class. Includes:
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Device ID:</strong> First 32 characters of the device fingerprint hash</li>
                  <li><strong>Fingerprint:</strong> SHA-256 hash (64 hex characters) of device characteristics including user agent, screen dimensions, timezone, locale, and hardware information</li>
                  <li><strong>User Agent:</strong> Browser user agent string (used for fingerprinting, not sent directly)</li>
                  <li><strong>Screen Dimensions:</strong> Screen width and height in pixels</li>
                  <li><strong>Screen Density:</strong> Device pixel ratio (DPR)</li>
                  <li><strong>Timezone:</strong> IANA timezone identifier (e.g., "America/New_York", "Africa/Nairobi")</li>
                  <li><strong>Locale:</strong> Browser locale (e.g., "en-US", "sw-KE")</li>
                  <li><strong>Hardware Info:</strong> Device manufacturer, model, and brand (if available from user agent)</li>
                  <li><strong>OS Version:</strong> Operating system version (if available from user agent)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Privacy:</strong> The fingerprint is computed client-side and only the hash is transmitted. No raw device identifiers are sent. The fingerprint cannot be reverse-engineered to reveal the original device characteristics.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Session Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the SDK internally. Tracks session and installation data.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Session ID:</strong> Unique session identifier (UUID) generated for each browser session</li>
                  <li><strong>Timestamp:</strong> ISO 8601 formatted timestamp of the current session</li>
                  <li><strong>Install ID:</strong> Unique identifier for the first installation (stored in localStorage)</li>
                  <li><strong>Session Count:</strong> Number of sessions for this device (stored in localStorage)</li>
                  <li><strong>First Session:</strong> ISO 8601 formatted timestamp of the first session (when the SDK was first initialized)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Storage:</strong> Session data is persisted in <code className="bg-white/50 px-1 rounded border border-gray-200">localStorage</code> with the key prefix <code className="bg-white/50 px-1 rounded border border-gray-200">keverd_</code>. The data is cleared when the user clears their browser storage or when <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code> is called.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Behavioral Data</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the <code className="bg-white/50 px-1 rounded border border-gray-200">BehavioralCollector</code> class. Tracks user interaction patterns for behavioral biometrics. Collection starts automatically when the SDK is initialized and stops when <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code> is called.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Typing Dwell Time:</strong> Array of milliseconds representing how long keys are held down (typically 5-20 samples)</li>
                  <li><strong>Typing Flight Time:</strong> Array of milliseconds representing time between key releases (typically 5-20 samples)</li>
                  <li><strong>Swipe Velocity:</strong> Average swipe velocity in pixels per millisecond (0.0 if no swipe data available)</li>
                  <li><strong>Session Entropy:</strong> Shannon entropy value based on event diversity. Higher values indicate more diverse user interactions (0.0 if no events collected)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Collection:</strong> Behavioral data is collected passively as users interact with your website. The collector tracks mouse movements, keyboard input, touch gestures, and scroll events. Data collection is non-blocking and does not impact page performance. The collector uses event listeners that are automatically cleaned up when the SDK is destroyed.</p>
                <p className="text-xs text-gray-600"><strong>Privacy:</strong> Behavioral data is aggregated and anonymized. Individual keystrokes or mouse movements are not transmitted; only statistical summaries (dwell times, flight times, velocities) are sent to the API.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Hashing and Privacy</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  All sensitive identifiers are hashed using SHA-256 before transmission. The SDK handles all hashing operations internally.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Device Fingerprint:</strong> Computed from a combination of device characteristics and hashed to 64 hex characters</li>
                  <li><strong>No Raw PII:</strong> No personally identifiable information is transmitted in plain text</li>
                  <li><strong>Client-Side Hashing:</strong> All hashing is performed in the browser before any data is sent to the API</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Compliance:</strong> This approach ensures compliance with GDPR, CCPA, and other data protection regulations. The hashed identifiers cannot be reverse-engineered to reveal the original values. The SDK does not collect or transmit any personally identifiable information (PII) such as names, email addresses, phone numbers, or IP addresses.</p>
              </div>
            </div>
          </section>

          {/* Complete Example */}
          <section id="complete-example" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Complete Example</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Here's a complete example showing how to integrate the SDK into a web application. This example demonstrates initialization, visitor data collection, risk assessment, and error handling.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <CodeSnippet
                code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

// Initialize SDK (call this once when your app loads)
Keverd.init({
  apiKey: process.env.REACT_APP_KEVERD_API_KEY, // Use environment variables
  debug: process.env.NODE_ENV === 'development' // Enable debug in dev only
});

// Get visitor data and assess risk
async function checkRisk() {
  try {
    const result = await Keverd.getVisitorData();
    
    // Handle risk score based on thresholds
    if (result.risk_score >= 70) {
      // High risk - block or require additional verification
      console.log('High risk detected:', result.reason);
      showSecurityAlert(result);
      requireAdditionalVerification(result);
    } else if (result.risk_score >= 30) {
      // Medium risk - require MFA
      console.log('Medium risk:', result.reason);
      requireMFA(result);
    } else {
      // Low risk - proceed normally
      console.log('Low risk, proceeding');
      proceedWithTransaction(result);
    }
    
    // Log the session ID for tracking
    console.log('Session ID:', result.session_id);
  } catch (error) {
    // Handle errors gracefully
    console.error('Error getting visitor data:', error);
    
    // Fallback behavior - decide based on your use case
    // Option 1: Fail open (allow access)
    proceedWithTransaction(null);
    
    // Option 2: Fail closed (block access)
    // showSecurityAlert(null);
  }
}

// Call on page load or user action
document.addEventListener('DOMContentLoaded', () => {
  checkRisk();
});`}
                language="javascript"
              />
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Error Handling</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The SDK handles errors gracefully and throws <code className="bg-white/50 px-1 rounded border border-gray-200">Error</code> objects that you can catch and handle. Here's how to handle different error scenarios:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Network Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Network errors occur when the device cannot connect to the API or when the request times out. The SDK uses 30-second timeouts for connection, read, and write operations.
                </p>
                <CodeSnippet
                  code={String.raw`try {
  const result = await Keverd.getVisitorData();
} catch (error) {
  if (error.message.includes('timeout') || error.message.includes('Timeout')) {
    // Handle timeout - retry with exponential backoff
    console.warn('Request timed out, retrying...');
    setTimeout(() => checkRisk(), 1000); // Retry after 1 second
  } else if (error.message.includes('network') || error.message.includes('Network')) {
    // Handle network connectivity issues
    console.error('Network error:', error.message);
    showNetworkError();
  } else {
    // Handle other network errors
    console.error('Network error:', error);
  }
}`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">API Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  API errors occur when the server returns an error status code (4xx or 5xx). Common causes include invalid API keys, rate limiting, or server errors.
                </p>
                <CodeSnippet
                  code={String.raw`try {
  const result = await Keverd.getVisitorData();
} catch (error) {
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
}`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Initialization Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Initialization errors occur when you try to use the SDK before calling <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> or when the SDK is not properly initialized.
                </p>
                <CodeSnippet
                  code={String.raw`try {
  const result = await Keverd.getVisitorData();
} catch (error) {
  if (error.message.includes('not initialized') || error.message.includes('init')) {
    // SDK not initialized
    console.error('SDK not initialized. Call Keverd.init() first.');
    Keverd.init({
      apiKey: 'your-api-key-here'
    });
    // Retry after initialization
    setTimeout(() => checkRisk(), 100);
  } else {
    // Other errors
    console.error('Error:', error);
  }
}`}
                  language="javascript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Best Practices for Error Handling</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Always use try-catch:</strong> Wrap all calls to <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> in try-catch blocks to handle errors gracefully.</li>
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
              Follow these best practices to ensure optimal performance, security, and user experience when integrating the Keverd SDK:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Initialization</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Initialize early:</strong> Call <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> as early as possible in your application lifecycle, ideally in your main entry point or app initialization code.</li>
                  <li><strong>Initialize once:</strong> The SDK uses a singleton pattern, so you only need to initialize it once. Subsequent calls to <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> will be ignored.</li>
                  <li><strong>Use environment variables:</strong> Store your API key in environment variables and never commit it to version control. Use different API keys for development, staging, and production environments.</li>
                  <li><strong>Enable debug in development only:</strong> Set <code className="bg-white/50 px-1 rounded border border-gray-200">debug: true</code> only in development environments. Disable it in production to avoid exposing sensitive information in the console.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">API Calls</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Call at appropriate times:</strong> Call <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> at key points in your user flow, such as login, registration, checkout, or sensitive operations.</li>
                  <li><strong>Avoid excessive calls:</strong> Don't call <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> on every page load or user interaction. Use it strategically for high-value or high-risk operations.</li>
                  <li><strong>Handle asynchronously:</strong> Always use <code className="bg-white/50 px-1 rounded border border-gray-200">await</code> or <code className="bg-white/50 px-1 rounded border border-gray-200">.then()</code> when calling <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code>, as it returns a Promise.</li>
                  <li><strong>Implement retry logic:</strong> For transient errors, implement retry logic with exponential backoff to improve reliability.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Use-Case-Specific Methods</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use appropriate methods:</strong> Use <code className="bg-white/50 px-1 rounded border border-gray-200">verifyLogin()</code> for login flows, <code className="bg-white/50 px-1 rounded border border-gray-200">verifyCheckout()</code> for payment flows, etc. This provides better context for risk scoring.</li>
                  <li><strong>Login verification:</strong> Call <code className="bg-white/50 px-1 rounded border border-gray-200">verifyLogin()</code> before authenticating the user. Block or challenge high-risk attempts (risk_score ≥ 70).</li>
                  <li><strong>Checkout verification:</strong> Call <code className="bg-white/50 px-1 rounded border border-gray-200">verifyCheckout()</code> before processing payment. Require additional verification for medium-risk checkouts (risk_score 30-69).</li>
                  <li><strong>Registration verification:</strong> Use <code className="bg-white/50 px-1 rounded border border-gray-200">verifyRegistration()</code> to detect bot signups. Block high-risk registrations automatically.</li>
                  <li><strong>Password reset:</strong> Always use <code className="bg-white/50 px-1 rounded border border-gray-200">verifyPasswordReset()</code> for password reset flows. This is a high-risk operation that requires extra scrutiny.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Risk Score Interpretation</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>0-29 (Low Risk):</strong> Allow the operation. User behavior matches their profile and shows no suspicious patterns.</li>
                  <li><strong>30-69 (Medium Risk):</strong> Require additional verification (MFA, CAPTCHA, email confirmation). User behavior is unusual but not clearly fraudulent.</li>
                  <li><strong>70-100 (High Risk):</strong> Block the operation or require manual review. Strong indicators of fraud or account takeover.</li>
                  <li><strong>Context matters:</strong> A risk score of 50 for login is more concerning than 50 for registration. Adjust thresholds based on use case.</li>
                  <li><strong>Combine with other signals:</strong> Use risk scores alongside other security measures (rate limiting, IP reputation, etc.) for defense in depth.</li>
                  <li><strong>Monitor trends:</strong> Track risk score trends over time. Sudden increases may indicate a new attack vector.</li>
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
                  <li><strong>Data retention:</strong> The SDK stores minimal data in localStorage. Consider clearing this data when users log out or request data deletion.</li>
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
                  <h3 className="font-semibold text-keverd-ink mb-1">Universal Compatibility</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Works in any JavaScript environment (browser, Node.js)</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Lightweight</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Small bundle size, fast initialization</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Privacy-First</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">No PII collected, all data hashed client-side</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Easy Integration</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Simple API, minimal configuration required</p>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Support */}
          <section id="browser-support" className="mb-10 pb-10">
            <h2 className="section-title mb-8">Browser Support</h2>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Chrome (latest)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Firefox (latest)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Safari (latest)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Edge (latest)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Mobile browsers (iOS Safari, Chrome Mobile)</span>
                </li>
              </ul>
            </div>
          </section>
          
          <SDKNavigation currentSDK="javascript" />
        </main>
      </div>
    </>
  );
}
