'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ProminentPhotoProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ProminentPhoto({ src, alt, caption }: ProminentPhotoProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - reduced movement range to prevent gaps
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section className="py-8" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          style={{ opacity }}
        >
          <div className="w-full h-80 md:h-96 lg:h-[32rem] relative overflow-hidden">
            <motion.div
              style={{ y, scale }}
              className="w-full h-[120%] relative -top-[10%]"
            >
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                priority={false}
              />
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />

          {/* Subtle overlay animation on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {caption && (
          <motion.p
            className="text-sm text-gray-600 mt-3 text-center italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {caption}
          </motion.p>
        )}
      </div>
    </section>
  );
}
