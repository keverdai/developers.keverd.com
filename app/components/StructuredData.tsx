"use client";

import { generateStructuredData } from "../lib/seo";

interface StructuredDataProps {
  title: string;
  description: string;
  path?: string;
  type?: "TechArticle" | "SoftwareApplication" | "WebPage";
  datePublished?: string;
  dateModified?: string;
}

export function StructuredData({
  title,
  description,
  path = "",
  type = "TechArticle",
  datePublished,
  dateModified,
}: StructuredDataProps) {
  const structuredData = generateStructuredData({
    title,
    description,
    path,
    type,
    datePublished,
    dateModified,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

