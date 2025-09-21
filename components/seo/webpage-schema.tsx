/**
 * WebPage Schema component for enhanced page-level SEO
 * Based on Next-SEO and Schema.org WebPage specifications
 */

interface WebPageSchemaProps {
  url?: string;
  name?: string;
  description?: string;
  lastReviewed?: string;
  reviewedBy?: {
    type: string;
    name: string;
  };
}

export default function WebPageSchema({
  url = "https://kobutra.com",
  name = "Henry Kobutra - Personal Website",
  description = "Personal website of Henry Kobutra, CTO & Co-founder at Redii, showcasing technical leadership expertise and consulting services.",
  lastReviewed = new Date().toISOString(),
  reviewedBy = {
    type: "Person",
    name: "Henry Kobutra"
  }
}: WebPageSchemaProps) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    "url": url,
    "name": name,
    "description": description,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      "url": url,
      "name": "Henry Kobutra",
      "description": "Personal website of Henry Kobutra, CTO & Co-founder at Redii",
      "publisher": {
        "@type": "Person",
        "name": "Henry Kobutra"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    "about": {
      "@type": "Person",
      "name": "Henry Kobutra",
      "jobTitle": "CTO & Co-founder",
      "worksFor": {
        "@type": "Organization",
        "name": "Redii",
        "url": "https://redii.co"
      }
    },
    "author": {
      "@type": "Person",
      "name": "Henry Kobutra"
    },
    "creator": {
      "@type": "Person", 
      "name": "Henry Kobutra"
    },
    "datePublished": "2024-01-01T00:00:00+00:00",
    "dateModified": lastReviewed,
    "lastReviewed": lastReviewed,
    "reviewedBy": {
      "@type": reviewedBy.type,
      "name": reviewedBy.name
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Henry Kobutra",
      "alternateName": "Varit Kobutra",
      "jobTitle": "CTO & Co-founder",
      "description": "Technical leader with 15+ years of experience in fintech, AI/ML, and digital transformation"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": url
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(webPageSchema)
      }}
    />
  );
}
