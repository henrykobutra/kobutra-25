/**
 * Organization Schema component for Henry Kobutra's professional organization
 * Implements Schema.org Organization markup for personal brand and consulting services
 */
export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://kobutra.com/#organization",
    "name": "Henry Kobutra",
    "url": "https://kobutra.com",
    "logo": "https://kobutra.com/images/common/h-logo-orange-glass.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Professional Inquiries",
      "url": "https://kobutra.com#contact"
    },
    "founder": {
      "@type": "Person",
      "@id": "https://kobutra.com/#person",
      "name": "Henry Kobutra"
    },
    "description": "Personal website and consulting services for technical leadership, full-stack development, and digital transformation.",
    "knowsAbout": [
      "Technical Leadership",
      "Full-stack Development", 
      "Fintech Solutions",
      "AI/ML Implementation",
      "Digital Transformation",
      "Cybersecurity",
      "Cross-cultural Management"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  );
}
