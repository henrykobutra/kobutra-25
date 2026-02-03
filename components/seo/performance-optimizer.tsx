'use client';

import { useEffect } from 'react';

/**
 * Performance optimization component for Core Web Vitals
 * Implements preloading, resource hints, and performance monitoring
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      { href: '/images/common/h-logo-orange-glass.png', as: 'image' },
      { href: '/images/common/h-dot-transparent.png', as: 'image' },
      { href: '/images/photos/henry_making_youtube.jpg', as: 'image' },
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });

    // DNS prefetch for external resources
    const dnsPrefetchDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical third-party origins
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Web Vitals monitoring (if you want to track performance)
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // You can implement Web Vitals tracking here
        // For example, using the 'web-vitals' library
        console.log('Performance monitoring initialized');
      });
    }

    // Cleanup function
    return () => {
      // Remove dynamically added elements if needed
      const dynamicLinks = document.querySelectorAll('link[data-dynamic="true"]');
      dynamicLinks.forEach(link => link.remove());
    };
  }, []);

  return (
    <>
      {/* Resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical images */}
      <link 
        rel="preload" 
        href="/images/common/h-logo-orange-glass.png" 
        as="image"
        type="image/png"
      />
      <link 
        rel="preload" 
        href="/images/common/h-dot-transparent.png" 
        as="image"
        type="image/png"
      />
      <link 
        rel="preload" 
        href="/images/photos/henry_making_youtube.jpg" 
        as="image"
        type="image/jpeg"
      />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Viewport meta for mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b0b0b" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      
      {/* Prevent automatic phone number detection */}
      <meta name="format-detection" content="telephone=no" />
    </>
  );
}
