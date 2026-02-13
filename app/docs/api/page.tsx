"use client";

import { CodeSnippet } from "../../components/CodeSnippet";
import { Tag } from "../../components/Tag";
import { SearchBar } from "../../components/SearchBar";
import { TableOfContents } from "../../components/TableOfContents";
import { StructuredData } from "../../components/StructuredData";
import { Code, AlertCircle, CheckCircle2, Info, Smartphone, Globe, FileCode, Shield } from "lucide-react";
import Link from "next/link";

const tableOfContents = [
  { id: "api-overview", title: "API Overview" },
  { id: "fingerprint-score", title: "POST /fingerprint/score" },
  { id: "request-format", title: "Request Format", level: 2 },
  { id: "response-format", title: "Response Format", level: 2 },
  { id: "risk-scores", title: "Risk Score Interpretation", level: 2 },
  { id: "verification-endpoints", title: "Use-Case Verification Endpoints" },
  { id: "registration-behavioral-monitoring", title: "Registration Behavioral Monitoring", level: 2 },
  { id: "adaptive-responses", title: "Adaptive Responses", level: 2 },
  { id: "use-cases", title: "Use Case Integration Examples" },
  { id: "login-protection", title: "Login Protection" },
  { id: "login-backend-examples", title: "Backend Integration Examples", level: 2 },
  { id: "error-handling", title: "Error Handling" },
  { id: "authentication", title: "Authentication" },
  { id: "rate-limiting", title: "Rate Limiting" },
  { id: "code-examples", title: "Code Examples" },
  { id: "performance", title: "Performance & Latency" },
  { id: "data-privacy", title: "Data Privacy & Compliance" },
  { id: "sdk-integration", title: "SDK Integration Guides" },
];

