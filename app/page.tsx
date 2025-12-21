import { Metadata } from "next";
import { generateMetadata as genMeta } from "./lib/seo";
import { StructuredData } from "./components/StructuredData";
import { HomePage } from "./components/HomePage";

export const metadata: Metadata = genMeta({
  title: "Keverd Developer Documentation",
  description: "Complete documentation for Keverd fraud detection SDKs - Android, Web, React, Vue, and Angular. Get started with fraud detection in minutes with our comprehensive guides, API references, and code examples.",
  path: "/",
  keywords: ["developer documentation", "SDK documentation", "API documentation", "fraud detection SDK"],
});

export default function Home() {
  return (
    <>
      <StructuredData
        title="Keverd Developer Documentation"
        description="Complete documentation for Keverd fraud detection SDKs - Android, Web, React, Vue, and Angular."
        path="/"
        type="WebPage"
      />
      <HomePage />
    </>
  );
}
