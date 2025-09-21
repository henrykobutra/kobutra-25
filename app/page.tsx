'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/home/hero-section';
import MetricsAchievementsSection from '@/components/home/metrics-achievements-section';
import FeaturedWorkSection from '@/components/home/featured-work-section';
import TechnicalExpertiseSection from '@/components/home/technical-expertise-section';
import AboutSection from '@/components/home/about-section';
import ContactSection from '@/components/home/contact-section';
import ProminentPhoto from '@/components/home/prominent-photo';
import BottomNavigation from '@/components/ui/bottom-navigation';

// Animation variants for staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8
    }
  }
};

/**
 * Home page component serving as the main landing page for Henry Kobutra's portfolio.
 * Composed of modular sections showcasing professional experience, technical expertise, and contact information.
 */
export default function Home() {
  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <MetricsAchievementsSection />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <FeaturedWorkSection />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <TechnicalExpertiseSection />
      </motion.div>

      {/* Photo Break - YouTube Content Creation */}
      <motion.div
        variants={sectionVariants}
        whileInView={{
          scale: [1, 1.02, 1],
          transition: { duration: 0.6 }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <ProminentPhoto
          src="/images/photos/henry_making_youtube.jpg"
          alt="Henry creating YouTube content for his 15k+ subscribers"
          caption="Sharing knowledge with 15k+ subscribers and mentoring the next generation of tech professionals"
        />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AboutSection />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <ContactSection />
      </motion.div>

      {/* Bottom Navigation with slide-up animation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <BottomNavigation />
      </motion.div>
    </motion.div>
  );
}