export default function APIRefPage() {
  return (
    <>
      <StructuredData
        title="API Reference Documentation"
        description="Complete API reference for Keverd fraud detection platform. Detailed documentation for all endpoints, request/response formats, authentication, error handling, and integration examples."
        path="/docs/api"
        type="TechArticle"
      />
      <div className="flex w-full max-w-7xl mx-auto p-4">
        <TableOfContents items={tableOfContents} />
        <main className="flex-1 w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-8 py-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="section-title mb-3">API Reference</h1>
        <p className="text-gray-600 text-lg">
          Complete API documentation for the Keverd fraud detection platform. All endpoints, request/response formats, error handling, and integration examples.
        </p>
      </div>

          {/* Quick Navigation */}
          <div className="mb-8">
            <SearchBar placeholder="Search API endpoints, methods, parameters..." className="mb-4" />
            <div className="flex flex-wrap gap-2">
              <Tag href="#fingerprint-score" variant="primary">POST /fingerprint/score</Tag>
              <Tag href="#request-format" variant="secondary">Request Format</Tag>
              <Tag href="#response-format" variant="secondary">Response Format</Tag>
              <Tag href="#error-handling" variant="secondary">Error Handling</Tag>
              <Tag href="#authentication" variant="secondary">Authentication</Tag>
              <Tag href="#rate-limiting" variant="secondary">Rate Limiting</Tag>
            </div>
          </div>

          {/* API Overview */}
          <section id="api-overview" className="mb-10 pb-10 border-b border-gray-200">
            <h2 className="section-title mb-6">API Overview</h2>
            <div className="bg-keverd-blue/5 rounded-xl p-6 border border-keverd-blue/20 space-y-4">
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Base URL</h3>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">https://api.keverd.com</code>
          </div>
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Authentication</h3>
            <p className="text-gray-600 text-sm mb-2">
              All API requests require authentication using an API key. Include your API key in one of the following headers:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li><code className="bg-gray-100 px-1 rounded">x-keverd-key</code> (recommended)</li>
              <li><code className="bg-gray-100 px-1 rounded">X-API-KEY</code></li>
              <li><code className="bg-gray-100 px-1 rounded">Authorization: Bearer YOUR_API_KEY</code></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Content Type</h3>
            <p className="text-gray-600 text-sm">
              All requests must use <code className="bg-gray-100 px-1 rounded">Content-Type: application/json</code>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">SDK Source Identification</h3>
            <p className="text-gray-600 text-sm mb-2">
              SDKs automatically include the <code className="bg-gray-100 px-1 rounded">X-SDK-Source</code> header to identify the SDK type:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li><code className="bg-gray-100 px-1 rounded">javascript</code> - Vanilla JavaScript SDK</li>
              <li><code className="bg-gray-100 px-1 rounded">react</code> - React SDK</li>
              <li><code className="bg-gray-100 px-1 rounded">vue</code> - Vue.js SDK</li>
              <li><code className="bg-gray-100 px-1 rounded">angular</code> - Angular SDK</li>
              <li><code className="bg-gray-100 px-1 rounded">android</code> - Android SDK</li>
            </ul>
          </div>
        </div>
          </section>

          {/* Main Endpoint */}
          <section id="fingerprint-score" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-white/50 text-keverd-ink rounded-full text-xs font-semibold border border-gray-200">
                POST
              </span>
              <h2 className="section-title">/fingerprint/score</h2>
            </div>
        
        <p className="text-gray-600 mb-6">
          Score a fingerprint submission and return risk assessment. This is the primary endpoint for fraud detection. 
          Accepts both SDK format (nested structure) and direct format (flat structure). Target latency: &lt;100ms p99.
        </p>

        <div className="space-y-6">
          {/* Request Format */}
          <div id="request-format">
            <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Request Format</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-keverd-ink mb-2">SDK Format (Recommended)</h4>
                <p className="text-gray-600 text-sm mb-3">
                  This is the format used by all Keverd SDKs. It provides a structured, nested format that's easier to work with.
                </p>
                <CodeSnippet
                  code={String.raw`POST https://api.keverd.com/fingerprint/score
Content-Type: application/json
x-keverd-key: your-api-key-here
X-SDK-Source: javascript

{
  "userId": "user123",
  "device": {
    "deviceId": "abc123...",
    "fingerprint": "sha256_hash_64_chars...",
    "manufacturer": "Apple",
    "model": "iPhone 13",
    "brand": "Apple",
    "device": "mobile",
    "product": "iPhone",
    "hardware": "iPhone13,2",
    "sdkVersion": "1.0.0",
    "osVersion": "15.0",
    "screenWidth": "390",
    "screenHeight": "844",
    "screenDensity": "3.0",
    "locale": "en-US",
    "timezone": "America/New_York"
  },
  "session": {
    "sessionId": "session_123",
    "timestamp": "2025-01-15T10:30:00Z"
  },
  "behavioral": {
    "typing_dwell_ms": [120.5, 135.2, 110.8, 125.3, 130.1],
    "typing_flight_ms": [45.2, 50.1, 42.3, 48.7, 46.5],
    "swipe_velocity": 2.5,
    "session_entropy": 3.8
  }
}`}
                  language="http"
                />
              </div>

              <div>
                <h4 className="font-semibold text-keverd-ink mb-2">Android SDK Format (with SIM data)</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Android SDK includes SIM card information for enhanced fraud detection:
                </p>
                <CodeSnippet
                  code={String.raw`{
  "userId": "user123",
  "device": {
    "deviceId": "abc123...",
    "fingerprint": "sha256_hash...",
    "manufacturer": "Samsung",
    "model": "SM-G991B",
    "osVersion": "13",
    "timezone": "Africa/Nairobi",
    ...
  },
  "sim": {
    "simOperator": "63902",
    "simOperatorName": "Safaricom",
    "simSerialNumber": "hashed_sim_serial",
    "networkOperator": "63902",
    "networkType": "LTE"
  },
  "session": {
    "sessionId": "session_123",
    "sessionCount": "5",
    "firstSession": "2025-01-01T00:00:00Z"
  },
  "behavioral": {
    "typing_dwell_ms": [120.5, 135.2],
    "typing_flight_ms": [45.2, 50.1],
    "swipe_velocity": 2.5,
    "session_entropy": 3.8
  }
}`}
                  language="json"
                />
              </div>
            </div>
          </div>

          {/* Request Parameters */}
          <div>
            <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Request Parameters</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Parameter</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Required</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">userId</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">User identifier. If not provided, backend auto-generates from device fingerprint</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">device</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">object</code></td>
                    <td className="py-3 px-4 text-gray-700">Yes</td>
                    <td className="py-3 px-4 text-gray-700">Device information object (see DeviceInfo below)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">session</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">object</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Session information object (see SessionInfo below)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">behavioral</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">object</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Behavioral data object (see BehavioralData below)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">sim</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">object</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">SIM card information (Android/iOS only, see SimInfo below)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DeviceInfo */}
          <div>
            <h4 className="font-semibold text-keverd-ink mb-2">DeviceInfo Object</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Field</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Required</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">deviceId</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">Yes</td>
                    <td className="py-3 px-4 text-gray-700">Unique device identifier (first 32 chars of fingerprint)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">fingerprint</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">Yes</td>
                    <td className="py-3 px-4 text-gray-700">SHA-256 hash of device characteristics (64 hex characters)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">manufacturer</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Device manufacturer (e.g., "Apple", "Samsung")</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">model</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Device model name</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">osVersion</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Operating system version</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">screenWidth</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Screen width in pixels</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">screenHeight</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Screen height in pixels</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">timezone</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">Yes</td>
                    <td className="py-3 px-4 text-gray-700">IANA timezone identifier (e.g., "America/New_York", "Africa/Nairobi")</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">locale</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">No</td>
                    <td className="py-3 px-4 text-gray-700">Device locale (e.g., "en-US", "sw-KE")</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SessionInfo */}
          <div>
            <h4 className="font-semibold text-keverd-ink mb-2">SessionInfo Object</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Field</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">sessionId</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">Unique session identifier</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">timestamp</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string (ISO 8601)</code></td>
                    <td className="py-3 px-4 text-gray-700">Session timestamp in ISO 8601 format</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">sessionCount</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                    <td className="py-3 px-4 text-gray-700">Number of sessions for this device (Android SDK)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">firstSession</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string (ISO 8601)</code></td>
                    <td className="py-3 px-4 text-gray-700">Timestamp of first session (Android SDK)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BehavioralData */}
          <div>
            <h4 className="font-semibold text-keverd-ink mb-2">BehavioralData Object</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Field</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">typing_dwell_ms</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">number[]</code></td>
                    <td className="py-3 px-4 text-gray-700">Array of typing dwell times (time key is held down) in milliseconds. Typically 5-20 samples.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">typing_flight_ms</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">number[]</code></td>
                    <td className="py-3 px-4 text-gray-700">Array of typing flight times (time between key releases) in milliseconds. Typically 5-20 samples.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">swipe_velocity</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">number</code></td>
                    <td className="py-3 px-4 text-gray-700">Average swipe velocity in pixels per millisecond. 0.0 if no swipe data available.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">session_entropy</td>
                    <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">number</code></td>
                    <td className="py-3 px-4 text-gray-700">Session entropy value (Shannon entropy) based on event diversity. Higher values indicate more diverse user interactions. 0.0 if no events collected.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Signals */}
          <div className="mt-6">
            <h4 className="font-semibold text-keverd-ink mb-4">Enhanced Signals (Automatically Collected)</h4>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              The SDK automatically collects enhanced behavioral signals that are critical for accurate risk scoring, especially for registration use cases. These signals are included automatically in all requests - you don't need to manually collect or send them.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-xs font-semibold text-blue-900 mb-2">
                <Info className="inline mr-1" size={12} />
                Automatic Collection
              </p>
              <p className="text-xs text-blue-800">
                All enhanced signals are collected automatically in the background from the moment the SDK is initialized. No manual collection or configuration is required.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-semibold text-sm text-keverd-ink mb-3">Mouse Signals</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Field</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">clickCount</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Total number of mouse clicks detected</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">totalDistance</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Total distance mouse moved in pixels</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">averageVelocity</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Average mouse movement velocity (pixels/ms)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Used for:</strong> Detecting uniform mouse patterns (bot behavior), measuring user engagement, identifying automation
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-semibold text-sm text-keverd-ink mb-3">Keyboard Signals</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Field</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">keydownCount</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Total number of keydown events</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">typingSpeed</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Average typing speed (characters per second)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Used for:</strong> Detecting uniform typing patterns (bot behavior), identifying copy-paste behavior, measuring typing consistency
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-semibold text-sm text-keverd-ink mb-3">Page Interactions</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Field</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">clickCount</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Total page clicks</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">scrollDepth</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Maximum scroll depth (0-100%)</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">timeToFirstInteraction</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Time to first user interaction in milliseconds</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">timeOnPage</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Total time spent on page in milliseconds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Used for:</strong> Detecting minimal interactions (bot behavior), measuring engagement, identifying fast flows
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-semibold text-sm text-keverd-ink mb-3">Form Interactions</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Field</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">focusCount</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Number of form field focus events</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">pasteCount</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">number</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Number of paste events (high risk for registration)</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">autofillDetected</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">boolean</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Whether browser autofill was detected</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">fieldFocusOrder</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">string[]</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Order in which fields were focused (detects perfect completion)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Used for:</strong> Detecting copy-paste behavior, identifying perfect form completion (bot), measuring form interaction patterns
                </p>
              </div>

              <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-semibold text-sm text-keverd-ink mb-3">Privacy Signals</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Field</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-keverd-ink text-xs">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">isIncognito</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">boolean</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Whether browser is in incognito/private mode</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">isVPN</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">boolean</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Whether VPN or proxy is detected</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">isAutomated</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">boolean</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Whether automation/bot is detected (high risk)</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 font-mono text-xs text-keverd-ink">hasAdBlocker</td>
                        <td className="py-2 px-3 text-gray-700 text-xs"><code className="text-keverd-blue">boolean</code></td>
                        <td className="py-2 px-3 text-gray-700 text-xs">Whether ad blocker is detected</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Used for:</strong> Detecting automation tools, identifying privacy-focused users, flagging suspicious browser configurations
                </p>
              </div>
            </div>

            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-green-900 mb-1">
                <Info className="inline mr-1" size={12} />
                Why These Signals Matter for Registration
              </p>
              <ul className="text-xs text-green-800 space-y-1 ml-4 list-disc">
                <li><strong>Bot Detection:</strong> Uniform mouse/keyboard patterns indicate automation</li>
                <li><strong>Behavior Change:</strong> Mid-session changes suggest session hijacking or account sharing</li>
                <li><strong>Copy-Paste Detection:</strong> Excessive paste events suggest fake account creation</li>
                <li><strong>Perfect Completion:</strong> Forms filled too quickly or perfectly indicate bots</li>
                <li><strong>Minimal Interactions:</strong> Low click/scroll counts suggest non-human behavior</li>
              </ul>
            </div>
          </div>

          {/* Response Format */}
          <div id="response-format">
            <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Response Format</h3>
            <CodeSnippet
              code={String.raw`{
  "risk_score": 25,
  "score": 0.25,
  "action": "allow",
  "reason": [],
  "session_id": "123e4567-e89b-12d3-a456-426614174000",
  "requestId": "123e4567-e89b-12d3-a456-426614174000",
  "sim_swap_engine": {
    "risk": 0.0,
    "flags": {
      "sim_changed": false,
      "device_changed": false,
      "behavior_anomaly": false,
      "time_anomaly": false,
      "velocity_anomaly": false
    },
    "updatedProfile": {}
  }
}`}
              language="json"
            />

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-keverd-ink mb-2">Response Fields</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Field</th>
                        <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">risk_score</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">number (0-100)</code></td>
                        <td className="py-3 px-4 text-gray-700">Risk score from 0 (lowest risk) to 100 (highest risk). Integer value for easy comparison.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">score</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">number (0.0-1.0)</code></td>
                        <td className="py-3 px-4 text-gray-700">Normalized risk score as float. Equal to risk_score / 100. Provided for SDK compatibility.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">action</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string</code></td>
                        <td className="py-3 px-4 text-gray-700">Recommended action: "allow", "soft_challenge", "hard_challenge", or "block"</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">reason</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string[]</code></td>
                        <td className="py-3 px-4 text-gray-700">Array of risk reasons explaining why the risk score was assigned. Examples: ["new_user_profile", "geo_jump", "device_changed", "behavior_anomaly"]</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">session_id</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string (UUID)</code></td>
                        <td className="py-3 px-4 text-gray-700">Unique session identifier for this request. Use this to track and correlate events.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">requestId</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">string (UUID)</code></td>
                        <td className="py-3 px-4 text-gray-700">Unique request identifier. Same as session_id, provided for SDK compatibility.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-mono text-sm text-keverd-ink">sim_swap_engine</td>
                        <td className="py-3 px-4 text-gray-700"><code className="text-keverd-blue">object</code></td>
                        <td className="py-3 px-4 text-gray-700">SIM swap detection results (only present for Android/iOS SDKs with SIM data). Contains risk score and flags indicating detected anomalies.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Score Interpretation */}
          <div id="risk-scores">
            <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Risk Score Interpretation</h3>
            <div className="bg-white/50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Understanding Risk Scores:</strong> Risk scores are calculated based on multiple factors including device history, behavioral patterns, geographic anomalies, and SIM swap detection (for mobile devices).
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Score Range</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Action</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Meaning</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Recommended Response</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm font-semibold text-keverd-ink">0-29</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-white/50 text-keverd-ink px-2 py-1 rounded border border-gray-200">allow</code></td>
                    <td className="py-3 px-4 text-gray-700">Low risk. User appears to be legitimate based on device history and behavior patterns.</td>
                    <td className="py-3 px-4 text-gray-700">Proceed with login/transaction. No additional verification required.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm font-semibold text-keverd-ink">30-49</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-white/50 text-keverd-ink px-2 py-1 rounded border border-gray-200">soft_challenge</code></td>
                    <td className="py-3 px-4 text-gray-700">Moderate risk. Some anomalies detected but may be legitimate (e.g., new device, location change).</td>
                    <td className="py-3 px-4 text-gray-700">Require additional verification such as email/SMS verification or security questions.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm font-semibold text-keverd-ink">50-69</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-white/50 text-keverd-ink px-2 py-1 rounded border border-gray-200">hard_challenge</code></td>
                    <td className="py-3 px-4 text-gray-700">High risk. Significant anomalies detected (e.g., device change, behavioral mismatch, geographic jump).</td>
                    <td className="py-3 px-4 text-gray-700">Require strong MFA (multi-factor authentication) such as TOTP, hardware key, or biometric verification.</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm font-semibold text-keverd-ink">70-100</td>
                    <td className="py-3 px-4 text-gray-700"><code className="bg-white/50 text-keverd-ink px-2 py-1 rounded border border-gray-200">block</code></td>
                    <td className="py-3 px-4 text-gray-700">Very high risk. Strong indicators of fraud or account takeover (e.g., SIM swap, multiple device changes, suspicious behavior).</td>
                    <td className="py-3 px-4 text-gray-700">Block the request and flag for manual review. Consider account lockout and user notification.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Reasons */}
          <div>
            <h3 className="font-semibold text-keverd-ink mb-3 text-lg">Risk Reasons</h3>
            <p className="text-gray-600 text-sm mb-4">
              The <code className="bg-gray-100 px-1 rounded">reason</code> array contains strings explaining why a particular risk score was assigned. Common reasons include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Profile Reasons</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li><code className="bg-gray-200 px-1 rounded">new_user_profile</code> - First time seeing this user</li>
                  <li><code className="bg-gray-200 px-1 rounded">device_changed</code> - Different device than usual</li>
                  <li><code className="bg-gray-200 px-1 rounded">multiple_devices</code> - User has multiple devices</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Geographic Reasons</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li><code className="bg-gray-200 px-1 rounded">geo_jump</code> - Unusual location change</li>
                  <li><code className="bg-gray-200 px-1 rounded">vpn_detected</code> - VPN or proxy detected</li>
                  <li><code className="bg-gray-200 px-1 rounded">unusual_location</code> - Location not in user history</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Behavioral Reasons</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li><code className="bg-gray-200 px-1 rounded">behavior_anomaly</code> - Typing patterns don't match</li>
                  <li><code className="bg-gray-200 px-1 rounded">typing_speed_mismatch</code> - Typing speed differs significantly</li>
                  <li><code className="bg-gray-200 px-1 rounded">session_entropy_low</code> - Unusual interaction patterns</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">SIM Swap Reasons</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li><code className="bg-gray-200 px-1 rounded">sim_changed</code> - SIM card changed (Android only)</li>
                  <li><code className="bg-gray-200 px-1 rounded">time_anomaly</code> - Unusual timing patterns</li>
                  <li><code className="bg-gray-200 px-1 rounded">velocity_anomaly</code> - Rapid successive requests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
          </section>

          {/* Verification Endpoints */}
          <section id="verification-endpoints" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Use-Case Verification Endpoints</h2>
            <p className="text-gray-600 mb-6">
              These endpoints are optimized for specific use cases and automatically set the <code className="bg-gray-100 px-1 rounded">use_case</code> parameter. 
              They accept the same request format as <code className="bg-gray-100 px-1 rounded">/fingerprint/score</code> and return the same response format.
            </p>

            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-keverd-blue/10 text-keverd-blue rounded-full text-xs font-semibold border border-keverd-blue/20">
                    POST
                  </span>
                  <h3 className="font-semibold text-keverd-ink text-lg">/fingerprint/verify/login</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">Verify user identity during login attempts. Optimized for detecting account takeover and credential stuffing.</p>
                <p className="text-xs text-gray-600"><strong>Use Case:</strong> Automatically set to <code className="bg-gray-100 px-1 rounded">"login"</code></p>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-keverd-blue/10 text-keverd-blue rounded-full text-xs font-semibold border border-keverd-blue/20">
                    POST
                  </span>
                  <h3 className="font-semibold text-keverd-ink text-lg">/fingerprint/verify/checkout</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">Verify user during checkout/payment flows. Detects payment fraud and stolen card usage.</p>
                <p className="text-xs text-gray-600"><strong>Use Case:</strong> Automatically set to <code className="bg-gray-100 px-1 rounded">"checkout"</code></p>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-keverd-blue/10 text-keverd-blue rounded-full text-xs font-semibold border border-keverd-blue/20">
                    POST
                  </span>
                  <h3 className="font-semibold text-keverd-ink text-lg">/fingerprint/verify/registration</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">Verify new account registrations. Detects bot signups and fake accounts.</p>
                <p className="text-xs text-gray-600"><strong>Use Case:</strong> Automatically set to <code className="bg-gray-100 px-1 rounded">"registration"</code></p>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-keverd-blue/10 text-keverd-blue rounded-full text-xs font-semibold border border-keverd-blue/20">
                    POST
                  </span>
                  <h3 className="font-semibold text-keverd-ink text-lg">/fingerprint/verify/password-reset</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">Verify password reset requests. High-risk use case requiring enhanced security checks.</p>
                <p className="text-xs text-gray-600"><strong>Use Case:</strong> Automatically set to <code className="bg-gray-100 px-1 rounded">"password_reset"</code></p>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-keverd-blue/10 text-keverd-blue rounded-full text-xs font-semibold border border-keverd-blue/20">
                    POST
                  </span>
                  <h3 className="font-semibold text-keverd-ink text-lg">/fingerprint/verify/account-change</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">Verify account modification requests (email change, phone change, etc.).</p>
                <p className="text-xs text-gray-600"><strong>Use Case:</strong> Automatically set to <code className="bg-gray-100 px-1 rounded">"account_change"</code></p>
              </div>
            </div>
          </section>

          {/* Registration Behavioral Monitoring */}
          <section id="registration-behavioral-monitoring" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Registration Behavioral Monitoring</h2>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Overview</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The registration verification endpoint provides <strong>continuous behavioral monitoring</strong> from the moment a user starts the registration process. This enables real-time detection of bot signups, behavior changes, and suspicious patterns.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Key Features:</p>
                  <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
                    <li><strong>Automatic Baseline:</strong> SDK automatically establishes behavioral baseline from first interactions</li>
                    <li><strong>Mid-Session Detection:</strong> Detects behavior changes within a single registration session</li>
                    <li><strong>Enhanced Bot Detection:</strong> Identifies bots, automation, uniform patterns, and non-human behavior</li>
                    <li><strong>Adaptive Responses:</strong> Recommends MFA, CAPTCHA, or custom flows based on real-time risk</li>
                    <li><strong>Comprehensive Data Collection:</strong> Automatically collects mouse, keyboard, page, and form interactions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">How It Works</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The SDK automatically collects comprehensive behavioral data from the moment it's initialized. No manual data collection is required - everything happens automatically in the background.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-keverd-blue pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">1. Automatic Data Collection</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      When you initialize the SDK, it immediately starts collecting behavioral data automatically:
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc mb-3">
                      <li><strong>Mouse movements:</strong> Velocity, acceleration, click patterns, movement distance</li>
                      <li><strong>Keyboard patterns:</strong> Typing speed, dwell time (key hold duration), flight time (time between keys)</li>
                      <li><strong>Page interactions:</strong> Clicks, scrolls, time on page, scroll depth</li>
                      <li><strong>Form interactions:</strong> Focus events, copy/paste detection, autofill detection, field focus order</li>
                      <li><strong>Privacy signals:</strong> Incognito mode, VPN detection, automation detection, ad blocker</li>
                    </ul>
                    <CodeSnippet
                      code={String.raw`// Initialize SDK early (e.g., on page load)
import { Keverd } from '@keverdjs/fraud-sdk';

// SDK automatically starts collecting data
Keverd.init('your-api-key');

// No additional setup required - data collection happens automatically`}
                      language="javascript"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      <Info className="inline mr-1" size={12} />
                      The SDK establishes a behavioral baseline automatically from the first interactions. This baseline is used to detect behavior changes during registration.
                    </p>
                  </div>

                  <div className="border-l-4 border-keverd-blue pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">2. Registration Verification</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      Call the registration verification endpoint when the user submits the registration form. The SDK automatically includes all collected behavioral data.
                    </p>
                    <CodeSnippet
                      code={String.raw`// JavaScript SDK - Complete registration flow
import { Keverd } from '@keverdjs/fraud-sdk';

// Initialize early (e.g., in your app entry point)
Keverd.init('your-api-key');

// Later, when user submits registration form
async function handleRegistrationSubmit(formData) {
  // Verify registration - SDK automatically includes all collected data
  const result = await Keverd.verifyRegistration({
    email: formData.email,
    username: formData.username
  });
  
  // Handle response based on risk level
  if (result.action === 'allow') {
    // Low risk - proceed with registration
    await createUserAccount(formData);
  } else if (result.action === 'soft_challenge') {
    // Medium risk - show recommended challenges
    const challenges = result.adaptive_response?.challenges || [];
    if (challenges.includes('captcha')) {
      await showCaptcha();
    }
    if (challenges.includes('mfa')) {
      await sendEmailVerification(formData.email);
    }
  } else if (result.action === 'block') {
    // High risk - block registration
    showError('Registration blocked due to security concerns');
  }
}

// React SDK
import { useKeverdContext } from '@keverdjs/fraud-sdk-react';

function RegistrationForm() {
  const { verifyRegistration } = useKeverdContext();
  
  const handleSubmit = async (formData) => {
    const result = await verifyRegistration({
      email: formData.email,
      username: formData.username
    });
    // Handle result...
  };
}`}
                      language="javascript"
                    />
                  </div>

                  <div className="border-l-4 border-keverd-blue pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">3. Session Management</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      The SDK automatically maintains a session ID that links all events together. Session continuity is maintained throughout the registration flow without any manual intervention.
                    </p>
                    <CodeSnippet
                      code={String.raw`// Session is automatically managed by SDK
// All events in the same session are linked
// Session persists from SDK init to page unload
// No manual session management required`}
                      language="javascript"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Data Automatically Collected</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The SDK automatically collects all the following data - you don't need to manually send anything:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Device Information</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Screen resolution</li>
                      <li>• Timezone</li>
                      <li>• Language/locale</li>
                      <li>• User agent</li>
                      <li>• Device fingerprint</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Mouse Signals</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Click count</li>
                      <li>• Movement distance</li>
                      <li>• Average velocity</li>
                      <li>• Movement patterns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Keyboard Signals</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Typing speed</li>
                      <li>• Keydown count</li>
                      <li>• Dwell time (key hold)</li>
                      <li>• Flight time (between keys)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Page Interactions</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Click count</li>
                      <li>• Scroll depth</li>
                      <li>• Time to first interaction</li>
                      <li>• Time on page</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Form Interactions</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Focus/blur events</li>
                      <li>• Copy/paste detection</li>
                      <li>• Autofill detection</li>
                      <li>• Field focus order</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Privacy Signals</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Incognito mode</li>
                      <li>• VPN/proxy detection</li>
                      <li>• Automation detection</li>
                      <li>• Ad blocker detection</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-green-900 mb-1">
                    <Info className="inline mr-1" size={12} />
                    All data collection is automatic
                  </p>
                  <p className="text-xs text-green-800">
                    You don't need to manually collect or send any of this data. The SDK handles everything automatically when you call <code className="bg-green-100 px-1 rounded">verifyRegistration()</code>.
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Response Format</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The registration verification endpoint returns enhanced response data including behavioral analysis:
                </p>
                <CodeSnippet
                  code={String.raw`{
  "risk_score": 45,
  "action": "soft_challenge",
  "reason": [
    "behavior_shift_detected",
    "typing_speed_changed",
    "uniform_typing_pattern"
  ],
  "session_id": "session-uuid",
  "request_id": "request-uuid",
  "score": 0.45,
  
  // Behavioral change analysis
  "behavior_change": {
    "baseline_available": true,
    "behavior_changed": true,
    "change_score": 35.5,
    "change_reasons": [
      "typing_speed_changed",
      "mouse_pattern_changed"
    ],
    "similarity_score": 62.3
  },
  
  // Adaptive response recommendations
  "adaptive_response": {
    "recommended_action": "soft_challenge",
    "challenges": ["mfa", "captcha"],
    "reason": "Behavior change detected during registration",
    "confidence": 0.85
  }
}`}
                  language="json"
                />
              </div>
            </div>
          </section>

          {/* Adaptive Responses */}
          <section id="adaptive-responses" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Adaptive Responses</h2>
            
            <div className="space-y-6">
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Understanding Adaptive Responses</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Based on real-time risk assessment and behavioral analysis, the API recommends specific actions to take. You should implement these recommendations to create an adaptive registration flow.
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">Allow (Low Risk)</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <code className="bg-gray-100 px-1 rounded">action: "allow"</code> - Registration appears legitimate. Proceed with account creation.
                    </p>
                    <CodeSnippet
                      code={String.raw`if (result.action === "allow") {
  // Proceed with registration
  await createUserAccount(userData);
}`}
                      language="javascript"
                    />
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">Soft Challenge (Medium Risk)</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <code className="bg-gray-100 px-1 rounded">action: "soft_challenge"</code> - Some suspicious signals detected. Require additional verification.
                    </p>
                    <CodeSnippet
                      code={String.raw`if (result.action === "soft_challenge") {
  // Check adaptive_response for recommended challenges
  const challenges = result.adaptive_response?.challenges || [];
  
  if (challenges.includes("captcha")) {
    // Show CAPTCHA
    await showCaptcha();
  }
  
  if (challenges.includes("mfa")) {
    // Request email/SMS verification
    await sendVerificationCode(userEmail);
  }
  
  // After challenge completion, verify again
  const recheck = await keverd.verifyRegistration();
  if (recheck.action === "allow") {
    await createUserAccount(userData);
  }
}`}
                      language="javascript"
                    />
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">Hard Challenge (High Risk)</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <code className="bg-gray-100 px-1 rounded">action: "hard_challenge"</code> - Multiple suspicious signals. Require strong verification.
                    </p>
                    <CodeSnippet
                      code={String.raw`if (result.action === "hard_challenge") {
  // Require multiple verification steps
  await showCaptcha();
  await sendVerificationCode(userEmail);
  await sendVerificationCode(userPhone);
  
  // Verify all challenges passed
  const allVerified = await verifyAllChallenges();
  if (allVerified) {
    const recheck = await keverd.verifyRegistration();
    if (recheck.action === "allow") {
      await createUserAccount(userData);
    }
  }
}`}
                      language="javascript"
                    />
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">Block (Very High Risk)</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <code className="bg-gray-100 px-1 rounded">action: "block"</code> - Clear bot or fraud indicators. Block registration.
                    </p>
                    <CodeSnippet
                      code={String.raw`if (result.action === "block") {
  // Block registration
  showError("Registration blocked due to security concerns");
  // Optionally log for review
  logSuspiciousRegistration(result);
}`}
                      language="javascript"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Behavior Change Indicators</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The <code className="bg-gray-100 px-1 rounded">behavior_change</code> object provides detailed information about behavioral anomalies:
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">baseline_available</p>
                    <p className="text-xs text-gray-700">Whether a behavioral baseline exists (automatically established from first interactions)</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">behavior_changed</p>
                    <p className="text-xs text-gray-700">Whether behavior deviated from baseline during the session</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">change_score</p>
                    <p className="text-xs text-gray-700">0-100 score indicating severity of behavior change (higher = more suspicious)</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">similarity_score</p>
                    <p className="text-xs text-gray-700">0-100 percentage similarity to baseline (higher = more similar, lower = more suspicious)</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-keverd-ink mb-1">change_reasons</p>
                    <p className="text-xs text-gray-700">List of specific reasons for behavior change (e.g., "typing_speed_changed", "mouse_pattern_changed")</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4">Complete Integration Example</h3>
                <CodeSnippet
                  code={String.raw`// React example
import { useKeverdContext } from '@keverdjs/fraud-sdk-react';

function RegistrationForm() {
  const { verifyRegistration } = useKeverdContext();
  const [step, setStep] = useState('form');
  
  const handleSubmit = async (formData) => {
    try {
      // Verify registration with behavioral monitoring
      const result = await verifyRegistration({
        email: formData.email,
        username: formData.username
      });
      
      // Check risk level
      if (result.action === "block") {
        // Block registration
        showError("Registration blocked. Please contact support.");
        return;
      }
      
      if (result.action === "hard_challenge") {
        // Require multiple verifications
        setStep('challenge');
        await showCaptcha();
        await sendEmailVerification(formData.email);
        await sendSMSVerification(formData.phone);
        return;
      }
      
      if (result.action === "soft_challenge") {
        // Check recommended challenges
        const challenges = result.adaptive_response?.challenges || [];
        
        if (challenges.includes("captcha")) {
          await showCaptcha();
        }
        
        if (challenges.includes("mfa")) {
          await sendEmailVerification(formData.email);
        }
        
        // Re-verify after challenges
        const recheck = await verifyRegistration();
        if (recheck.action !== "allow") {
          showError("Verification failed. Please try again.");
          return;
        }
      }
      
      // Behavior change detected?
      if (result.behavior_change?.behavior_changed) {
        console.warn("Behavior change detected:", result.behavior_change.change_reasons);
        // Log for review or require additional verification
        if (result.behavior_change.change_score > 50) {
          await sendEmailVerification(formData.email);
        }
      }
      
      // Proceed with registration
      await createUserAccount(formData);
      showSuccess("Account created successfully!");
      
    } catch (error) {
      console.error("Registration verification failed:", error);
      showError("Registration failed. Please try again.");
    }
  };
  
  return (
    // Your registration form JSX
  );
}`}
                  language="javascript"
                />
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Use Case Integration Examples</h2>
            
            <div className="space-y-8">
              {/* Registration Use Case */}
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Registration Flow</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Complete registration flow with behavioral monitoring, bot detection, and adaptive challenges.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">Vanilla JavaScript</h4>
                    <CodeSnippet
                      code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

