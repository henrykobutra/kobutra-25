/**
 * Social Profile Schema component for enhanced professional presence
 * Based on Next-SEO best practices for social media profile structured data
 */
export default function SocialProfileSchema() {
  const socialProfileSchema = {
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
    "description": "CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
    "knowsAbout": [
      "Technical Leadership",
      "Full-stack Development",
      "Fintech Solutions", 
      "AI/ML Implementation",
      "Digital Transformation",
      "Cybersecurity",
      "Cross-cultural Management",
      "Python Programming",
      "JavaScript Development",
      "AWS Cloud Architecture"
    ],
    "award": [
      "15k+ YouTube Subscribers",
      "90% Cost Reduction Achievement", 
      "180% Engagement Growth",
      "EB-1A Alien of Extraordinary Ability"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(socialProfileSchema)
      }}
    />
  );
}
