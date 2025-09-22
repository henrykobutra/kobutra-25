/**
 * Type definitions for the notes system
 * 
 * This module contains all TypeScript interfaces and types used throughout
 * the notes processing system, providing type safety and clear contracts.
 */

/**
 * Frontmatter structure for note markdown files
 */
export interface NoteFrontmatter {
  /** Display order for sorting notes */
  order: number;
  /** URL-friendly identifier for the note */
  slug: string;
  /** Human-readable title of the note */
  title: string;
  /** Array of tags for categorization */
  tags: string[];
  /** Publication date in ISO format */
  date: string;
  /** Brief description or summary */
  excerpt: string;
}

/**
 * Complete note data including processed content
 */
export interface NoteData {
  /** Parsed frontmatter metadata */
  frontmatter: NoteFrontmatter;
  /** Raw markdown content */
  content: string;
  /** Processed HTML content */
  htmlContent: string;
}

/**
 * Lightweight note representation for listing pages
 */
export interface NoteListItem {
  /** Parsed frontmatter metadata */
  frontmatter: NoteFrontmatter;
  /** Estimated reading time in minutes */
  readingTime: number;
}

/**
 * AST node structure for markdown processing
 */
export interface ASTNode {
  /** Node type (element, text, etc.) */
  type: string;
  /** HTML tag name for element nodes */
  tagName?: string;
  /** Child nodes */
  children?: ASTNode[];
  /** Element properties and attributes */
  properties?: {
    /** CSS class names */
    className?: string[];
    /** Other properties */
    [key: string]: unknown;
  };
  /** Text content for text nodes */
  value?: string;
}
