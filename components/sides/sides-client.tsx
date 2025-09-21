'use client';

import { motion } from 'framer-motion';

// Animation variants consistent with notes page
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

// Sample project items - replace with actual projects
const projectItems = [
  {
    title: "Coming Soon",
    status: "Planning",
    description: "This section will showcase side projects, technical experiments, and creative coding endeavors.",
    tags: ["React", "Next.js", "TypeScript"]
  }
];

/**
 * Client-side sides page component with animations
 * Handles motion and interactive functionality for the projects page
 */
export default function SidesClient() {
  return (
    <motion.div
      className="min-h-screen py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-light mb-6">
            Side Projects
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A collection of experiments, prototypes, and passion projects. These represent my exploration of new technologies, creative solutions, and continuous learning journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
        >
          {projectItems.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">{project.title}</h2>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            More projects coming soon as I build and experiment with new ideas.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
