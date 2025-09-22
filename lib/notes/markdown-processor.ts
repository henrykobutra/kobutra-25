import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export interface NoteFrontmatter {
  order: number;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  excerpt: string;
}

export interface NoteData {
  frontmatter: NoteFrontmatter;
  content: string;
  htmlContent: string;
}

export interface NoteListItem {
  frontmatter: NoteFrontmatter;
  readingTime: number;
}

const NOTES_DIRECTORY = path.join(process.cwd(), 'content/notes');

/**
 * Get all note files from the content directory
 */
function getNoteFiles(): string[] {
  try {
    if (!fs.existsSync(NOTES_DIRECTORY)) {
      console.warn(`Notes directory does not exist: ${NOTES_DIRECTORY}`);
      return [];
    }
    
    const files = fs.readdirSync(NOTES_DIRECTORY)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => path.join(NOTES_DIRECTORY, file));
    
    console.log(`Found ${files.length} note files:`, files.map(f => path.basename(f)));
    return files;
  } catch (error) {
    console.error('Error reading notes directory:', error);
    return [];
  }
}

/**
 * Parse markdown file and extract frontmatter
 */
function parseMarkdownFile(filePath: string): { frontmatter: NoteFrontmatter; content: string } {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data as NoteFrontmatter,
    content
  };
}

/**
 * Convert markdown content to HTML with Shiki syntax highlighting
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: [
        'typescript',
        'javascript',
        'tsx',
        'jsx',
        'bash',
        'json',
        'yaml',
        'css',
        'html',
        'markdown',
        'sql',
        'python',
        'go',
        'rust',
        'java',
        'php',
        'ruby',
        'swift',
        'kotlin',
        'dart',
        'vue',
        'svelte',
      ],
    })
    .use(rehypeStringify)
    .process(markdown);
    
  return result.toString();
}

/**
 * Calculate estimated reading time (words per minute)
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

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
    
    console.log(`Generated slugs for static params:`, slugs);
    return slugs;
  } catch (error) {
    console.error('Error in getAllNoteSlugs:', error);
    return [];
  }
}
