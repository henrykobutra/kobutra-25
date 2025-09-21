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
    transition: { duration: 0.5 }
  }
};

const noteItems = [
  "The 200-Line Rule: Keeping Components Focused",
  "Vibe Coding Philosophy: Quality Over Quantity", 
  "Automated Quality Gates: My Development Pipeline",
  "Shadcn Extensions: Beyond the Basics",
  "MCP Integrations: Supercharging Development Workflow",
  "Supabase MCP: Direct Database Access for AI Assistants",
  "Linear MCP: The Ultimate Project Management Integration",
  "iTerm2 Configuration: Terminal Perfection for Developers",
  "Claude Code Reviews: AI-Powered Quality Assurance",
  "macOS Productivity Stack: Stream Deck, Raycast & CleanShot",
  "AI Coding Trinity: Claude, Windsurf & Warp in Practice"
];

/**
 * Minimal notes page displaying development thoughts and practices.
 */
export default function NotesPage() {
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
            Personal observations and findings from my development journey. I'm not claiming these are the best methods—just sharing what I've discovered and what works for me. Always open to suggestions. After all, I'm a product person playing programmer/CTO.
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
              className="group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-muted-foreground/60 min-w-[2ch]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-lg text-foreground group-hover:text-primary transition-colors duration-200 leading-relaxed">
                  {item}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}