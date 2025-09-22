# Notes System

This directory contains markdown files for the notes system. Each note should follow this frontmatter format:

```yaml
---
order: 1                    # Determines display order (001, 002, etc.)
slug: "note-slug"          # URL slug for /notes/[slug]
title: "Note Title"        # Display title
tags: ["tag1", "tag2"]     # Array of tags for categorization
date: "2024-01-15"         # Publication date (YYYY-MM-DD)
excerpt: "Brief description of the note content for previews"
---
```

## Features

- **Markdown Support**: Full GitHub Flavored Markdown (GFM) support
- **Syntax Highlighting**: Automatic code syntax highlighting with highlight.js
- **Reading Time**: Automatic calculation of estimated reading time
- **SEO Optimized**: Automatic meta tags and Open Graph data
- **Responsive Design**: Mobile-friendly layout with animations
- **Type Safe**: Full TypeScript support with proper interfaces

## File Naming

Use kebab-case for file names that match your slug:
- `200-line-rule.md` → `/notes/200-line-rule`
- `vibe-coding-philosophy.md` → `/notes/vibe-coding-philosophy`

## Code Blocks

Supports syntax highlighting for multiple languages:

```typescript
// TypeScript example
interface User {
  id: string;
  name: string;
}
```

```bash
# Bash example
pnpm install
pnpm dev
```

## Adding New Notes

1. Create a new `.md` file in this directory
2. Add the required frontmatter at the top
3. Write your content in markdown
4. The note will automatically appear on `/notes` and be accessible at `/notes/[slug]`
