import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNoteBySlug, getAllNoteSlugs } from '@/lib/notes/markdown-processor';
import NoteRenderer from '@/components/notes/note-renderer';

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all note slugs
 */
export async function generateStaticParams() {
  const slugs = await getAllNoteSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for the note page
 */
export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  
  if (!note) {
    return {
      title: 'Note Not Found',
    };
  }
  
  return {
    title: `${note.frontmatter.title} | Henry Kobutra`,
    description: note.frontmatter.excerpt,
    keywords: [
      ...note.frontmatter.tags,
      'Henry Kobutra',
      'Technical notes',
      'Development insights'
    ],
    openGraph: {
      title: note.frontmatter.title,
      description: note.frontmatter.excerpt,
      type: 'article',
      publishedTime: note.frontmatter.date,
      tags: note.frontmatter.tags,
    },
  };
}

/**
 * Individual note page component
 */
export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  
  if (!note) {
    notFound();
  }
  
  return <NoteRenderer note={note} />;
}
