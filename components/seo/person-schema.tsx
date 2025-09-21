import { educationalCredentials, professionalCertifications, languageSkills, alumniInstitutions } from '@/lib/seo/credentials-data';

/**
 * Person Schema component for Henry Kobutra's professional profile
 * Implements Schema.org Person markup with comprehensive credentials and professional information
 */
export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://kobutra.com/#person",
    "name": "Henry Kobutra",
    "alternateName": "Varit Kobutra",
    "url": "https://kobutra.com",
    "image": "https://kobutra.com/images/photos/henry_making_youtube.jpg",
    "sameAs": [
      "https://linkedin.com/in/henrykobutra",
      "https://github.com/henrykobutra",
      "https://youtube.com/@henrykobutra",
      "https://twitter.com/henrykobutra"
    ],
    "jobTitle": "CTO & Co-founder",
    "worksFor": {
      "@type": "Organization",
      "@id": "https://redii.co/#organization",
      "name": "Redii",
      "url": "https://redii.co"
    },
    "knowsAbout": [
      "Full-stack Development",
      "Technical Leadership",
      "Fintech",
      "AI/ML",
      "Digital Transformation",
      "Python",
      "JavaScript",
      "AWS",
      "Cybersecurity",
      "Cross-cultural Management"
    ],
    "knowsLanguage": languageSkills,
    "hasCredential": [...educationalCredentials, ...professionalCertifications],
    "description": "CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
    "nationality": "Thai",
    "birthPlace": "Thailand",
    "immigrantStatus": "US Person (EB-1A Alien of Extraordinary Ability)",
    "alumniOf": alumniInstitutions,
    "award": [
      "15k+ YouTube Subscribers",
      "90% Cost Reduction Achievement",
      "180% Engagement Growth"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema)
      }}
    />
  );
}
