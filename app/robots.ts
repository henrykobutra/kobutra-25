import { MetadataRoute } from 'next';

// Configure for Edge Runtime (required for Cloudflare Pages)
export const runtime = 'edge';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/private/', '/_next/', '/api/'],
    },
    sitemap: 'https://kobutra.com/sitemap.xml',
  };
}
