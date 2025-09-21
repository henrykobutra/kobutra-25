'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItemData {
  label: string;
  href: string;
  isLast?: boolean;
}

/**
 * Breadcrumb component that automatically generates breadcrumbs based on the current pathname
 * Uses a custom slash separator as requested
 */
export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItemData[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItemData[] = [
      { label: "Henry Kobutra's", href: '/' }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      // Capitalize and format segment names
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: currentPath,
        isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
      >
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    className="flex items-center"
                  >
                    <BreadcrumbSeparator>
                      <span className="text-muted-foreground font-medium">/</span>
                    </BreadcrumbSeparator>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="flex items-center"
                >
                  <BreadcrumbItem>
                    {item.isLast ? (
                      <BreadcrumbPage className="flex items-center gap-2">
                        {item.href === '/' && (
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 2, -2, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Image
                              src="/images/common/h-dot-transparent-xs.png"
                              alt="Henry Kobutra Logo"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                          </motion.div>
                        )}
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          {item.href === '/' && (
                            <motion.div
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 2, -2, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Image
                                src="/images/common/h-dot-transparent-xs.png"
                                alt="Henry Kobutra Logo"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </motion.div>
                          )}
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </motion.div>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
    </AnimatePresence>
  );
}
