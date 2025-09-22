'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { NoteData } from '@/lib/notes/markdown-processor';
import CodeBlockRenderer from './code-block-renderer';

interface NoteRendererProps {
  note: NoteData;
}

// Animation variants
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

/**
 * Note renderer component for displaying individual markdown notes
 * Handles the layout and styling of note content with animations
 */
export default function NoteRenderer({ note }: NoteRendererProps) {
  return (
    <motion.article
      className="min-h-screen py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Back navigation */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link 
            href="/notes" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </Link>
        </motion.div>

        {/* Note header */}
        <motion.header variants={itemVariants} className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-8 leading-[1.1] tracking-tight text-foreground font-serif">
            {note.frontmatter.title}
          </h1>
          
          <p className="text-2xl leading-[1.6] text-muted-foreground/90 font-light max-w-2xl font-serif">
            {note.frontmatter.excerpt}
          </p>
          
          {/* Subtle divider */}
          <div className="mt-12 mb-4 w-16 h-px bg-gradient-to-r from-border to-transparent"></div>
        </motion.header>

        {/* Note content with enhanced code blocks */}
        <motion.article 
          variants={itemVariants}
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none font-serif [&_*]:font-serif [&_pre]:font-mono [&_code]:font-mono [&_.code-block-container]:!mb-3"
        >
          <CodeBlockRenderer htmlContent={note.htmlContent} />
        </motion.article>

        {/* Footer navigation */}
        <motion.footer variants={itemVariants} className="mt-20 pt-12 border-t border-border/50">
          <Link 
            href="/notes" 
            className="inline-flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground 
                       hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all notes
          </Link>
        </motion.footer>
      </div>
    </motion.article>
  );
}
