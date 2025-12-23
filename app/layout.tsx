import type { Metadata } from "next";
import { Kumbh_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { generateMetadata as genMeta } from "./lib/seo";

const kumbhSans = Kumbh_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${kumbhSans.variable} ${inter.variable} antialiased`}
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

