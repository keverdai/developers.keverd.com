import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { generateMetadata as genMeta } from "./lib/seo";

const manrope = Manrope({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  ...genMeta({
    title: "Keverd Developer Documentation",
    description: "Complete documentation for Keverd fraud detection SDKs - Android, Web, React, Vue, and Angular. Get started with fraud detection in minutes with our comprehensive guides, API references, and code examples.",
    path: "/",
    keywords: ["developer documentation", "SDK documentation", "API documentation", "fraud detection SDK"],
  }),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/images/logo.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

function V2Banner() {
  return (
    <a
      href="https://v2.developer.keverd.com"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-keverd-blue text-white text-center py-2.5 px-4 text-sm font-medium hover:bg-keverd-blue/90 transition-colors"
    >
      🚀 New: Check out our improved docs at v2.developer.keverd.com →
    </a>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
        style={{
          fontFamily: "var(--font-base)",
        }}
      >
        <V2Banner />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

