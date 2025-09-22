/**
 * File system operations for the notes system
 * 
 * This module handles all file system interactions including reading note files,
 * parsing frontmatter, and directory operations.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NoteFrontmatter } from '@/lib/types/note-types';

const NOTES_DIRECTORY = path.join(process.cwd(), 'content/notes');

/**
 * Get all note files from the content directory
 * 
 * @returns Array of absolute file paths to markdown note files
 */
export function getNoteFiles(): string[] {
  try {
    if (!fs.existsSync(NOTES_DIRECTORY)) {
      console.warn(`Notes directory does not exist: ${NOTES_DIRECTORY}`);
      return [];
    }
    
    const files = fs.readdirSync(NOTES_DIRECTORY)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => path.join(NOTES_DIRECTORY, file));
    
    return files;
  } catch (error) {
    console.error('Error reading notes directory:', error);
    return [];
  }
}

/**
 * Parse markdown file and extract frontmatter
 * 
 * @param filePath - Absolute path to the markdown file
 * @returns Parsed frontmatter and content
 */
export function parseMarkdownFile(filePath: string): { frontmatter: NoteFrontmatter; content: string } {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data as NoteFrontmatter,
    content
  };
}

/**
 * Calculate estimated reading time (words per minute)
 * 
 * @param content - Text content to analyze
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
