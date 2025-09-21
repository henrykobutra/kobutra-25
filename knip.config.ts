import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Entry points for the application
  entry: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'scripts/**/*.ts',
  ],
  
  // Project files to analyze
  project: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'scripts/**/*.ts',
  ],

  // Ignore certain files and directories
  ignore: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    '**/*.d.ts',
  ],

  // Configure specific tools and their dependencies
  eslint: {
    config: ['eslint.config.mjs'],
  },

  postcss: {
    config: ['postcss.config.mjs'],
  },

  // Ignore certain dependencies that are used but not directly imported
  ignoreDependencies: [
    // ESLint configs are used via extends
    'eslint-config-next',
    // TailwindCSS is used via PostCSS plugin and CSS imports
    'tailwindcss',
    // Framer Motion - keeping for future use
    'framer-motion',
  ],
};

export default config;
