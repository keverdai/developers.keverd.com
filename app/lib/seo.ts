import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://developers.keverd.com";
const siteName = "Keverd Developer Documentation";
const defaultDescription = "Complete documentation for Keverd fraud detection SDKs - Android, Web, React, Vue, and Angular. Get started with fraud detection in minutes.";
const defaultImage = "/images/logo.png"; // Single image for all SEO purposes

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description = defaultDescription,
  path = "",
  image = defaultImage,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords = [],
}: SEOProps): Metadata {
  const url = `${baseUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  
  const defaultKeywords = [
    "Keverd",
    "fraud detection",
    "SDK",
    "documentation",
    "API",
    "Android SDK",
    "React SDK",
    "Vue SDK",
    "Angular SDK",
    "JavaScript SDK",
    "fraud prevention",
    "risk assessment",
    "device fingerprinting",
  ];

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    authors: [{ name: "Keverd" }],
    creator: "Keverd",
    publisher: "Keverd",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: `${title} | ${siteName}`,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [imageUrl],
      creator: "@keverd",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
}

export function generateStructuredData({
  title,
  description,
  path = "",
  type = "TechArticle",
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "TechArticle" | "SoftwareApplication" | "WebPage";
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${baseUrl}${path}`;
  
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "Keverd",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}${defaultImage}`,
      },
    },
  };

  if (type === "TechArticle") {
    return {
      ...baseData,
      "@type": "TechArticle",
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
      author: {
        "@type": "Organization",
        name: "Keverd",
      },
    };
  }

  if (type === "SoftwareApplication") {
    return {
      ...baseData,
      "@type": "SoftwareApplication",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    };
  }

  return baseData;
}

