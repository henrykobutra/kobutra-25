import type { Metadata } from 'next';
import NotesClient from '@/components/notes/notes-client';

export const metadata: Metadata = {
  title: "Notes & Insights",
  description: "Technical notes, insights, and thoughts from Henry Kobutra on software development, leadership, and technology trends. Practical knowledge from 15+ years in tech.",
  keywords: [
    "Henry Kobutra notes",
    "Technical insights",
    "Software development",
    "Technology trends",
    "Leadership thoughts",
    "Programming insights",
    "Tech leadership",
    "Development best practices"
  ],
};

/**
 * Notes page component for technical insights and observations
 * Server component that handles metadata while delegating client-side functionality to NotesClient.
 */
export default function NotesPage() {
  return <NotesClient />;
}