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
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">https://app.keverd.com</code>
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
                  code={String.raw`POST https://app.keverd.com/fingerprint/score
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
              code={String.raw`curl -X POST https://app.keverd.com/fingerprint/score \
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
              code={String.raw`const response = await fetch('https://app.keverd.com/fingerprint/score', {
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

url = "https://app.keverd.com/fingerprint/score"
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

