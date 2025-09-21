/**
 * SEO Configuration and utilities for Henry Kobutra's portfolio
 * Centralized configuration for metadata, structured data, and SEO best practices
 */

export const seoConfig = {
  // Basic site information
  siteName: "Henry Kobutra",
  siteUrl: "https://kobutra.com",
  defaultTitle: "Henry Kobutra - CTO & Co-founder | Full-Stack Technology Leader",
  defaultDescription: "Henry Kobutra - CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
  
  // Author information
  author: {
    name: "Henry Kobutra",
    alternateName: "Varit Kobutra",
    email: "henry@henrykobutra.com",
    twitter: "@henrykobutra",
    linkedin: "henrykobutra",
    github: "henrykobutra",
    youtube: "@henrykobutra"
  },

  // Core keywords for the site
  keywords: [
    "Henry Kobutra",
    "CTO",
    "Co-founder", 
    "Redii",
    "Full-stack developer",
    "Technical leadership",
    "Fintech",
    "AI/ML",
    "Digital transformation",
    "Python",
    "JavaScript",
    "AWS",
    "Cybersecurity",
    "Cross-cultural leadership",
    "Remote work",
    "Technology consultant",
    "Software architect",
    "Varit Kobutra",
    "Thai developer",
    "Multilingual developer",
    "International tech leader"
  ],

  // Open Graph images
  images: {
    ogImage: "/images/og/henry-kobutra-og.jpg",
    twitterImage: "/images/og/henry-kobutra-twitter.jpg",
    logo: "/images/common/h-logo-orange-glass.png"
  },

  // Social media links
  social: {
    linkedin: "https://linkedin.com/in/henrykobutra",
    github: "https://github.com/henrykobutra", 
    youtube: "https://youtube.com/@henrykobutra",
    twitter: "https://twitter.com/henrykobutra"
  }
};

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}) {
  const fullTitle = title 
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;
  
  const fullDescription = description || seoConfig.defaultDescription;
  const fullUrl = `${seoConfig.siteUrl}${path}`;
  const ogImage = image || seoConfig.images.ogImage;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author.name }],
    creator: seoConfig.author.name,
    publisher: seoConfig.author.name,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US", 
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: seoConfig.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: seoConfig.author.twitter,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${seoConfig.siteUrl}${item.url}`
    }))
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
