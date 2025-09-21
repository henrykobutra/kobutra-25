'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2
    }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.5
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8
    }
  }
};

const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10
  },
  visible: {
    opacity: [0, 0.3, 0.4, 0.6, 1],
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.5,
      delay: 0.3
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  rotate: [-2, 2, -2],
  transition: {
    duration: 6,
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

/**
 * Hero section component displaying Henry's introduction, profile, and main background image.
 * Features responsive layout with content on the left and decorative logo on the right.
 */
export default function HeroSection() {
  return (
    <section className="py-16 overflow-visible">
      <div className="max-w-4xl mx-auto px-4 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Content - Left Side */}
          <div className="col-span-2">
            <motion.h1
              className="text-3xl md:text-4xl font-light mb-4"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Henry Kobutra
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              CTO & Co-founder at Redii. 15+ years of technical leadership across fintech, AI/ML, and digital transformation.
            </motion.p>

            <motion.div
              className="text-sm text-gray-600 leading-relaxed"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <p>
                Full-stack technologist with deep expertise across Python, JavaScript, AWS, AI/ML, and cybersecurity.
                Fluent in three languages{' '}
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{ width: '1em', height: '1em' }}
                    title="United States"
                  />
                </motion.span>{' '}
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReactCountryFlag
                    countryCode="TH"
                    svg
                    style={{ width: '1em', height: '1em' }}
                    title="Thailand"
                  />
                </motion.span>{' '}
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReactCountryFlag
                    countryCode="DE"
                    svg
                    style={{ width: '1em', height: '1em' }}
                    title="Germany"
                  />
                </motion.span>{' '}
                with proven cross-cultural leadership experience.
                Track record of delivering measurable impact: 90% cost reductions, 180% engagement growth, and managing $5M+ transformation budgets.
              </p>
            </motion.div>
          </div>

          {/* Image - Right Side */}
          <div className="relative flex justify-center lg:justify-end col-span-1 overflow-visible">
            <div className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-28 top-1/2 -translate-y-1/2 -z-10">
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  animate={floatingAnimation}
                >
                  <Image
                    src="/images/common/h-logo-orange-glass.png"
                    alt="Henry Kobutra Logo"
                    width={1200}
                    height={1200}
                    priority
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[60rem] lg:h-[60rem] object-contain opacity-30 sm:opacity-40 md:opacity-60 lg:opacity-100"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
