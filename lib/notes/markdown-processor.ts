/**
 * Main notes processing API
 * 
 * This module provides the primary API functions for working with markdown notes,
 * orchestrating file operations, content transformation, and data aggregation.
 */

import path from 'path';
import type { NoteData, NoteListItem } from '@/lib/types/note-types';
import { getNoteFiles, parseMarkdownFile, calculateReadingTime } from '@/lib/notes/file-operations';
import { markdownToHtml } from '@/lib/notes/markdown-transformer';

// Re-export types for backward compatibility
export type { NoteFrontmatter, NoteData, NoteListItem } from '@/lib/types/note-types';

/**
 * Get all notes for the index page
 */
export async function getAllNotes(): Promise<NoteListItem[]> {
  const noteFiles = getNoteFiles();
  
  const notes = noteFiles.map(filePath => {
    const { frontmatter, content } = parseMarkdownFile(filePath);
    const readingTime = calculateReadingTime(content);
    
    return {
      frontmatter,
      readingTime
    };
  });
  
  // Sort by order field
  return notes.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/**
 * Get a specific note by slug
 */
export async function getNoteBySlug(slug: string): Promise<NoteData | null> {
  const noteFiles = getNoteFiles();
  
  for (const filePath of noteFiles) {
    const { frontmatter, content } = parseMarkdownFile(filePath);
    
    if (frontmatter.slug === slug) {
      const htmlContent = await markdownToHtml(content);
      
      return {
        frontmatter,
        content,
        htmlContent
      };
    }
  }
  
  return null;
}

/**
 * Get all available slugs for static generation
 */
export async function getAllNoteSlugs(): Promise<string[]> {
  try {
    const noteFiles = getNoteFiles();
    
    if (noteFiles.length === 0) {
      console.warn('No note files found for static generation');
      return [];
    }
    
    const slugs = noteFiles
      .map(filePath => {
        try {
          const { frontmatter } = parseMarkdownFile(filePath);
          if (!frontmatter.slug) {
            console.warn(`Missing slug in frontmatter for file: ${path.basename(filePath)}`);
            return null;
          }
          return frontmatter.slug;
        } catch (error) {
          console.error(`Error parsing file ${path.basename(filePath)}:`, error);
          return null;
        }
      })
      .filter((slug): slug is string => slug !== null);
    
    return slugs;
  } catch (error) {
    console.error('Error in getAllNoteSlugs:', error);
    return [];
  }
}
