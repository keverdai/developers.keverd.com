"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { CodeSnippet } from "../components/CodeSnippet";
import { TableOfContents } from "../components/TableOfContents";
import { StructuredData } from "../components/StructuredData";

const tableOfContents = [
  { id: "create-account", title: "1. Create an account" },
  { id: "create-keys", title: "2. Create API keys" },
  { id: "integrate", title: "3. Integrate" },
];

const linkClass =
  "text-keverd-blue font-semibold underline decoration-dotted underline-offset-4 hover:decoration-solid";

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-7 text-keverd-ink font-semibold">{n}</div>
      <div className="flex-1">
        <h2 className="section-title mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function GettingStartedPage() {
  const [platform, setPlatform] = useState<"web" | "android">("web");

  return (
    <>
      <StructuredData
        title="Keverd Quickstart"
        description="Create an account, generate Sandbox & Production API keys, and integrate Keverd in minutes."
        path="/getting-started"
        type="TechArticle"
      />

      <div className="min-h-screen bg-keverd-sand/20">
        <Navbar />

        <div className="flex max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <TableOfContents items={tableOfContents} />

          <main className="flex-1 max-w-4xl px-10 sm:px-12 lg:px-20 py-12">
            <div className="mb-8">
              <h1 className="section-title mb-3">Quickstart</h1>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                Create an account, create API keys, integrate your SDK, and get a risk score.
              </p>
            </div>

            <section id="create-account" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
              <Step n="1." title="Create an account">
                <p className="text-gray-700 leading-relaxed">
                  Use the dashboard to manage environments and API keys.
                </p>
                <div className="mt-4">
                  <Link
                    href="https://dashboard.keverd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Open dashboard
                  </Link>
                </div>
              </Step>
            </section>

            <section id="create-keys" className="mb-10 pb-10 border-b border-gray-200 scroll-mt-20">
              <Step n="2." title="Create API keys">
                <p className="text-gray-700 leading-relaxed">
                  Create two keys so you can separate testing from live traffic:
                </p>
                <ul className="mt-3 ml-5 list-disc text-gray-700 space-y-1">
                  <li>
                    <strong className="text-keverd-ink">Sandbox</strong> (dev/testing)
                  </li>
                  <li>
                    <strong className="text-keverd-ink">Production</strong> (live traffic)
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Store keys in env vars (don’t commit them).
                </p>
                <div className="mt-4">
                  <Link href="/api-keys" className={linkClass}>
                    Go to API Keys guide
                  </Link>
                </div>
              </Step>
            </section>

            <section id="integrate" className="mb-2 scroll-mt-20">
              <Step n="3." title="Integrate">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Pick your platform, paste your API key, and call the SDK. The API endpoint is fixed in the SDK.
                </p>

                <div className="mb-4 flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                  <button
                    onClick={() => setPlatform("web")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      platform === "web"
                        ? "bg-white text-keverd-ink shadow-sm"
                        : "text-gray-600 hover:text-keverd-ink"
                    }`}
                  >
                    Web
                  </button>
                  <button
                    onClick={() => setPlatform("android")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      platform === "android"
                        ? "bg-white text-keverd-ink shadow-sm"
                        : "text-gray-600 hover:text-keverd-ink"
                    }`}
                  >
                    Android
                  </button>
                </div>

                {platform === "web" && (
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-keverd-ink mb-2">Install</div>
                      <CodeSnippet code={`npm install @keverdjs/fraud-sdk`} language="bash" />
                    </div>
                    <div>
                      <div className="font-semibold text-keverd-ink mb-2">Initialize + score</div>
                      <CodeSnippet
                        code={`import { Keverd } from '@keverdjs/fraud-sdk';

Keverd.init('YOUR_API_KEY'); // Sandbox or Production key

const result = await Keverd.getVisitorData();
console.log(result.risk_score, result.action);`}
                        language="javascript"
                      />
                    </div>
                    <div className="pt-2">
                      <Link href="/docs/javascript" className={linkClass}>
                        Open Web SDK docs
                      </Link>
                    </div>
                  </div>
                )}

                {platform === "android" && (
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-keverd-ink mb-2">Install</div>
                      <CodeSnippet
                        code={`repositories {
  mavenCentral()
}

dependencies {
  implementation("com.keverd:sdk:1.0.0")
}`}
                        language="kotlin"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-keverd-ink mb-2">Initialize + submit</div>
                      <CodeSnippet
                        code={`val config = Config(
  apiKey = "YOUR_API_KEY",
  consentRequired = true
)

val sdk = KeverdFingerprint.init(context, config)
sdk.submit("user123") { result -> println(result) }`}
                        language="kotlin"
                      />
                    </div>
                    <div className="pt-2">
                      <Link href="/docs/android" className={linkClass}>
                        Open Android SDK docs
                      </Link>
                    </div>
                  </div>
                )}
              </Step>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}


