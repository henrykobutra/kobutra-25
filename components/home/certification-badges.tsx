'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CertificationBadge {
  name: string;
  image: string;
  alt: string;
}

const certifications: CertificationBadge[] = [
  {
    name: 'AWS Cloud Practitioner',
    image: '/images/certifications/aws-cloud-practitioner.png',
    alt: 'AWS Cloud Practitioner Certification'
  },
  {
    name: 'Hack The Box CPTS',
    image: '/images/certifications/cpts-badge.png',
    alt: 'Hack The Box Certified Penetration Testing Specialist'
  },
  {
    name: 'EC-Council CEH',
    image: '/images/certifications/ceh-badge.jpeg',
    alt: 'EC-Council Certified Ethical Hacker'
  },
  {
    name: 'TCM Security PNPT',
    image: '/images/certifications/pnpt-badge.png',
    alt: 'TCM Security Practical Network Penetration Tester'
  },
  {
    name: 'ISC² CC',
    image: '/images/certifications/isc2-cc-badge.png',
    alt: 'ISC² Certified in Cybersecurity'
  },
  {
    name: 'Forrester CX Pro',
    image: '/images/certifications/forrester-cx-badge.png',
    alt: 'Forrester Customer Experience Professional'
  },
  {
    name: 'Scrum.org PSM',
    image: '/images/certifications/psm-badge.png',
    alt: 'Scrum.org Professional Scrum Master'
  },
  {
    name: 'FCC Extra Class (AI5OE)',
    image: '/images/certifications/fcc-extra-badge.png', // Note: This image doesn't exist yet
    alt: 'FCC Amateur Radio Extra Class License'
  }
];

// Animation variants for staggered badge appearance
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

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function CertificationBadges() {
  return (
    <div>
      <motion.h3
        className="text-lg font-light mb-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Some Certifications
      </motion.h3>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={badgeVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            {/* Badge Image Container */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            >
              {cert.name !== 'FCC Extra Class (AI5OE)' ? (
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full transition-transform duration-200"
                />
              ) : (
                // Fallback for FCC badge (text-based until image is available)
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  whileHover={{
                    backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #1d4ed8, #1e40af)',
                    transition: { duration: 0.3 }
                  }}
                >
                  FCC
                </motion.div>
              )}
            </motion.div>

            {/* Badge Name */}
            <motion.div
              className="text-xs text-center text-muted-foreground leading-tight"
              whileHover={{ color: '#374151' }}
            >
              {cert.name}
            </motion.div>

            {/* Hover tooltip */}
            <motion.div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
            >
              {cert.alt}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle snarky text with typing animation */}
      <motion.p
        className="text-xs text-muted-foreground mt-4 italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        I also have other certs like CompTIA A+, Network+, Linux Essentials... but who&apos;s counting?
      </motion.p>
    </div>
  );
}
