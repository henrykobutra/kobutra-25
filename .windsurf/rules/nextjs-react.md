---
trigger: always_on
---

# Next.js & React Development Patterns

## Next.js App Router Guidelines
- Use Next.js 15 with App Router patterns exclusively
- Organize pages in `app/` directory following App Router structure
- Avoid embedding business logic directly in route handlers
- Use server actions and utilities in dedicated service modules
- Leverage Turbopack for development and production builds

## UI System Standards
- Follow Tailwind CSS v4 with inline theme configuration in `app/globals.css`
- Use custom CSS variables for theming (light/dark mode)
- Implement OKLCH color space for better color consistency
- Use Geist font family (sans and mono variants)

## Development Commands Integration
- Use `pnpm quality` for all quality checks (lint, typecheck, line count, unused code)