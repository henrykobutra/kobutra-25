'use client';

import { motion } from 'framer-motion';

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

// Sample note items - replace with actual content
const noteItems = [
  {
    title: "Coming Soon",
    date: "2024",
    preview: "This section will contain technical notes, insights, and observations from my development journey."
  }
];

/**
 * Client-side notes page component with animations
 * Handles motion and interactive functionality for the notes page
 */
export default function NotesClient() {
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
          {noteItems.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="border-l-2 border-muted pl-6"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.preview}
                </p>
              </div>
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
