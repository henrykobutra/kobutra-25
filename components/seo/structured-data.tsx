/**
 * Structured Data component for SEO rich snippets
 * Implements JSON-LD schema for Person and Organization markup
 */
export default function StructuredData() {
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
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language", 
        "name": "German",
        "alternateName": "de"
      },
      {
        "@type": "Language",
        "name": "Thai", 
        "alternateName": "th"
      },
      {
        "@type": "Language",
        "name": "Japanese",
        "alternateName": "ja"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Bachelor of Science in Information Technology",
        "credentialCategory": "Degree",
        "educationalCredentialAwarded": "B.Sc IT",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Western Governors University"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Associate of Applied Science in Artificial Intelligence",
        "credentialCategory": "Degree", 
        "educationalCredentialAwarded": "A.A.S",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Houston Community College"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AWS Cloud Practitioner",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Amazon Web Services"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Hack The Box Certified Penetration Testing Specialist (CPTS)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization", 
          "name": "Hack The Box"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Certified Ethical Hacker (CEH)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "EC-Council"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Practical Network Penetration Tester (PNPT)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "TCM Security"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "ISC² Certified in Cybersecurity (CC)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "ISC²"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Forrester Customer Experience Professional",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Forrester"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Professional Scrum Master (PSM)",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Scrum.org"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "FCC Amateur Radio Extra Class License (AI5OE)",
        "credentialCategory": "Professional License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Federal Communications Commission"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "CompTIA A+",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "CompTIA"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "CompTIA Network+",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "CompTIA"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Linux Essentials",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Linux Professional Institute"
        }
      }
    ],
    "description": "CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
    "nationality": "Thai",
    "birthPlace": "Thailand",
    "immigrantStatus": "US Person (EB-1A Alien of Extraordinary Ability)",
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Western Governors University"
      },
      {
        "@type": "Organization", 
        "name": "Houston Community College"
      }
    ],
    "award": [
      "15k+ YouTube Subscribers",
      "90% Cost Reduction Achievement",
      "180% Engagement Growth"
    ]
  };

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  );
}
