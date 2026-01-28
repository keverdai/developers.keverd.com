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
  { id: "keverd-fingerprint", title: "KeverdFingerprint", level: 2 },
  { id: "config", title: "Config", level: 2 },
  { id: "result-types", title: "Result Types", level: 2 },
  { id: "data-collection", title: "Data Collection", level: 2 },
  { id: "complete-example", title: "Complete Example" },
  { id: "error-handling", title: "Error Handling" },
  { id: "best-practices", title: "Best Practices" },
  { id: "features", title: "Features" },
  { id: "requirements", title: "Requirements" },
];

export default function AndroidDocsPage() {
  return (
    <>
      <StructuredData
        title="Android SDK Documentation"
        description="Complete Android SDK documentation for Keverd fraud detection. Learn how to integrate device fingerprinting, SIM swap detection, and behavioral analytics into your Android app with Kotlin."
        path="/docs/android"
        type="TechArticle"
      />
      <div className="flex w-full max-w-7xl mx-auto p-4">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8 py-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title mb-3">Android SDK</h1>
            <p className="text-gray-600 text-lg">
              Kotlin-based SDK for Android applications with device fingerprinting, SIM swap detection, and behavioral analytics
            </p>
          </div>

          {/* Installation */}
          <section id="installation" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Installation</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Maven Central (Recommended)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Add the SDK to your <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">build.gradle.kts</code> file. The SDK is published to Maven Central, so ensure you have the repository configured:
                </p>
                <CodeSnippet
                  code={String.raw`repositories {
    mavenCentral()
}

dependencies {
    implementation("com.keverd:sdk:1.0.0")
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">AAR File (Alternative)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  If you prefer to use a local AAR file, download it and add it to your project's <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">libs</code> directory (typically located at <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">app/libs/</code>). Then add the following dependencies:
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Note:</strong> The SDK requires several dependencies. When using the AAR file, you must include all required dependencies manually. The SDK uses Retrofit for networking, Kotlin Coroutines for asynchronous operations, and Gson for JSON serialization.
                </p>
                <CodeSnippet
                  code={String.raw`dependencies {
    implementation(files("libs/keverd-sdk.aar"))
    
    // Required dependencies
    implementation("androidx.core:core-ktx:1.10.1")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.google.code.gson:gson:2.10.1")
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Permissions</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Add these permissions to your <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">AndroidManifest.xml</code> file. These permissions are required for the SDK to collect device and network information:
                </p>
                <CodeSnippet
                  code={String.raw`<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />`}
                  language="xml"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong>READ_PHONE_STATE:</strong> Required for SIM card information collection. This is a runtime permission on Android 6.0+ (API level 23+). You must request it at runtime using <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">ActivityCompat.requestPermissions()</code> or a permission handling library. The SDK will gracefully handle cases where this permission is not granted, but SIM data will not be collected.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong>INTERNET:</strong> Required for network requests to the Keverd API. This is a normal permission and is automatically granted at install time.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="text-keverd-blue flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong>ACCESS_NETWORK_STATE:</strong> Used to check network connectivity before making API requests. This is a normal permission and is automatically granted at install time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Quick Start</h2>
            
            <div className="space-y-8">
              <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">1. Initialize the SDK</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Initialize the SDK in your <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">Application</code> class. This ensures the SDK is initialized once when your app starts, following the singleton pattern. The SDK uses the application context internally to prevent memory leaks.
                </p>
                <CodeSnippet
                  code={String.raw`import com.keverd.sdk.Config
import com.keverd.sdk.KeverdFingerprint

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        val config = Config(
            apiKey = "your-api-key-here",
            consentRequired = true
        )
        
        KeverdFingerprint.init(this, config)
    }
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">2. Request Consent (if required)</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  If <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">consentRequired</code> is set to <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">true</code> in your configuration (which is the default), you must obtain explicit user consent before data collection can proceed. This is important for GDPR, CCPA, and other privacy regulations.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>How it works:</strong> When you call <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">submit()</code> without consent, the SDK will return <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">Result.ConsentRequired</code>. You should then show a consent dialog to the user. Once consent is granted, call <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">setConsent(true)</code> and then retry the submission.
                </p>
                <CodeSnippet
                  code={String.raw`val sdk = KeverdFingerprint.init(context, config)

// Show consent dialog to user
showConsentDialog { granted ->
    sdk.setConsent(granted)
    
    if (granted) {
        submitFingerprint(userId)
    }
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">3. Submit Fingerprint</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Submit fingerprint data and receive a risk score. The <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">submit()</code> method is a suspend function, so it must be called from a coroutine scope (typically <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">lifecycleScope</code> in Activities or <code className="bg-white/50 px-1 rounded text-sm border border-gray-200">viewModelScope</code> in ViewModels).
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Threading:</strong> Data collection and network calls run on <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">Dispatchers.IO</code> to avoid blocking the main thread. The callback (<code className="bg-white/50 px-1 rounded text-xs border border-gray-200">onResult</code>) is automatically switched to <code className="bg-white/50 px-1 rounded text-xs border border-gray-200">Dispatchers.Main</code>, so you can safely update the UI from within the callback.
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  <strong>Performance:</strong> Data collection typically completes in under 50ms, and the total time (including network request) is typically under 100ms. The SDK uses connection, read, and write timeouts of 30 seconds each.
                </p>
                <CodeSnippet
                  code={String.raw`import kotlinx.coroutines.launch

fun submitFingerprint(userId: String) {
    val sdk = KeverdFingerprint.init(context, config)
    
    lifecycleScope.launch {
        sdk.submit(userId) { result ->
            when (result) {
                is Result.Success -> {
                    val riskScore = result.score
                    val requestId = result.requestId
                    
                    // Handle success
                    if (riskScore > 0.7) {
                        showSecurityAlert()
                    } else {
                        proceedWithTransaction()
                    }
                }
                
                is Result.Error -> {
                    Log.e("KeverdSDK", "Error: \${result.error}", result.throwable)
                    showError(result.error)
                }
                
                is Result.ConsentRequired -> {
                    requestUserConsent()
                }
            }
        }
    }
}`}
                  language="kotlin"
                />
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">API Reference</h2>
            
            <div className="space-y-10">
              <div id="keverd-fingerprint" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">KeverdFingerprint</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Main SDK class for fingerprint collection and submission.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">init(context: Context, config: Config): KeverdFingerprint</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Initializes the SDK singleton instance. This method follows the singleton pattern, so subsequent calls with different configurations will return the same instance that was first created. The SDK uses the application context internally to prevent memory leaks.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">context</code>: Application or Activity context. The SDK will use <code className="bg-white/50 px-1 rounded border border-gray-200">context.applicationContext</code> internally.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">config</code>: SDK configuration object (see Config section below).</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Returns:</strong> Initialized KeverdFingerprint instance (singleton)</p>
                      <p className="text-xs text-gray-600"><strong>Thread Safety:</strong> Thread-safe singleton pattern using <code className="bg-white/50 px-1 rounded border border-gray-200">@Volatile</code> and <code className="bg-white/50 px-1 rounded border border-gray-200">synchronized</code></p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">setConsent(granted: Boolean)</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Sets user consent for data collection. This method is thread-safe and can be called from any thread. The consent state is stored in memory and persists for the lifetime of the SDK instance.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">granted</code>: <code className="bg-white/50 px-1 rounded border border-gray-200">true</code> if user granted consent, <code className="bg-white/50 px-1 rounded border border-gray-200">false</code> otherwise.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Important:</strong> Must be called before <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code> if <code className="bg-white/50 px-1 rounded border border-gray-200">config.consentRequired == true</code>. If consent is not granted, <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code> will return <code className="bg-white/50 px-1 rounded border border-gray-200">Result.ConsentRequired</code>.</p>
                      <p className="text-xs text-gray-600"><strong>Note:</strong> If <code className="bg-white/50 px-1 rounded border border-gray-200">consentRequired</code> is <code className="bg-white/50 px-1 rounded border border-gray-200">false</code>, consent is automatically granted during initialization.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">submit(userId: String, onResult: (Result) -&gt; Unit)</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Submits fingerprint data and receives risk score via callback. This is a suspend function that must be called from a coroutine scope. The method collects device, SIM, session, and behavioral data, hashes sensitive identifiers, and sends the data to the Keverd API.</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>Parameters:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">userId</code>: User identifier (string). This is not hashed and is sent as-is to the API. If not provided or empty, the backend will auto-generate an identifier from the device fingerprint.</li>
                        <li><code className="bg-white/50 px-1 rounded border border-gray-200">onResult</code>: Callback function that receives a <code className="bg-white/50 px-1 rounded border border-gray-200">Result</code> object. The callback is executed on the main thread.</li>
                      </ul>
                      <p className="text-xs text-gray-600 mt-2"><strong>Threading:</strong> Data collection and network calls run on <code className="bg-white/50 px-1 rounded border border-gray-200">Dispatchers.IO</code> to avoid blocking the main thread. The callback executes on <code className="bg-white/50 px-1 rounded border border-gray-200">Dispatchers.Main</code>, so you can safely update the UI.</p>
                      <p className="text-xs text-gray-600"><strong>Performance:</strong> Data collection typically completes in under 50ms. Total time (including network request) is typically under 100ms (p99 latency). Network timeouts are set to 30 seconds for connection, read, and write operations.</p>
                      <p className="text-xs text-gray-600"><strong>Error Handling:</strong> All exceptions are caught and returned as <code className="bg-white/50 px-1 rounded border border-gray-200">Result.Error</code>. Network errors, JSON parsing errors, and other exceptions are included in the error message.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="config" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Config</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Configuration data class for SDK initialization.</p>
                
                <div className="bg-white/50 rounded-xl p-8 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    The <code className="bg-white/50 px-1 rounded border border-gray-200">Config</code> data class is used to configure the SDK during initialization. All parameters are validated during object creation.
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
                          <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">String</code></td>
                          <td className="py-3 px-4 text-gray-700">Yes</td>
                          <td className="py-3 px-4 text-gray-700">—</td>
                          <td className="py-3 px-4 text-gray-700">API key for authenticating requests to the Keverd API. Obtain your API key from the <a href="/api-keys" className="text-keverd-blue hover:underline">API Keys page</a> in the dashboard. The API key is sent in the request header as <code className="bg-white/50 px-1 rounded border border-gray-200">x-keverd-key</code>. Keep your API key secure and never commit it to version control.</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm text-keverd-ink">consentRequired</td>
                          <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">Boolean</code></td>
                          <td className="py-3 px-4 text-gray-700">No</td>
                          <td className="py-3 px-4 text-gray-700">true</td>
                          <td className="py-3 px-4 text-gray-700">Whether explicit user consent is required before data collection. If <code className="bg-white/50 px-1 rounded border border-gray-200">true</code>, you must call <code className="bg-white/50 px-1 rounded border border-gray-200">setConsent(true)</code> before calling <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code>. If <code className="bg-white/50 px-1 rounded border border-gray-200">false</code>, consent is automatically granted during initialization. Set to <code className="bg-white/50 px-1 rounded border border-gray-200">false</code> only if you have obtained consent through other means (e.g., terms of service acceptance).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div id="result-types" className="scroll-mt-20">
                <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Result Types</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">The SDK returns one of these result types:</p>
                
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  The SDK uses a sealed class <code className="bg-white/50 px-1 rounded border border-gray-200">Result</code> to represent the outcome of a fingerprint submission. This ensures type safety when handling results using Kotlin's <code className="bg-white/50 px-1 rounded border border-gray-200">when</code> expressions.
                </p>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Result.Success</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Returned when the fingerprint submission is successful and a risk score is received from the API.</p>
                    <CodeSnippet
                      code={String.raw`data class Success(
    val score: Double,      // Risk score (0.0 to 1.0, where 1.0 is highest risk)
    val requestId: String   // Unique request identifier (UUID)
)`}
                      language="kotlin"
                      showCopy={false}
                    />
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>score:</strong> Risk score as a double between 0.0 (lowest risk) and 1.0 (highest risk). This is the normalized score. You can multiply by 100 to get a percentage (0-100). Use this score to make security decisions in your app.</p>
                      <p className="text-xs text-gray-600"><strong>requestId:</strong> Unique identifier (UUID) for this request. Use this to track and correlate events, debug issues, or reference the request in support tickets.</p>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Result.Error</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Returned when an error occurs during data collection or API submission. This can include network errors, API errors, JSON parsing errors, or other exceptions.</p>
                    <CodeSnippet
                      code={String.raw`data class Error(
    val error: String,              // Human-readable error message
    val throwable: Throwable? = null // Optional exception for debugging
)`}
                      language="kotlin"
                      showCopy={false}
                    />
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600"><strong>error:</strong> Human-readable error message describing what went wrong. Examples: "Network error", "Invalid API key", "JSON parsing failed".</p>
                      <p className="text-xs text-gray-600"><strong>throwable:</strong> Optional exception object that caused the error. This is useful for debugging and logging. May be <code className="bg-white/50 px-1 rounded border border-gray-200">null</code> if the error was not caused by an exception.</p>
                      <p className="text-xs text-gray-600 mt-2"><strong>Common Errors:</strong></p>
                      <ul className="text-xs text-gray-600 ml-4 space-y-1">
                        <li>Network connectivity issues (no internet, timeout)</li>
                        <li>Invalid or expired API key</li>
                        <li>Server errors (5xx status codes)</li>
                        <li>JSON parsing errors</li>
                        <li>Missing required permissions</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-mono text-sm font-semibold mb-3 text-keverd-ink">Result.ConsentRequired</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">Returned when user consent is required but has not been granted. This only occurs if <code className="bg-white/50 px-1 rounded border border-gray-200">config.consentRequired == true</code> and <code className="bg-white/50 px-1 rounded border border-gray-200">setConsent(true)</code> has not been called.</p>
                    <CodeSnippet
                      code={String.raw`object ConsentRequired`}
                      language="kotlin"
                      showCopy={false}
                    />
                    <div className="mt-3">
                      <p className="text-xs text-gray-600"><strong>Handling:</strong> When you receive this result, show a consent dialog to the user. Once consent is granted, call <code className="bg-white/50 px-1 rounded border border-gray-200">setConsent(true)</code> and retry the <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code> call.</p>
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
              The SDK collects four types of data: device information, SIM card data, session information, and behavioral data. All sensitive identifiers are SHA-256 hashed client-side before transmission to ensure privacy and compliance with data protection regulations.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Device Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the <code className="bg-white/50 px-1 rounded border border-gray-200">DeviceCollector</code> class. Includes:
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Device ID:</strong> First 32 characters of the device fingerprint hash</li>
                  <li><strong>Fingerprint:</strong> SHA-256 hash (64 hex characters) of device characteristics including manufacturer, model, OS version, screen dimensions, timezone, and locale</li>
                  <li><strong>Manufacturer:</strong> Device manufacturer (e.g., "Samsung", "Google", "Xiaomi")</li>
                  <li><strong>Model:</strong> Device model name (e.g., "SM-G991B", "Pixel 7")</li>
                  <li><strong>OS Version:</strong> Android version (e.g., "13", "14")</li>
                  <li><strong>Screen Dimensions:</strong> Screen width and height in pixels</li>
                  <li><strong>Timezone:</strong> IANA timezone identifier (e.g., "America/New_York", "Africa/Nairobi")</li>
                  <li><strong>Locale:</strong> Device locale (e.g., "en-US", "sw-KE")</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Privacy:</strong> The fingerprint is computed client-side and only the hash is transmitted. No raw device identifiers are sent.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">SIM Card Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the <code className="bg-white/50 px-1 rounded border border-gray-200">SimCollector</code> class. Requires <code className="bg-white/50 px-1 rounded border border-gray-200">READ_PHONE_STATE</code> permission.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>SIM Serial Number:</strong> SHA-256 hashed SIM card serial number (ICCID)</li>
                  <li><strong>Phone Number:</strong> SHA-256 hashed phone number (if available)</li>
                  <li><strong>Network Operator:</strong> Mobile network operator name (e.g., "Safaricom", "Airtel")</li>
                  <li><strong>Network Type:</strong> Network type (e.g., "LTE", "5G", "3G")</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Note:</strong> If <code className="bg-white/50 px-1 rounded border border-gray-200">READ_PHONE_STATE</code> permission is not granted, SIM data collection is skipped gracefully. The SDK will still function, but SIM swap detection features will not be available.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Session Information</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the <code className="bg-white/50 px-1 rounded border border-gray-200">SessionCollector</code> class. Tracks session and installation data.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Session ID:</strong> Unique session identifier (UUID) generated for each app session</li>
                  <li><strong>Timestamp:</strong> ISO 8601 formatted timestamp of the current session</li>
                  <li><strong>Session Count:</strong> Number of sessions for this device (stored in SharedPreferences)</li>
                  <li><strong>First Session:</strong> ISO 8601 formatted timestamp of the first session (when the app was first installed)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Storage:</strong> Session data is persisted in <code className="bg-white/50 px-1 rounded border border-gray-200">SharedPreferences</code> with the key prefix <code className="bg-white/50 px-1 rounded border border-gray-200">keverd_sdk_</code>.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Behavioral Data</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Collected by the <code className="bg-white/50 px-1 rounded border border-gray-200">BehavioralCollector</code> class. Tracks user interaction patterns for behavioral biometrics.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Typing Dwell Time:</strong> Array of milliseconds representing how long keys are held down (typically 5-20 samples)</li>
                  <li><strong>Typing Flight Time:</strong> Array of milliseconds representing time between key releases (typically 5-20 samples)</li>
                  <li><strong>Swipe Velocity:</strong> Average swipe velocity in pixels per millisecond (0.0 if no swipe data available)</li>
                  <li><strong>Session Entropy:</strong> Shannon entropy value based on event diversity. Higher values indicate more diverse user interactions (0.0 if no events collected)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Collection:</strong> Behavioral data is collected passively as users interact with your app. The collector tracks touch events, scroll gestures, and keyboard input. Data collection starts automatically when the SDK is initialized.</p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-keverd-ink mb-3">Hashing and Privacy</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  All sensitive identifiers are hashed using SHA-256 before transmission. The <code className="bg-white/50 px-1 rounded border border-gray-200">HashUtil</code> class handles all hashing operations.
                </p>
                <ul className="text-sm text-gray-700 ml-4 space-y-1 list-disc">
                  <li><strong>Device Fingerprint:</strong> Computed from a combination of device characteristics and hashed to 64 hex characters</li>
                  <li><strong>SIM Serial Number:</strong> Hashed using SHA-256</li>
                  <li><strong>Phone Number:</strong> Hashed using SHA-256 (if available)</li>
                  <li><strong>No Raw PII:</strong> No personally identifiable information is transmitted in plain text</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2"><strong>Compliance:</strong> This approach ensures compliance with GDPR, CCPA, and other data protection regulations. The hashed identifiers cannot be reverse-engineered to reveal the original values.</p>
              </div>
            </div>
          </section>

          {/* Complete Example */}
          <section id="complete-example" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Complete Example</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Here's a complete example showing how to integrate the SDK into an Android Activity. This example demonstrates initialization, consent handling, fingerprint submission, and result processing.
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <CodeSnippet
                code={String.raw`import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.keverd.sdk.Config
import com.keverd.sdk.KeverdFingerprint
import com.keverd.sdk.Result
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    
    private lateinit var sdk: KeverdFingerprint
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize SDK
        val config = Config(
            apiKey = "your-api-key",
            consentRequired = true
        )
        sdk = KeverdFingerprint.init(this, config)
        
        // Request consent
        requestConsent()
    }
    
    private fun requestConsent() {
        showConsentDialog(
            onAccept = {
                sdk.setConsent(true)
                submitFingerprint("user123")
            },
            onDecline = {
                sdk.setConsent(false)
                // Handle declined consent
            }
        )
    }
    
    private fun submitFingerprint(userId: String) {
        lifecycleScope.launch {
            sdk.submit(userId) { result ->
                when (result) {
                    is Result.Success -> {
                        handleRiskScore(result.score, result.requestId)
                    }
                    is Result.Error -> {
                        handleError(result.error)
                    }
                    is Result.ConsentRequired -> {
                        requestConsent()
                    }
                }
            }
        }
    }
    
    private fun handleRiskScore(score: Double, requestId: String) {
        when {
            score >= 0.8 -> {
                requireAdditionalVerification()
            }
            score >= 0.5 -> {
                logSuspiciousActivity(requestId)
            }
            else -> {
                proceedNormally()
            }
        }
    }
}`}
                language="kotlin"
              />
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Error Handling</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The SDK handles errors gracefully and returns them as <code className="bg-white/50 px-1 rounded border border-gray-200">Result.Error</code>. Here's how to handle different error scenarios:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Network Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Network errors occur when the device cannot connect to the API or when the request times out. The SDK uses 30-second timeouts for connection, read, and write operations.
                </p>
                <CodeSnippet
                  code={String.raw`is Result.Error -> {
    when {
        result.error.contains("timeout", ignoreCase = true) -> {
            // Handle timeout - retry with exponential backoff
            retryWithBackoff()
        }
        result.error.contains("network", ignoreCase = true) -> {
            // Handle network connectivity issues
            showNetworkError()
        }
        else -> {
            // Handle other network errors
            Log.e("KeverdSDK", "Network error: \${result.error}", result.throwable)
        }
    }
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">API Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  API errors occur when the server returns an error response (4xx or 5xx status codes). Common API errors include invalid API key, rate limiting, and server errors.
                </p>
                <CodeSnippet
                  code={String.raw`is Result.Error -> {
    when {
        result.error.contains("401", ignoreCase = true) || 
        result.error.contains("unauthorized", ignoreCase = true) -> {
            // Invalid or expired API key
            Log.e("KeverdSDK", "API key error: \${result.error}")
            // Prompt user to check API key configuration
        }
        result.error.contains("429", ignoreCase = true) || 
        result.error.contains("rate limit", ignoreCase = true) -> {
            // Rate limit exceeded
            Log.w("KeverdSDK", "Rate limit exceeded: \${result.error}")
            // Implement exponential backoff
        }
        result.error.contains("500", ignoreCase = true) -> {
            // Server error - retry after delay
            Log.e("KeverdSDK", "Server error: \${result.error}")
            retryAfterDelay()
        }
        else -> {
            Log.e("KeverdSDK", "API error: \${result.error}", result.throwable)
        }
    }
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Data Collection Errors</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Data collection errors can occur if required permissions are missing or if there's an issue accessing device information. The SDK handles these gracefully and continues with available data.
                </p>
                <CodeSnippet
                  code={String.raw`is Result.Error -> {
    if (result.error.contains("permission", ignoreCase = true)) {
        // Missing required permission
        requestMissingPermission()
    } else {
        // Other data collection errors
        Log.e("KeverdSDK", "Collection error: \${result.error}", result.throwable)
        // SDK will still attempt to submit with available data
    }
}`}
                  language="kotlin"
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Best Practices</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc ml-4">
                  <li>Always check the error message and handle different error types appropriately</li>
                  <li>Log errors with the throwable for debugging purposes</li>
                  <li>Implement retry logic with exponential backoff for transient errors (network, 5xx)</li>
                  <li>Don't retry on client errors (4xx) unless the error message indicates it's safe to do so</li>
                  <li>Show user-friendly error messages for network and permission errors</li>
                  <li>Monitor error rates and patterns to identify issues early</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-8">Best Practices</h2>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Initialization</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                  <li>Initialize the SDK in your <code className="bg-white/50 px-1 rounded border border-gray-200">Application</code> class's <code className="bg-white/50 px-1 rounded border border-gray-200">onCreate()</code> method</li>
                  <li>Use the application context, not an activity context, to prevent memory leaks</li>
                  <li>Store your API key securely (e.g., in BuildConfig, environment variables, or a secure storage solution)</li>
                  <li>Never commit API keys to version control</li>
                  <li>Use different API keys for development, staging, and production environments</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Consent Management</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                  <li>Always request consent before data collection if <code className="bg-white/50 px-1 rounded border border-gray-200">consentRequired</code> is <code className="bg-white/50 px-1 rounded border border-gray-200">true</code></li>
                  <li>Show a clear, user-friendly consent dialog explaining what data is collected and why</li>
                  <li>Respect user's choice - if consent is declined, do not attempt to collect data</li>
                  <li>Store consent status if needed for future sessions (the SDK does not persist consent across app restarts)</li>
                  <li>Allow users to revoke consent at any time by calling <code className="bg-white/50 px-1 rounded border border-gray-200">setConsent(false)</code></li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Permission Handling</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                  <li>Request <code className="bg-white/50 px-1 rounded border border-gray-200">READ_PHONE_STATE</code> permission at runtime on Android 6.0+</li>
                  <li>Explain why the permission is needed before requesting it</li>
                  <li>Handle permission denial gracefully - the SDK will still work without SIM data</li>
                  <li>Check permission status before calling <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code> if SIM data is critical for your use case</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Risk Score Usage</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                  <li>Use risk scores to make security decisions, not as the sole factor</li>
                  <li>Combine risk scores with other signals (e.g., login history, device trust, user behavior)</li>
                  <li>Implement graduated security measures based on risk levels (0-29: allow, 30-49: soft challenge, 50-69: hard challenge, 70-100: block)</li>
                  <li>Log risk scores and decisions for auditing and analysis</li>
                  <li>Monitor risk score distributions to identify anomalies or issues</li>
                  <li>Use the <code className="bg-white/50 px-1 rounded border border-gray-200">requestId</code> to correlate events and debug issues</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Performance</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                  <li>Call <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code> from a coroutine scope (lifecycleScope or viewModelScope)</li>
                  <li>Don't block the main thread - the SDK handles threading automatically</li>
                  <li>Avoid calling <code className="bg-white/50 px-1 rounded border border-gray-200">submit()</code> too frequently (e.g., on every screen transition)</li>
                  <li>Consider caching risk scores for a short period to avoid redundant API calls</li>
                  <li>Implement retry logic with exponential backoff for failed requests</li>
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2">Security</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                  <li>All SDK communication uses HTTPS for secure data transmission</li>
                  <li>Store API keys securely and never expose them in client-side code if possible</li>
                  <li>Use ProGuard or R8 to obfuscate your code and protect API keys</li>
                  <li>Monitor API key usage and rotate keys regularly</li>
                  <li>Implement certificate pinning if required by your security policy</li>
                  <li>Review and update dependencies regularly for security patches</li>
                </ul>
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
                  <h3 className="font-semibold text-keverd-ink mb-1">Privacy-First</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">All identifiers are SHA-256 hashed client-side before transmission</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">High Performance</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Data collection &lt; 50ms, total response time &lt; 100ms</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Lightweight</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">SDK size &lt; 600 KB</p>
                </div>
              </div>
              <div className="flex gap-3 bg-white/50 rounded-lg p-4 border border-gray-200">
                <CheckCircle2 className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-keverd-ink mb-1">Consent Management</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Built-in consent checking before data collection</p>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section id="requirements" className="mb-10 pb-10">
            <h2 className="section-title mb-8">Requirements</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Android SDK has the following minimum requirements for integration:
            </p>
            <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700"><strong className="text-keverd-ink">Min SDK:</strong> 21 (Android 5.0 Lollipop). This ensures compatibility with 99%+ of active Android devices.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700"><strong className="text-keverd-ink">Target SDK:</strong> 36 (Android 14). Always target the latest SDK version for best security and performance.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700"><strong className="text-keverd-ink">Kotlin:</strong> 1.9 or higher. The SDK is written in Kotlin and uses modern Kotlin features.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700"><strong className="text-keverd-ink">Java:</strong> 11 or higher. Required for Kotlin compilation and runtime.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700"><strong className="text-keverd-ink">Internet Connection:</strong> Required for API communication. The SDK handles offline scenarios gracefully.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-keverd-blue rounded-full" />
                  <span className="text-gray-700"><strong className="text-keverd-ink">Permissions:</strong> <code className="bg-white/50 px-1 rounded border border-gray-200">INTERNET</code> and <code className="bg-white/50 px-1 rounded border border-gray-200">ACCESS_NETWORK_STATE</code> are required. <code className="bg-white/50 px-1 rounded border border-gray-200">READ_PHONE_STATE</code> is optional but recommended for SIM data collection.</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-2 text-sm">Dependencies</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  The SDK includes the following dependencies (automatically resolved when using Maven Central):
                </p>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>AndroidX Core KTX 1.10.1+</li>
                  <li>Kotlin Coroutines Core 1.7.3+</li>
                  <li>Kotlin Coroutines Android 1.7.3+</li>
                  <li>Retrofit 2.9.0+</li>
                  <li>OkHttp 4.12.0+</li>
                  <li>Gson 2.10.1+</li>
                </ul>
              </div>
            </div>
          </section>
          
          <SDKNavigation currentSDK="android" />
        </main>
      </div>
    </>
  );
}
