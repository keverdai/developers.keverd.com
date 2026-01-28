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
  { id: "keverd-module", title: "KeverdModule.forRoot", level: 2 },
  { id: "keverd-service", title: "KeverdService", level: 2 },
  { id: "keverd-visitor-data", title: "KeverdVisitorData", level: 2 },
  { id: "data-collection", title: "Data Collection", level: 2 },
  { id: "complete-example", title: "Complete Example" },
  { id: "rxjs-usage", title: "RxJS Observable Usage" },
  { id: "error-handling", title: "Error Handling" },
  { id: "best-practices", title: "Best Practices" },
  { id: "risk-score-interpretation", title: "Risk Score Interpretation" },
  { id: "features", title: "Features" },
  { id: "requirements", title: "Requirements" },
];

export default function AngularDocsPage() {
  return (
    <>
      <StructuredData
        title="Angular SDK Documentation"
        description="Complete Angular SDK documentation for Keverd fraud detection. Learn how to integrate device fingerprinting and behavioral analytics into your Angular application using services and RxJS observables."
        path="/docs/angular"
        type="TechArticle"
      />
      <div className="flex w-full max-w-7xl mx-auto p-4">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8 py-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title mb-3">Angular SDK</h1>
            <p className="text-gray-600 text-lg">
              Angular service and module for seamless integration in Angular applications
            </p>
          </div>

          {/* Installation */}
          <section id="installation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Installation</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">npm (Recommended)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Install the Angular SDK using npm, the Node.js package manager. This is the recommended installation method for most Angular projects.
                </p>
                <CodeSnippet
                  code={String.raw`npm install @keverdjs/fraud-sdk-angular`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">yarn</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Alternatively, install using Yarn if you prefer it over npm.
                </p>
                <CodeSnippet
                  code={String.raw`yarn add @keverdjs/fraud-sdk-angular`}
                  language="bash"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Peer Dependencies</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The Angular SDK requires Angular 15.0 or higher and RxJS 7.0 or higher. These should already be installed in your Angular project, but if not, install them:
                </p>
                <CodeSnippet
                  code={String.raw`npm install @angular/core@^15.0.0 rxjs@^7.0.0
# or
yarn add @angular/core@^15.0.0 rxjs@^7.0.0`}
                  language="bash"
                />
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  <strong>Note:</strong> The SDK uses Angular's dependency injection system and RxJS Observables for reactive data access. The SDK is provided as a singleton service using Angular's <code className="bg-white/50 px-1 rounded border border-gray-200">providedIn: 'root'</code> pattern, making it available throughout your application.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Quick Start</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">1. Import Module</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Import the <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">KeverdModule</code> in your root module (<code className="bg-white/50 px-1 rounded text-sm border border-gray-200">app.module.ts</code>) and configure it using the <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">forRoot()</code> method. This method follows Angular's module configuration pattern and provides the SDK configuration to the dependency injection system.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>For Angular Standalone Components:</strong> If you're using Angular standalone components (Angular 14+), you can import the <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">KeverdService</code> directly and call <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">init()</code> manually, or use Angular's <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">APP_INITIALIZER</code> to initialize the SDK at application startup.
                </p>
                <CodeSnippet
                  code={String.raw`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeverdModule } from '@keverdjs/fraud-sdk-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    KeverdModule.forRoot({
      apiKey: environment.keverdApiKey, // Use environment variables
      debug: !environment.production, // Enable debug in dev only
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`}
                  language="typescript"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Dependency Injection:</strong> The <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdModule.forRoot()</code> method configures the SDK and provides it to Angular's dependency injection system. The <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdService</code> is provided as a singleton service using <code className="bg-white/50 px-1 rounded border border-gray-200">providedIn: 'root'</code>, making it available throughout your application.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Initialization:</strong> The SDK is initialized automatically when the module is loaded. The initialization is synchronous and non-blocking, but you should wait for the SDK to be ready before making API calls (use <code className="bg-white/50 px-1 rounded border border-gray-200">isReady()</code> to check).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">2. Use Service in Components</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Inject the <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">KeverdService</code> into your components using Angular's dependency injection. The service provides an RxJS Observable-based API for accessing visitor data and risk assessment. All methods return Observables, allowing you to use RxJS operators for reactive data handling.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Performance:</strong> Data collection typically completes in under 50ms. The total time (including network request) is typically under 200ms (p99 latency). The service uses RxJS Observables for efficient reactive data handling.
                </p>
                <CodeSnippet
                  code={String.raw`import { Component, OnInit } from '@angular/core';
import { KeverdService } from '@keverdjs/fraud-sdk-angular';
import type { KeverdVisitorData } from '@keverdjs/fraud-sdk-angular';

@Component({
  selector: 'app-root',
  template: \`
    <div *ngIf="loading">Loading risk assessment...</div>
    <div *ngIf="error">
      <p>Error: {{ error.message }}</p>
      <button (click)="checkRisk()">Retry</button>
    </div>
    <div *ngIf="data && !loading">
      <p>Risk Score: {{ data.riskScore }}/100</p>
      <p>Action: {{ data.action }}</p>
      <p>Reasons: {{ data.reasons.join(', ') }}</p>
      <button (click)="checkRisk()">Reload data</button>
    </div>
  \`
})
export class AppComponent implements OnInit {
  data: KeverdVisitorData | null = null;
  loading = false;
  error: any = null;

  constructor(private keverd: KeverdService) {}

  ngOnInit() {
    this.checkRisk();
  }

  checkRisk() {
    this.loading = true;
    this.error = null;
    
    this.keverd.getVisitorData({
      extendedResult: true
    }).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}`}
                  language="typescript"
                />
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">API Reference</h2>
            
            <div className="space-y-10">
              <div id="keverd-module" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">KeverdModule</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Angular module that provides the Keverd SDK service to your application. The module follows Angular's module configuration pattern and uses the <code className="bg-white/50 px-1 rounded border border-gray-200">forRoot()</code> method to configure the SDK with your API key and settings.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">KeverdModule.forRoot(config: KeverdConfig): ModuleWithProviders&lt;KeverdModule&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Static method that configures the module with SDK settings. This method should be called in your root module's <code className="bg-white/50 px-1 rounded border border-gray-200">imports</code> array. The method returns a <code className="bg-white/50 px-1 rounded border border-gray-200">ModuleWithProviders</code> object that includes the module and its providers.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">config</code> (KeverdConfig): Configuration object for SDK initialization. See <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdConfig</code> below for details.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">ModuleWithProviders&lt;KeverdModule&gt;</code> - Module configuration object that includes the module and its providers.</p>
                      <p className="text-xs text-gray-600"><strong>Dependency Injection:</strong> The method provides the <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdService</code> and configuration to Angular's dependency injection system. The service is provided as a singleton using <code className="bg-white/50 px-1 rounded border border-gray-200">providedIn: 'root'</code>.</p>
                      <p className="text-xs text-gray-600"><strong>Initialization:</strong> The SDK is initialized automatically when the service is first injected. The initialization is synchronous and non-blocking.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">KeverdConfig</h4>
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
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 font-mono text-sm text-keverd-ink">userId</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                            <td className="py-3 px-4 text-gray-700">No</td>
                            <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">undefined</code></td>
                            <td className="py-3 px-4 text-gray-700">User identifier (string). This is not hashed and is sent as-is to the API. If not provided or empty, the backend will auto-generate an identifier from the device fingerprint. Use this to associate fingerprint requests with specific users in your system.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Usage Example</h4>
                    <CodeSnippet
                      code={String.raw`KeverdModule.forRoot({
  apiKey: environment.keverdApiKey,
  debug: !environment.production
})`}
                      language="typescript"
                      showCopy={false}
                    />
                  </div>
                </div>
              </div>

              <div id="keverd-service" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">KeverdService</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Angular injectable service for accessing visitor data and risk assessment. The service is provided as a singleton using <code className="bg-white/50 px-1 rounded border border-gray-200">providedIn: 'root'</code>, making it available throughout your application. All methods return RxJS Observables for reactive data handling.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">init(config: KeverdConfig): void</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Initialize the SDK with configuration. This method is optional if you're using <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdModule.forRoot()</code>, as the SDK will be initialized automatically via dependency injection. Use this method if you need to initialize the SDK manually or change the configuration at runtime.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">config</code> (KeverdConfig): Configuration object for SDK initialization. The <code className="bg-white/50 px-1 rounded border border-gray-200">apiKey</code> is required.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">void</code></p>
                      <p className="text-xs text-gray-600"><strong>Throws:</strong> Throws an <code className="bg-white/50 px-1 rounded border border-gray-200">Error</code> if <code className="bg-white/50 px-1 rounded border border-gray-200">apiKey</code> is not provided or if the SDK is already initialized (subsequent calls are ignored).</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">getVisitorData(options?: KeverdVisitorDataOptions): Observable&lt;KeverdVisitorData&gt;</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Get visitor data and risk assessment. This is the main method for fraud detection. The method collects device information, behavioral data, and session information, then sends it to the Keverd API to receive a risk assessment. The method returns an RxJS Observable that emits the visitor data when the request completes.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">options</code> (optional): Configuration options for the request</li>
                        <li className="ml-4">- <code className="bg-white/50 px-1 rounded border border-gray-200">extendedResult</code> (boolean, optional): Include extended result data in the response. Default: <code className="bg-white/50 px-1 rounded border border-gray-200">false</code></li>
                        <li className="ml-4">- <code className="bg-white/50 px-1 rounded border border-gray-200">ignoreCache</code> (boolean, optional): Ignore cached results and force a fresh API call. Default: <code className="bg-white/50 px-1 rounded border border-gray-200">false</code></li>
                        <li className="ml-4">- <code className="bg-white/50 px-1 rounded border border-gray-200">tag</code> (string, optional): Tag for request tracking (e.g., 'sandbox' for sandbox requests)</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">Observable&lt;KeverdVisitorData&gt;</code> - An RxJS Observable that emits a single <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdVisitorData</code> object when the request completes successfully.</p>
                      <p className="text-xs text-gray-600"><strong>RxJS Observable:</strong> The method returns an Observable, allowing you to use RxJS operators (e.g., <code className="bg-white/50 px-1 rounded border border-gray-200">map</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">catchError</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">retry</code>) for reactive data handling and error management.</p>
                      <p className="text-xs text-gray-600"><strong>Performance:</strong> Data collection typically completes in under 50ms. The total time (including network request) is typically under 200ms (p99 latency). Network timeouts are set to 30 seconds for connection, read, and write operations.</p>
                      <p className="text-xs text-gray-600"><strong>Error Handling:</strong> If an error occurs during data collection or API submission, the Observable will emit an error. You should handle errors using the <code className="bg-white/50 px-1 rounded border border-gray-200">error</code> callback in <code className="bg-white/50 px-1 rounded border border-gray-200">subscribe()</code> or using RxJS operators like <code className="bg-white/50 px-1 rounded border border-gray-200">catchError</code>.</p>
                      <p className="text-xs text-gray-600"><strong>Throws:</strong> The Observable will error if the SDK is not initialized (call <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> first or use <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdModule.forRoot()</code>) or if the API request fails (network errors, invalid API key, server errors, etc.).</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">isReady(): boolean</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Check if the SDK is initialized and ready to use. This method returns <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> if the SDK has been initialized and is ready to make API calls, and <code className="bg-white/50 px-1 rounded border border-gray-200">false</code> otherwise.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">boolean</code> - <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> if the SDK is initialized and ready, <code className="bg-white/50 px-1 rounded border border-gray-200">false</code> otherwise.</p>
                      <p className="text-xs text-gray-600"><strong>Use Cases:</strong> Use this method to check if the SDK is ready before calling <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code>. This is especially useful if you're initializing the SDK manually or if you need to wait for initialization to complete.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">destroy(): void</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Destroy the SDK instance and stop all data collection. This method stops behavioral data collection, clears the internal configuration, and resets the initialization state. After calling this method, you must call <code className="bg-white/50 px-1 rounded border border-gray-200">init()</code> again before using the SDK.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">void</code></p>
                      <p className="text-xs text-gray-600"><strong>Use Cases:</strong> Call this method when you want to stop all SDK activity, such as when a user logs out, when switching to a different API key, or when cleaning up resources. After destroying, you can reinitialize with a new configuration.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">getConfig(): KeverdConfig | null</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Get the current SDK configuration. This method returns the configuration object that was used to initialize the SDK, or <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> if the SDK is not initialized.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong> None</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdConfig | null</code> - The current configuration object, or <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> if the SDK is not initialized.</p>
                      <p className="text-xs text-gray-600"><strong>Note:</strong> The returned configuration object is a copy of the internal configuration. Modifying it will not affect the SDK's behavior.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="keverd-visitor-data" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">KeverdVisitorData</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">The visitor data object returned by the SDK. This object contains the risk assessment, action recommendation, and session information. When returned from <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code>, this object is emitted by the RxJS Observable.</p>
                
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
              The Angular SDK collects the same types of data as the Vanilla JavaScript SDK: device information, session information, and behavioral data. All sensitive identifiers are hashed client-side before transmission to ensure privacy and compliance with data protection regulations. No personally identifiable information (PII) is collected or transmitted in plain text.
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
                  Collected passively as users interact with your application. The collector tracks mouse movements, keyboard input, touch gestures, and scroll events. Data collection starts automatically when the SDK is initialized and stops when <code className="bg-white/50 px-1 rounded border border-gray-200">destroy()</code> is called.
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
              Here's a complete example showing how to integrate the Angular SDK into an Angular application. This example demonstrates module setup, service injection, risk assessment, and error handling.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <CodeSnippet
                code={String.raw`// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeverdModule } from '@keverdjs/fraud-sdk-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    KeverdModule.forRoot({
      apiKey: 'your-api-key-here',
      debug: false,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { KeverdService } from '@keverdjs/fraud-sdk-angular';
import type { KeverdVisitorData } from '@keverdjs/fraud-sdk-angular';

@Component({
  selector: 'app-root',
  template: \`
    <div>
      <h1>Risk Assessment</h1>
      
      <div *ngIf="loading">Loading risk assessment...</div>
      
      <div *ngIf="error">
        <p>Error: {{ error.message }}</p>
        <button (click)="checkRisk()">Retry</button>
      </div>
      
      <div *ngIf="data && !loading">
        <p>Risk Score: {{ data.riskScore }}/100</p>
        <p>Action: {{ data.action }}</p>
        <p>Reasons: {{ data.reasons.join(', ') }}</p>
        <p>Risk Level: {{ getRiskLevel() }}</p>
        <button (click)="checkRisk()">Refresh</button>
      </div>
      
      <div *ngIf="!data && !loading">
        <button (click)="checkRisk()">Check Risk</button>
      </div>
    </div>
  \`
})
export class AppComponent implements OnInit {
  data: KeverdVisitorData | null = null;
  loading = false;
  error: any = null;

  constructor(private keverd: KeverdService) {}

  ngOnInit() {
    this.checkRisk();
  }

  checkRisk() {
    this.loading = true;
    this.error = null;
    
    this.keverd.getVisitorData({
      extendedResult: true,
    }).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  getRiskLevel(): string {
    if (!this.data) return 'unknown';
    if (this.data.riskScore >= 70) return 'high';
    if (this.data.riskScore >= 30) return 'medium';
    return 'low';
  }
}`}
                language="typescript"
              />
            </div>
          </section>

          {/* RxJS Usage */}
          <section id="rxjs-usage" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">RxJS Observable Usage</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Angular SDK uses RxJS Observables for reactive data access. You can use all RxJS operators to transform, filter, retry, and handle errors in your data streams. This makes it easy to integrate with Angular's reactive patterns and other RxJS-based libraries.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Angular SDK uses RxJS Observables for reactive data access. You can use all RxJS operators:
              </p>
              <CodeSnippet
                code={String.raw`import { map, catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';

this.keverd.getVisitorData()
  .pipe(
    map(data => {
      // Transform data
      return {
        ...data,
        riskLevel: data.riskScore >= 70 ? 'high' : 'low'
      };
    }),
    retry(3), // Retry up to 3 times on error
    catchError(error => {
      console.error('Keverd error:', error);
      return of(null); // Return null on error
    })
  )
  .subscribe({
    next: (data) => {
      if (data) {
        this.data = data;
      }
    }
  });`}
                language="typescript"
              />
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Error Handling</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Angular SDK handles errors gracefully and provides them through RxJS Observable error emissions. Here's how to handle different error scenarios using RxJS operators:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Network Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Network errors occur when the device cannot connect to the API or when the request times out. The SDK uses 30-second timeouts for connection, read, and write operations.
                </p>
                <CodeSnippet
                  code={String.raw`import { catchError, retry, throwError } from 'rxjs';
import { of } from 'rxjs';

this.keverd.getVisitorData()
  .pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        if (error.message.includes('timeout') || error.message.includes('Timeout')) {
          // Retry with exponential backoff
          return timer(retryCount * 1000);
        }
        return throwError(() => error);
      }
    }),
    catchError((error) => {
      if (error.message.includes('network') || error.message.includes('Network')) {
        console.error('Network error:', error.message);
        showNetworkError();
      }
      return throwError(() => error);
    })
  )
  .subscribe({
    next: (data) => this.data = data,
    error: (err) => this.error = err
  });`}
                  language="typescript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">API Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  API errors occur when the server returns an error status code (4xx or 5xx). Common causes include invalid API keys, rate limiting, or server errors.
                </p>
                <CodeSnippet
                  code={String.raw`import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

this.keverd.getVisitorData()
  .pipe(
    catchError((error) => {
      if (error.code === 'HTTP_401' || error.message.includes('Unauthorized')) {
        // Invalid API key
        console.error('Invalid API key. Please check your configuration.');
        showConfigurationError();
      } else if (error.code === 'HTTP_429' || error.message.includes('rate limit')) {
        // Rate limit exceeded
        console.warn('Rate limit exceeded. Please retry after some time.');
        showRateLimitError();
      } else if (error.code?.startsWith('HTTP_5')) {
        // Server errors - retry with backoff
        console.error('Server error:', error.message);
        return this.keverd.getVisitorData().pipe(
          retry({ count: 3, delay: 1000 })
        );
      }
      return throwError(() => error);
    })
  )
  .subscribe({
    next: (data) => this.data = data,
    error: (err) => this.error = err
  });`}
                  language="typescript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">SDK Not Initialized Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  These errors occur when you try to use the SDK before it's initialized or when the module hasn't been configured.
                </p>
                <CodeSnippet
                  code={String.raw`this.keverd.getVisitorData()
  .pipe(
    catchError((error) => {
      if (error.code === 'SDK_NOT_INITIALIZED') {
        // SDK not initialized - initialize and retry
        console.warn('SDK not initialized, initializing...');
        this.keverd.init({
          apiKey: environment.keverdApiKey
        });
        // Retry after initialization
        return this.keverd.getVisitorData();
      }
      return throwError(() => error);
    })
  )
  .subscribe({
    next: (data) => this.data = data,
    error: (err) => this.error = err
  });`}
                  language="typescript"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Best Practices for Error Handling</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use RxJS operators:</strong> Use RxJS operators like <code className="bg-white/50 px-1 rounded border border-gray-200">catchError</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">retry</code>, and <code className="bg-white/50 px-1 rounded border border-gray-200">retryWhen</code> to handle errors reactively.</li>
                  <li><strong>Implement retry logic:</strong> For transient errors (network timeouts, server errors), implement retry logic with exponential backoff using <code className="bg-white/50 px-1 rounded border border-gray-200">retry</code> or <code className="bg-white/50 px-1 rounded border border-gray-200">retryWhen</code> operators.</li>
                  <li><strong>Fail gracefully:</strong> Decide on a fail-open or fail-closed strategy. Fail-open allows access when the SDK fails, while fail-closed blocks access. Choose based on your security requirements.</li>
                  <li><strong>Log errors:</strong> Log errors to your error tracking service (e.g., Sentry, LogRocket) for debugging and monitoring.</li>
                  <li><strong>User feedback:</strong> Provide clear feedback to users when errors occur, especially for authentication or security-related failures.</li>
                  <li><strong>Unsubscribe properly:</strong> Always unsubscribe from Observables to prevent memory leaks. Use Angular's <code className="bg-white/50 px-1 rounded border border-gray-200">takeUntil</code> pattern or the <code className="bg-white/50 px-1 rounded border border-gray-200">async</code> pipe in templates.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Best Practices</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Follow these best practices to ensure optimal performance, security, and user experience when integrating the Angular SDK:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Module Setup</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Use forRoot in root module:</strong> Call <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdModule.forRoot()</code> in your root module (<code className="bg-white/50 px-1 rounded border border-gray-200">app.module.ts</code>) to configure the SDK once for your entire application.</li>
                  <li><strong>Use environment variables:</strong> Store your API key in environment variables and never commit it to version control. Use different API keys for development, staging, and production environments.</li>
                  <li><strong>Enable debug in development only:</strong> Set <code className="bg-white/50 px-1 rounded border border-gray-200">debug: true</code> only in development environments. Disable it in production to avoid exposing sensitive information in the console.</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-3">Service Usage</h3>
                <ul className="text-sm text-gray-700 ml-4 space-y-2 list-disc leading-relaxed">
                  <li><strong>Inject service in components:</strong> Inject the <code className="bg-white/50 px-1 rounded border border-gray-200">KeverdService</code> into your components using Angular's dependency injection. The service is provided as a singleton, so all components share the same instance.</li>
                  <li><strong>Use RxJS operators:</strong> Take advantage of RxJS operators to transform, filter, retry, and handle errors in your data streams. Use <code className="bg-white/50 px-1 rounded border border-gray-200">map</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">catchError</code>, <code className="bg-white/50 px-1 rounded border border-gray-200">retry</code>, and other operators as needed.</li>
                  <li><strong>Avoid excessive calls:</strong> Don't call <code className="bg-white/50 px-1 rounded border border-gray-200">getVisitorData()</code> on every component lifecycle hook or user interaction. Use it strategically for high-value or high-risk operations.</li>
                  <li><strong>Unsubscribe properly:</strong> Always unsubscribe from Observables to prevent memory leaks. Use Angular's <code className="bg-white/50 px-1 rounded border border-gray-200">async</code> pipe in templates, or use the <code className="bg-white/50 px-1 rounded border border-gray-200">takeUntil</code> pattern with <code className="bg-white/50 px-1 rounded border border-gray-200">OnDestroy</code> in components.</li>
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
                  <li><strong>RxJS efficiency:</strong> Use RxJS operators efficiently. Avoid creating unnecessary subscriptions and use operators like <code className="bg-white/50 px-1 rounded border border-gray-200">shareReplay</code> to share Observable streams across multiple subscribers.</li>
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
                  <h3 className="font-semibold text-keverd-ink mb-1">Angular Service</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Injectable service following Angular patterns</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">RxJS Observables</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Reactive data access with RxJS</p>
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
                  <h3 className="font-semibold text-keverd-ink mb-1">Module System</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Easy setup with forRoot pattern</p>
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
                  <span className="text-gray-700">Angular 15.0 or higher</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">RxJS 7.0 or higher</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700">Modern browser with ES2020 support</span>
                </li>
              </ul>
            </div>
          </section>
          
          <SDKNavigation currentSDK="angular" />
        </main>
      </div>
    </>
  );
}
