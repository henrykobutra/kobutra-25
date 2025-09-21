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

interface SideProject {
  name: string;
  description: string;
  status: 'building' | 'exploring' | 'planning';
}

const sideProjects: SideProject[] = [
  {
    name: "Resumo",
    description: "AI resume generator evolving into a comprehensive career coach. Taking on LinkedIn with tools for job seekers, interview prep, and career guidance.",
    status: "building"
  },
  {
    name: "LOC Checker",
    description: "Open-source package for maintaining codebases under 200 lines per file. Currently using personal scripts, planning public release.",
    status: "planning"
  },
  {
    name: "CRM Platform",
    description: "Building a better WordPress alternative. Reimagining how content management should work in the modern web ecosystem.",
    status: "exploring"
  },
  {
    name: "Spa Software",
    description: "Next-generation spa management platform. Improving on Square's booking system with modern UX and comprehensive business tools.",
    status: "exploring"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'building':
      return 'text-green-600';
    case 'exploring':
      return 'text-blue-600';
    case 'planning':
      return 'text-orange-600';
    default:
      return 'text-muted-foreground';
  }
};

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
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-light mb-6">
            Side Projects
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            While actively working on Redii, I spend most of my spare time exploring the intersection between AI and Enterprise through these ventures:
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
        >
          {sideProjects.map((project, index) => (
            <motion.div
              key={index}
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
              <div className="flex items-start gap-4">
                <motion.span 
                  className="text-sm font-mono text-muted-foreground/60 min-w-[2ch] mt-1"
                  whileHover={{
                    scale: 1.1,
                    color: "rgb(var(--primary))",
                    transition: { duration: 0.2 }
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.h3 
                      className="text-lg font-medium text-foreground"
                      whileHover={{
                        color: "rgb(var(--primary))",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {project.name}
                    </motion.h3>
                    <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
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
