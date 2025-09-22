import { MetadataRoute } from 'next';
import { getAllNotes } from '@/lib/notes/markdown-processor';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kobutra.com';
  const currentDate = new Date();

  // Get all notes for dynamic sitemap generation
  const notes = await getAllNotes();

  // Base pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      // Include key images for better SEO
      images: [
        `${baseUrl}/images/common/h-logo-orange-glass.png`,
        `${baseUrl}/images/photos/henry_making_youtube.jpg`,
      ],
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sides`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic note pages
  const notePages: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.frontmatter.slug}`,
    lastModified: new Date(note.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...notePages];
}
