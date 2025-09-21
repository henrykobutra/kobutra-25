/**
 * Website Schema component for Henry Kobutra's personal website
 * Implements Schema.org WebSite markup with search functionality and proper attribution
 */
export default function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kobutra.com/#website",
    "name": "Henry Kobutra - Personal Website",
    "url": "https://kobutra.com",
    "description": "Personal website of Henry Kobutra, CTO & Co-founder at Redii, showcasing technical leadership expertise and consulting services.",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Person",
      "@id": "https://kobutra.com/#person",
      "name": "Henry Kobutra"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kobutra.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema)
      }}
    />
  );
}
