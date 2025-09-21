import type { Metadata } from 'next';
import HomeClient from '@/components/home/home-client';

export const metadata: Metadata = {
  title: {
    absolute: "Henry Kobutra - CTO & Co-founder | Full-Stack Technology Leader"
  },
  description: "Henry Kobutra - CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
  keywords: [
    "Henry Kobutra",
    "CTO",
    "Co-founder",
    "Redii",
    "Technical leadership",
    "Fintech expert",
    "AI/ML specialist",
    "Digital transformation",
    "Full-stack developer",
    "AWS architect",
    "Cybersecurity",
    "Cross-cultural management",
    "Remote CTO",
    "Technology consultant"
  ],
};

/**
 * Home page component serving as the main landing page for Henry Kobutra's personal website.
 * Server component that handles metadata while delegating client-side functionality to HomeClient.
 */
export default function Home() {
  return <HomeClient />;
}