// 1. Initialize SDK early (e.g., in your app entry point)
Keverd.init('your-api-key');

// 2. Registration form handler
async function handleRegistrationSubmit(formData) {
  try {
    // Verify registration - SDK automatically includes all collected data
    const result = await Keverd.verifyRegistration({
      email: formData.email,
      username: formData.username
    });
    
    // Handle based on risk level
    if (result.action === 'block') {
      // High risk - block registration
      showError('Registration blocked due to security concerns');
      logSecurityEvent('blocked_registration', result);
      return;
    }
    
    if (result.action === 'hard_challenge') {
      // High risk - require multiple verifications
      await showCaptcha();
      await sendEmailVerification(formData.email);
      await sendSMSVerification(formData.phone);
      
      // Re-verify after challenges
      const recheck = await Keverd.verifyRegistration();
      if (recheck.action !== 'allow') {
        showError('Verification failed. Please contact support.');
        return;
      }
    }
    
    if (result.action === 'soft_challenge') {
      // Medium risk - show recommended challenges
      const challenges = result.adaptive_response?.challenges || [];
      
      if (challenges.includes('captcha')) {
        const captchaValid = await showCaptcha();
        if (!captchaValid) {
          showError('CAPTCHA verification failed');
          return;
        }
      }
      
      if (challenges.includes('mfa')) {
        await sendEmailVerification(formData.email);
      }
      
      // Re-verify after challenges
      const recheck = await Keverd.verifyRegistration();
      if (recheck.action !== 'allow') {
        showError('Verification failed. Please try again.');
        return;
      }
    }
    
    // Check for behavior changes
    if (result.behavior_change?.behavior_changed) {
      console.warn('Behavior change detected:', result.behavior_change.change_reasons);
      // Log for review or require additional verification
      if (result.behavior_change.change_score > 50) {
        await sendEmailVerification(formData.email);
      }
    }
    
    // All checks passed - create account
    const account = await createUserAccount(formData);
    showSuccess('Account created successfully!');
    return account;
    
  } catch (error) {
    console.error('Registration verification failed:', error);
    showError('Registration failed. Please try again.');
  }
}`}
                      language="javascript"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">React</h4>
                    <CodeSnippet
                      code={String.raw`import { useKeverdContext } from '@keverdjs/fraud-sdk-react';

