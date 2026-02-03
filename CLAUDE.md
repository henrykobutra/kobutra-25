# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Development
- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production with Turbopack
- `bun run start` - Start production server

### Code Quality
- `bun run lint` - Run ESLint
- `bun run quality` - Run complete quality check (lint + typecheck + loc:check + knip)
- `bunx tsc --noEmit` - TypeScript type checking only
- `bun run knip` - Find unused files, dependencies, and exports
- `bun run loc` - Lines of code report
- `bun run loc:check` - Check for files exceeding line limits (fails CI if over 200 lines)

## Architecture

This is a **Next.js 15 personal portfolio** built with:
- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Shadcn/ui** components (new-york style)

### Project Structure
```
app/
├── layout.tsx          # Root layout with Geist fonts
├── page.tsx            # Home page composing all sections
└── globals.css         # Global styles

components/home/        # Modular homepage sections
├── hero-section.tsx
├── metrics-achievements-section.tsx
├── featured-work-section.tsx
├── technical-expertise-section.tsx
├── about-section.tsx
├── contact-section.tsx
├── prominent-photo.tsx
└── certification-badges.tsx
```

### Key Configuration Files
- `components.json` - Shadcn/ui configuration (new-york style, Tailwind v4)
- `loc.config.json` - Lines of code limits (200 max per file)
- `tsconfig.json` - TypeScript config with `@/*` path alias
- `eslint.config.mjs` - ESLint with Next.js rules

### Code Standards
- **File size limit**: 200 lines maximum (enforced by `loc:check`)
- **Path aliases**: Use `@/` prefix for absolute imports
- **Component architecture**: Modular sections composed in main page
- **Styling**: Tailwind CSS with CSS variables for theming
