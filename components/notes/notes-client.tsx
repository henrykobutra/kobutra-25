'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { NoteListItem } from '@/lib/notes/markdown-processor';

// Simplified animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

interface NotesClientProps {
  notes: NoteListItem[];
}

/**
 * Client-side notes page component with animations
 * Handles motion and interactive functionality for the notes page
 */
export default function NotesClient({ notes }: NotesClientProps) {
  return (
    <motion.div
      className="min-h-screen py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-light mb-6">
            Notes
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Personal observations and findings from my development journey. I&apos;m not claiming these are the best methods—just sharing what I&apos;ve discovered and what works for me. Always open to suggestions. After all, I&apos;m a product person playing programmer/CTO.
          </p>
        </motion.div>

        <motion.ul 
          className="space-y-8"
          variants={containerVariants}
        >
          {notes.map((note) => (
            <motion.li
              key={note.frontmatter.slug}
              variants={itemVariants}
              whileHover={{
                x: 8,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }
              }}
              className="group"
            >
              <Link href={`/notes/${note.frontmatter.slug}`} className="block">
                <div className="flex items-start gap-4">
                  <motion.span 
                    className="text-sm font-mono text-muted-foreground/60 min-w-[3ch] mt-1"
                    whileHover={{
                      scale: 1.1,
                      color: "rgb(var(--primary))",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {String(note.frontmatter.order).padStart(3, '0')}
                  </motion.span>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-lg font-medium text-foreground leading-relaxed mb-2"
                      whileHover={{
                        color: "rgb(var(--primary))",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {note.frontmatter.title}
                    </motion.h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {note.frontmatter.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground/80">
                      <span>{note.readingTime} min read</span>
                      <span>•</span>
                      <time dateTime={note.frontmatter.date}>
                        {new Date(note.frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      {note.frontmatter.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex gap-2">
                            {note.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-muted/50 rounded-md text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            More notes coming soon as I document my learnings and discoveries.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