function RegistrationForm() {
  const { verifyRegistration } = useKeverdContext();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value
    };
    
    try {
      const result = await verifyRegistration({
        email: formData.email,
        username: formData.username
      });
      
      if (result.action === 'block') {
        setError('Registration blocked. Please contact support.');
        return;
      }
      
      if (result.action === 'soft_challenge' || result.action === 'hard_challenge') {
        const challenges = result.adaptive_response?.challenges || [];
        
        // Show challenges based on recommendations
        if (challenges.includes('captcha')) {
          await showCaptcha();
        }
        if (challenges.includes('mfa')) {
          await sendEmailVerification(formData.email);
        }
        
        // Re-verify
        const recheck = await verifyRegistration();
        if (recheck.action !== 'allow') {
          setError('Verification failed.');
          return;
        }
      }
      
      // Create account
      await createAccount(formData);
      router.push('/dashboard');
      
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
}`}
                      language="javascript"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-keverd-ink mb-2">Vue.js</h4>
                    <CodeSnippet
                      code={String.raw`<script setup>
import { useKeverdProvider } from '@keverdjs/fraud-sdk-vue';

const { verifyRegistration } = useKeverdProvider();
const loading = ref(false);
const error = ref(null);

const handleSubmit = async (formData) => {
  loading.value = true;
  error.value = null;
  
  try {
    const result = await verifyRegistration({
      email: formData.email,
      username: formData.username
    });
    
    if (result.action === 'block') {
      error.value = 'Registration blocked. Please contact support.';
      return;
    }
    
    if (result.action !== 'allow') {
      const challenges = result.adaptive_response?.challenges || [];
      // Handle challenges...
    }
    
    await createAccount(formData);
    router.push('/dashboard');
    
  } catch (err) {
    error.value = 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>`}
                      language="javascript"
                    />
                  </div>
                </div>
              </div>

              {/* Login Use Case */}
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Login Flow</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Detect account takeover attempts and credential stuffing during login.
                </p>
                
                <CodeSnippet
                  code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

async function handleLogin(email, password) {
  try {
    // Verify login attempt
    const result = await Keverd.verifyLogin(email);
    
    if (result.action === 'block') {
      // Block login - potential account takeover
      showError('Login blocked due to security concerns');
      logSecurityEvent('blocked_login', { email, result });
      return;
    }
    
    // Proceed with authentication
    const authResult = await authenticateUser(email, password);
    
    if (!authResult.success) {
      return;
    }
    
    // If high risk, require MFA even after successful password
    if (result.action === 'hard_challenge') {
      const mfaValid = await requestMFA();
      if (!mfaValid) {
        showError('MFA verification failed');
        return;
      }
    }
    
    // Login successful
    redirectToDashboard();
    
  } catch (error) {
    console.error('Login verification failed:', error);
    showError('Login failed. Please try again.');
  }
}`}
                  language="javascript"
                />
              </div>

              {/* Checkout Use Case */}
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Checkout Flow</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Verify payment transactions and detect payment fraud.
                </p>
                
                <CodeSnippet
                  code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

async function handleCheckout(cart, paymentMethod) {
  try {
    // Verify checkout
    const result = await Keverd.verifyCheckout(
      cart.total,
      cart.currency,
      {
        paymentMethod: paymentMethod.type,
        cardLast4: paymentMethod.last4,
        items: cart.items.length
      }
    );
    
    if (result.action === 'block') {
      // Block transaction
      showError('Transaction blocked due to security concerns');
      logSecurityEvent('blocked_transaction', { amount: cart.total, result });
      return;
    }
    
    if (result.action === 'hard_challenge') {
      // Require payment verification
      const verified = await requestPayment2FA();
      if (!verified) {
        showError('Payment verification failed');
        return;
      }
    }
    
    // Proceed with payment
    const paymentResult = await processPayment(cart, paymentMethod);
    if (paymentResult.success) {
      showSuccess('Payment processed successfully!');
    }
    
  } catch (error) {
    console.error('Checkout verification failed:', error);
    showError('Payment failed. Please try again.');
  }
}`}
                  language="javascript"
                />
              </div>

              {/* Password Reset Use Case */}
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Password Reset Flow</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Detect account takeover attempts during password reset requests.
                </p>
                
                <CodeSnippet
                  code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

async function handlePasswordReset(email) {
  try {
    // Verify password reset request
    const result = await Keverd.verifyPasswordReset(email);
    
    if (result.action === 'block') {
      // Block password reset - potential account takeover
      showError('Password reset blocked. Please contact support.');
      logSecurityEvent('blocked_password_reset', { email, result });
      return;
    }
    
    if (result.action === 'hard_challenge') {
      // Require additional verification
      const verified = await sendVerificationCode(email);
      if (!verified) {
        showError('Verification failed');
        return;
      }
    }
    
    // Send password reset email
    await sendPasswordResetEmail(email);
    showSuccess('Password reset email sent!');
    
  } catch (error) {
    console.error('Password reset verification failed:', error);
    showError('Password reset failed. Please try again.');
  }
}`}
                  language="javascript"
                />
              </div>

              {/* Account Change Use Case */}
              <div className="bg-white/50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-keverd-ink mb-4 text-lg">Account Change Flow</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Verify sensitive account modifications (email, phone, password changes).
                </p>
                
                <CodeSnippet
                  code={String.raw`import { Keverd } from '@keverdjs/fraud-sdk';

async function handleEmailChange(currentEmail, newEmail) {
  try {
    // Verify account change
    const result = await Keverd.verifyAccountChange('email', {
      oldEmail: currentEmail,
      newEmail: newEmail
    });
    
    if (result.action === 'block') {
      showError('Email change blocked. Please contact support.');
      return;
    }
    
    if (result.action === 'hard_challenge') {
      // Require verification from both emails
      await sendVerificationCode(currentEmail);
      await sendVerificationCode(newEmail);
      
      const bothVerified = await verifyBothCodes();
      if (!bothVerified) {
        showError('Verification failed');
        return;
      }
    }
    
    // Proceed with email change
    await updateUserEmail(newEmail);
    showSuccess('Email updated successfully!');
    
  } catch (error) {
    console.error('Account change verification failed:', error);
    showError('Email change failed. Please try again.');
  }
}`}
                  language="javascript"
                />
              </div>
            </div>
          </section>

          {/* Login Protection Guide */}
          <section id="login-protection" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-4">Login Protection</h2>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              The <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">/fingerprint/verify/login</code> endpoint is designed
              to protect your login flows against account takeover (ATO), credential stuffing, and session hijacking.
              It combines device fingerprinting, behavioral analysis, and login history signals to produce a
              <strong> login-specific risk score</strong>, <strong>device reputation</strong>, and
              <strong> adaptive response</strong>.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-keverd-ink mb-2 text-lg">Request Schema (high level)</h3>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  The endpoint accepts the same fingerprint payload as <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">/fingerprint/score</code>,
                  plus an optional <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">login</code> object for structured context:
                </p>
                <CodeSnippet
                  code={String.raw`POST https://api.keverd.com/fingerprint/verify/login
Content-Type: application/json
x-keverd-key: your-api-key

{
  // Standard fingerprint payload (device, session, behavioral, etc.)
  "device": { ... },
  "session": { "sessionId": "session_123", "timestamp": "..." },
  "behavioral": { ... },
  "privacySignals": { ... },

  // Optional, but strongly recommended:
  "login": {
    "identifier_hash": "sha256:9f2b...",
    "result": "success" | "failure",
    "failure_reason": "wrong_password" | "locked_out" | null,
    "auth_method": "password" | "password_otp" | "sso" | "magic_link" | "passkey" | "unknown",
    "mfa_used": true | false | null,
    "attempt_id": "your-login-attempt-id"
  }
}`}
                  language="http"
                />
                <p className="text-xs text-gray-600 mt-2">
                  The SDKs handle the fingerprint payload automatically. You only need to supply the
                  <code className="bg-gray-100 px-1 rounded text-[11px] border border-gray-200">login</code> context (or flat fields like
                  <code className="bg-gray-100 px-1 rounded text-[11px] border border-gray-200">login_identifier_hash</code>) where relevant.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-keverd-ink mb-2 text-lg">Response Highlights</h3>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  In addition to the standard <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">FingerprintResponse</code> fields,
                  login verification enriches the response with:
                </p>
                <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
                  <li>
                    <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">device_match?: boolean</code> – whether this device has
                    been seen on <em>successful</em> logins for this identifier before.
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">behavior_change?: ...</code> – when a baseline exists,
                    indicates mid-session behavior drift versus the user's normal profile.
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded text-xs border border-gray-200">adaptive_response?: {"{ recommended_action, challenges[] }"}</code> –
                    login-specific recommended action (<code>allow</code> / <code>soft_challenge</code> /
                    <code>hard_challenge</code> / <code>block</code>) and suggested challenges such as
                    <code>["mfa","captcha","reenter_password"]</code>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Backend Integration Examples for Login */}
          <section id="login-backend-examples" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-4">Backend Integration Examples (Login)</h2>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              These examples show how to wire Keverd's login verification into your backend flows using the
              <strong> identifier hash</strong> and <strong>adaptive responses</strong> to drive step-up authentication.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-keverd-ink mb-2 text-base">
                  Node / Express (email + password)
                </h3>
                <CodeSnippet
                  code={String.raw`import crypto from "crypto";
import fetch from "node-fetch";

function hashIdentifier(email) {
  const hex = crypto.createHash("sha256").update(email.toLowerCase()).digest("hex");
  return \`sha256:\${hex}\`;
}

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1) Pre-check with Keverd (optional, no result yet)
  const identifierHash = hashIdentifier(email);

  // 2) Perform your normal authentication
  const authResult = await authenticateUser(email, password); // your function

  const loginResult = authResult.success ? "success" : "failure";
  const failureReason = authResult.success ? null : "wrong_password";

  // 3) Call Keverd verifyLogin with structured login context
  const response = await fetch("https://api.keverd.com/fingerprint/verify/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-keverd-key": process.env.KEVERD_API_KEY,
    },
    body: JSON.stringify({
      // SDKs will send device/session/behavioral; if calling directly, include them here.
      login: {
        identifier_hash: identifierHash,
        result: loginResult,
        failure_reason: failureReason,
        auth_method: "password",
        mfa_used: false,
        attempt_id: authResult.attemptId,
      },
    }),
  });

  const verify = await response.json();

  // 4) Map adaptive_response to your auth UX
  if (verify.recommended_action === "block") {
    return res.status(403).json({ error: "Login blocked for security reasons." });
  }

  if (verify.recommended_action === "hard_challenge") {
    // Enforce strong MFA before issuing session
    return res.status(202).json({ challenge: "mfa_required", verify });
  }

  if (!authResult.success) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // success + allow / soft_challenge
  return res.status(200).json({ user: authResult.user, risk: verify });
});`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="font-semibold text-keverd-ink mb-2 text-base">
                  Next.js / NextAuth-style flow (conceptual)
                </h3>
                <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                  In NextAuth or similar auth frameworks, you typically hook into the credential provider's
                  <code className="bg-gray-100 px-1 rounded text-[11px] border border-gray-200">authorize</code> callback,
                  call <code className="bg-gray-100 px-1 rounded text-[11px] border border-gray-200">verifyLogin</code>,
                  and then decide whether to continue or require step-up authentication.
                </p>
                <CodeSnippet
                  code={String.raw`// Pseudocode: inside NextAuth credentials provider
async authorize(credentials, req) {
  const { email, password } = credentials;
  const identifierHash = await hashLoginIdentifier(email); // use Keverd helper on frontend or backend

  const authResult = await authenticateUser(email, password);

  const verify = await keverdVerifyLogin({
    login: {
      identifier_hash: identifierHash,
      result: authResult.success ? "success" : "failure",
      auth_method: "password",
      mfa_used: false,
      attempt_id: authResult.attemptId,
    },
  });

  if (verify.recommended_action === "block") return null;
  if (!authResult.success) return null;

  // Optionally store verify.recommended_action / behavior_change in session for UI
  return { id: authResult.user.id, email, keverd: verify };
}`}
                  language="typescript"
                />
              </div>
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Error Handling</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-keverd-ink mb-3">HTTP Status Codes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Status Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Meaning</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Response Body</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">200</td>
                    <td className="py-3 px-4 text-gray-700">Success</td>
                    <td className="py-3 px-4 text-gray-700">FingerprintScoreResponse object</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">400</td>
                    <td className="py-3 px-4 text-gray-700">Bad Request</td>
                    <td className="py-3 px-4 text-gray-700">Error message describing invalid request format or missing required fields</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">401</td>
                    <td className="py-3 px-4 text-gray-700">Unauthorized</td>
                    <td className="py-3 px-4 text-gray-700">Invalid or missing API key</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">403</td>
                    <td className="py-3 px-4 text-gray-700">Forbidden</td>
                    <td className="py-3 px-4 text-gray-700">API key inactive or insufficient permissions</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">429</td>
                    <td className="py-3 px-4 text-gray-700">Too Many Requests</td>
                    <td className="py-3 px-4 text-gray-700">Rate limit exceeded. Check Retry-After header</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">500</td>
                    <td className="py-3 px-4 text-gray-700">Internal Server Error</td>
                    <td className="py-3 px-4 text-gray-700">Server error. Retry request after a delay</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-3">Error Response Format</h3>
            <CodeSnippet
              code={String.raw`{
  "detail": "Error message describing what went wrong",
  "error_code": "ERROR_CODE",
  "status_code": 400
}`}
              language="json"
            />
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-3">Common Error Codes</h3>
            <div className="space-y-2">
              <div className="flex gap-3 p-3 bg-white/50 border border-gray-200 rounded-lg">
                <AlertCircle className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-sm text-keverd-ink mb-1">INVALID_API_KEY</h4>
                  <p className="text-xs text-gray-700">The provided API key is invalid or has been revoked.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-white/50 border border-gray-200 rounded-lg">
                <AlertCircle className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-sm text-keverd-ink mb-1">MISSING_DEVICE_INFO</h4>
                  <p className="text-xs text-gray-700">Required device information is missing from the request.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-white/50 border border-gray-200 rounded-lg">
                <AlertCircle className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-sm text-keverd-ink mb-1">RATE_LIMIT_EXCEEDED</h4>
                  <p className="text-xs text-gray-700">Too many requests. Rate limit is 100 requests per second per API key.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-white/50 border border-gray-200 rounded-lg">
                <AlertCircle className="text-keverd-blue flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-sm text-keverd-ink mb-1">INVALID_FINGERPRINT</h4>
                  <p className="text-xs text-gray-700">Device fingerprint format is invalid. Must be SHA-256 hash (64 hex characters).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Authentication</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            All API requests require authentication using an API key. You can obtain your API key from the{" "}
            <Link href="/api-keys" className="text-keverd-blue hover:underline">API Keys page</Link> in the dashboard.
          </p>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Header Format</h3>
            <p className="text-gray-600 text-sm mb-3">
              Include your API key in the request headers. The API accepts multiple header formats for compatibility:
            </p>
            <CodeSnippet
              code={String.raw`# Recommended format
x-keverd-key: your-api-key-here

# Alternative formats (also supported)
X-API-KEY: your-api-key-here
Authorization: Bearer your-api-key-here`}
              language="http"
            />
          </div>

          <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
            <div className="flex gap-2">
              <AlertCircle className="text-keverd-blue flex-shrink-0" size={18} />
              <p className="text-sm text-gray-700">
                <strong>Security Note:</strong> Never expose your API key in client-side code or commit it to version control. 
                Always use environment variables or secure configuration management.
              </p>
            </div>
          </div>
        </div>
          </section>

          {/* Rate Limiting */}
          <section id="rate-limiting" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Rate Limiting</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Rate Limits</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span><strong>Per API Key:</strong> 100 requests per second</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span><strong>Per User ID:</strong> 100 requests per second (additional limit)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span><strong>Sandbox Environment:</strong> 10 requests per second</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Rate Limit Headers</h3>
            <p className="text-gray-600 text-sm mb-3">
              When rate limits are approached or exceeded, the API includes the following headers:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Header</th>
                    <th className="text-left py-3 px-4 font-semibold text-keverd-ink">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">X-RateLimit-Limit</td>
                    <td className="py-3 px-4 text-gray-700">Maximum number of requests allowed per window</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">X-RateLimit-Remaining</td>
                    <td className="py-3 px-4 text-gray-700">Number of requests remaining in current window</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">X-RateLimit-Reset</td>
                    <td className="py-3 px-4 text-gray-700">Unix timestamp when rate limit resets</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-mono text-sm text-keverd-ink">Retry-After</td>
                    <td className="py-3 px-4 text-gray-700">Seconds to wait before retrying (only on 429 responses)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
            <div className="flex gap-2">
              <Info className="text-keverd-blue flex-shrink-0" size={18} />
              <p className="text-sm text-gray-700">
                <strong>Best Practice:</strong> Implement exponential backoff when receiving 429 responses. 
                Start with a 1-second delay and double it for each subsequent retry, up to a maximum of 60 seconds.
              </p>
            </div>
          </div>
        </div>
          </section>

          {/* Code Examples */}
          <section id="code-examples" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Code Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">cURL Example</h3>
            <CodeSnippet
              code={String.raw`curl -X POST https://api.keverd.com/fingerprint/score \
  -H "Content-Type: application/json" \
  -H "x-keverd-key: your-api-key-here" \
  -d '{
    "userId": "user123",
    "device": {
      "deviceId": "abc123",
      "fingerprint": "sha256_hash_64_chars...",
      "timezone": "America/New_York"
    },
    "behavioral": {
      "typing_dwell_ms": [120.5, 135.2, 110.8],
      "typing_flight_ms": [45.2, 50.1, 42.3],
      "swipe_velocity": 2.5,
      "session_entropy": 3.8
    }
  }'`}
              language="bash"
            />
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">JavaScript/Fetch Example</h3>
            <CodeSnippet
              code={String.raw`const response = await fetch('https://api.keverd.com/fingerprint/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-keverd-key': 'your-api-key-here'
  },
  body: JSON.stringify({
    userId: 'user123',
    device: {
      deviceId: 'abc123',
      fingerprint: 'sha256_hash...',
      timezone: 'America/New_York'
    },
    behavioral: {
      typing_dwell_ms: [120.5, 135.2, 110.8],
      typing_flight_ms: [45.2, 50.1, 42.3],
      swipe_velocity: 2.5,
      session_entropy: 3.8
    }
  })
});

const data = await response.json();
console.log('Risk Score:', data.risk_score);
console.log('Action:', data.action);`}
              language="javascript"
            />
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Python Example</h3>
            <CodeSnippet
              code={String.raw`import requests

url = "https://api.keverd.com/fingerprint/score"
headers = {
    "Content-Type": "application/json",
    "x-keverd-key": "your-api-key-here"
}
payload = {
    "userId": "user123",
    "device": {
        "deviceId": "abc123",
        "fingerprint": "sha256_hash...",
        "timezone": "America/New_York"
    },
    "behavioral": {
        "typing_dwell_ms": [120.5, 135.2, 110.8],
        "typing_flight_ms": [45.2, 50.1, 42.3],
        "swipe_velocity": 2.5,
        "session_entropy": 3.8
    }
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

print(f"Risk Score: {data['risk_score']}")
print(f"Action: {data['action']}")`}
              language="python"
            />
          </div>
        </div>
          </section>

          {/* Performance */}
          <section id="performance" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Performance & Latency</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Target Performance</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span><strong>p50 Latency:</strong> &lt; 50ms (median response time)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span><strong>p95 Latency:</strong> &lt; 80ms (95th percentile)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span><strong>p99 Latency:</strong> &lt; 100ms (99th percentile)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Optimization Tips</h3>
            <ul className="text-gray-600 text-sm space-y-2 ml-4">
              <li>• Use connection pooling for multiple requests</li>
              <li>• Implement request batching when possible</li>
              <li>• Cache risk scores for short periods (5-10 seconds) for repeated requests</li>
              <li>• Use async/await or non-blocking I/O for better concurrency</li>
            </ul>
          </div>
        </div>
          </section>

          {/* Data Privacy */}
          <section id="data-privacy" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
            <h2 className="section-title mb-6">Data Privacy & Compliance</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Privacy-First Design</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>All device identifiers are SHA-256 hashed client-side before transmission</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>No raw PII (Personally Identifiable Information) is stored or transmitted</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>HTTPS-only communication enforced</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>GDPR and Kenya Data Protection Act compliant</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-keverd-ink mb-2">Data Retention</h3>
            <p className="text-gray-600 text-sm">
              Fingerprint data is retained according to your subscription plan and regional compliance requirements. 
              You can request data deletion through the dashboard or API.
            </p>
          </div>
        </div>
          </section>

          {/* SDK Integration Links */}
          <section id="sdk-integration" className="mb-10 pb-10 scroll-mt-20">
            <h2 className="section-title mb-6">SDK Integration Guides</h2>
        <p className="text-gray-600 mb-4">
          For easier integration, use one of our official SDKs which handle all the API details for you:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link href="/docs/android">
            <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-keverd-blue transition-colors text-center">
              <Smartphone className="text-keverd-blue mx-auto mb-2" size={24} />
              <span className="text-sm font-semibold">Android</span>
            </div>
          </Link>
          <Link href="/docs/javascript">
            <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-keverd-blue transition-colors text-center">
              <Globe className="text-keverd-blue mx-auto mb-2" size={24} />
              <span className="text-sm font-semibold">JavaScript</span>
            </div>
          </Link>
          <Link href="/docs/react">
            <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-keverd-blue transition-colors text-center">
              <Code className="text-keverd-blue mx-auto mb-2" size={24} />
              <span className="text-sm font-semibold">React</span>
            </div>
          </Link>
          <Link href="/docs/vue">
            <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-keverd-blue transition-colors text-center">
              <FileCode className="text-keverd-blue mx-auto mb-2" size={24} />
              <span className="text-sm font-semibold">Vue.js</span>
            </div>
          </Link>
          <Link href="/docs/angular">
            <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-keverd-blue transition-colors text-center">
              <FileCode className="text-keverd-blue mx-auto mb-2" size={24} />
              <span className="text-sm font-semibold">Angular</span>
            </div>
          </Link>
        </div>
          </section>
        </main>
      </div>
    </>
  );
}

