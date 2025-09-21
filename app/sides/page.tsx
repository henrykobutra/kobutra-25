import type { Metadata } from 'next';
import SidesClient from '@/components/sides/sides-client';

export const metadata: Metadata = {
  title: "Side Projects & Experiments",
  description: "Explore Henry Kobutra's side projects, technical experiments, and creative coding endeavors. From AI/ML prototypes to innovative web applications and open-source contributions.",
  keywords: [
    "Henry Kobutra projects",
    "Side projects",
    "Technical experiments",
    "Open source",
    "AI/ML prototypes",
    "Web applications",
    "Creative coding",
    "Innovation projects",
    "Software experiments"
  ],
};

/**
 * Sides page component for showcasing side projects and experiments
 * Server component that handles metadata while delegating client-side functionality to SidesClient.
 */
export default function SidesPage() {
  return <SidesClient />;
}