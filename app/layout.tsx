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
      { url: "/images/logo.png", sizes: "any" },
    ],
    apple: [{ url: "/images/logo.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}

