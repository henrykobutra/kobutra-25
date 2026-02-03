---
order: 2
slug: ai-coding-assistant-rules
title: "AI Coding Assistant Rules: My Battle-Tested Practices"
tags: ["ai-coding", "windsurf", "best-practices", "automation", "quality"]
date: "2024-01-20"
excerpt: "The essential rules and workflows I've developed for effective AI-assisted development, from file organization to automated quality checks."
---

Working with AI coding assistants like Windsurf has fundamentally changed how I approach development. What started as adapting to AI limitations has evolved into a comprehensive set of practices that improve both human and AI collaboration. These are my battle-tested rules for AI-assisted coding.

## The Foundation: Windsurf Rules System

I've codified my AI coding practices into three core rule files that Windsurf automatically applies to every interaction. These rules have `trigger: always_on`, meaning they're active for every AI conversation. Here are the complete rules with explanations:

### Code Quality & TypeScript Standards

This is my most comprehensive rule file, focusing on maintainable, type-safe code:

```markdown
---
trigger: always_on
---

# Code Quality & TypeScript Standards

## Code Style Rules
- Keep files under 200 lines of code - split larger files into smaller focused modules
- Use TypeScript strictly: avoid `any`, minimize `unknown`
- Follow DRY principle and separate concerns consistently
- Use service pattern for business logic - avoid embedding logic in route handlers
- Create reusable utilities where applicable
- Write meaningful JSDoc comments, avoid temporary/TODO comments

## TypeScript Best Practices
- Define clear interfaces for component props to ensure type safety
- Use proper TypeScript exports and imports
- Leverage strict mode configurations
- Use path aliases (`@/*`) for consistent import paths
- Generate and maintain Supabase types from schema

## Accessibility
- Code shall be WACG 2.1 compliant

## Component Architecture Rules
- Follow Single Responsibility Principle - one clear purpose per component
- Separate Smart (Container) vs Dumb (Presentational) components:
  - Smart: Handle business logic, state management, API calls
  - Dumb: Pure UI components with props and callbacks
- Extract business logic into custom hooks when components become complex
- Prefer composition over inheritance
- Break complex components into smaller focused pieces

## Service Layer Guidelines
- Organize business logic in `services/`, `lib/`, and `utils/` directories
- Handle database operations in dedicated service modules
- Maintain clear separation between client and server code
- Use server actions and utilities in dedicated service modules
```

**Why this works**: AI assistants excel when given explicit constraints. The 200-line rule forces better architecture, while the TypeScript strictness prevents runtime errors. The Smart/Dumb component pattern makes it crystal clear to AI which components should handle logic versus presentation.

### File Organization & Naming Conventions

This rule ensures consistent, predictable project structure:

```markdown
---
trigger: always_on
---

# File Organization & Naming Conventions

## Directory Structure Rules
- Organize components by business domain in `components/` (e.g., `components/auth/`, `components/onboarding/`)
- Place hooks in domain-specific directories under `hooks/` (e.g., `hooks/auth/`, `hooks/onboarding/`)
- Group utilities by business domain in `lib/` (e.g., `lib/auth/`, `lib/onboarding/`)
- Keep all test files in `tests/` directory mirroring source structure
- Avoid deep nesting - prefer flat structures within domain directories
- Co-locate related files within the same domain directory

## File Naming Conventions
- Use kebab-case for all file names
- Components: `signin-form.tsx`, `otp-verification-form.tsx`
- Hooks: `use-registration.ts`, `use-otp-verification.tsx` (with `use-` prefix)
- Services & Utilities: `onboarding-database.ts`, `validation-helpers.ts`
- Test files: `*.test.ts/tsx` (NOT co-located with source code)
- Avoid redundant prefixes when files are in domain directories

## Import Path Rules
- Use absolute imports with `@/` prefix for consistency
- Use relative imports (`./`, `../`) only within the same domain directory
- Prefer importing from domain-specific directories over generic ones

## Component Organization Rules
- Create reusable components in `components/` rather than page-specific `_components/`
- Group by business domain, not technical function
- Prefer `components/auth/signin-form.tsx` over `app/signin/_components/signin-form.tsx`
```

**Why this works**: Domain-driven organization helps AI assistants understand the business context. When files are grouped by feature rather than technical function, AI can make better suggestions about where new code should live.

### Next.js & React Development Patterns

This rule keeps AI assistants aligned with modern Next.js patterns:

```markdown
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
- Use `bun run quality` for all quality checks (lint, typecheck, line count, unused code)
```

**Why this works**: AI assistants can get confused between different Next.js patterns (Pages Router vs App Router). This rule eliminates ambiguity and ensures consistent modern patterns.

## The Automation Layer: Quality Workflows

The real power comes from automating quality checks. My `bun run quality` command runs:

```bash
# Integrated quality pipeline
bun run lint          # ESLint catches style issues
bunx tsc --noEmit     # TypeScript catches type errors  
bun run loc:check     # Custom tool enforces 200-line rule
bun run knip          # Detects unused code
```

This creates a feedback loop where AI assistants can immediately see if their suggestions break quality standards.

### The Code Cleanup Workflow

I've created a Windsurf workflow that automatically applies all quality standards. Here's the complete workflow file:

```markdown
---
description: Cleaning up code before commit
auto_execution_mode: 3
---

Make all the code pass `bun run quality`. All code adjustments should 
strictly follow our coding standards. Do not use type of `any`, do not 
introduce eslint exceptions, and do not introduce cheap workarounds. 
Properly breakdown code, organize it well, and don't skimp on JSDocs.
```

**How this workflow works**:
- **`auto_execution_mode: 3`**: Windsurf can run this automatically when I type `/code-cleanup`
- **Quality enforcement**: Ensures all code passes the complete quality pipeline
- **No shortcuts**: Explicitly forbids common AI shortcuts like `any` types or ESLint exceptions
- **Documentation requirement**: Forces proper JSDoc comments on all functions

**Real-world usage**: When I'm ready to commit code, I simply type `/code-cleanup` and Windsurf automatically:
1. Runs `bun run quality` to identify issues
2. Fixes ESLint violations
3. Resolves TypeScript errors
4. Breaks down oversized files
5. Adds missing JSDoc comments
6. Reorganizes imports and file structure

This workflow has saved me countless hours of manual cleanup and ensures consistent code quality across all commits.

## AI Collaboration Patterns

### The "Context Window" Strategy

AI assistants work best when they can see the entire context. My 200-line rule ensures:
- **Complete understanding**: AI sees the full file in one pass
- **Accurate refactoring**: No partial changes that break consistency
- **Better suggestions**: AI understands the complete component lifecycle

### Smart Component Architecture

I guide AI assistants toward clean architecture patterns:

```typescript
// Smart Component (Container)
export function UserProfileContainer() {
  const { user, updateUser } = useUser();
  const { preferences, updatePreference } = useUserPreferences();
  
  return (
    <UserProfileView 
      user={user}
      preferences={preferences}
      onUpdateUser={updateUser}
      onUpdatePreference={updatePreference}
    />
  );
}

// Dumb Component (Presentational)
interface UserProfileViewProps {
  user: User;
  preferences: UserPreferences;
  onUpdateUser: (updates: Partial<User>) => void;
  onUpdatePreference: (key: string, value: unknown) => void;
}

export function UserProfileView(props: UserProfileViewProps) {
  // Pure UI logic only
}
```

This separation makes it crystal clear to AI assistants which components handle logic versus presentation.

## Rules in Action: A Practical Example

Here's how these rules work together in a real scenario. When I ask Windsurf to "create a user authentication system," it automatically follows all the rules:

**File Structure Created**:
```
components/auth/
├── signin-form.tsx          # Dumb component (UI only)
├── signup-form.tsx          # Dumb component (UI only)
└── auth-container.tsx       # Smart component (logic)

hooks/auth/
├── use-authentication.ts    # Business logic hook
└── use-form-validation.ts   # Reusable validation logic

lib/auth/
├── auth-service.ts          # API calls and auth logic
├── validation-schemas.ts    # Zod schemas for type safety
└── auth-types.ts           # TypeScript interfaces
```

**Code Quality Enforced**:
- Each file stays under 200 lines
- Strict TypeScript with proper interfaces
- JSDoc comments on all public functions
- Kebab-case naming throughout
- Domain-driven organization

**Workflow Integration**:
- `bun run quality` passes on first run
- No manual cleanup needed
- Ready for commit immediately

This systematic approach means I can focus on business logic while the rules handle code quality and organization automatically.

## Real-World Benefits and Challenges

### The Good
- **Consistent quality**: AI suggestions always follow established patterns
- **Faster onboarding**: New AI assistants immediately understand the codebase
- **Reduced cognitive load**: Rules handle the "how," I focus on the "what"
- **Automated enforcement**: Quality checks catch issues before they reach production

### The Challenges
- **Initial setup overhead**: Creating comprehensive rules takes time
- **Rule maintenance**: Standards evolve, rules need updates
- **Over-engineering risk**: Sometimes simple solutions get over-complicated
- **Context switching**: Different projects need different rule sets

## The Bigger Picture: Human-AI Collaboration

What I've learned is that the best AI coding relationships are built on clear constraints and expectations. When AI assistants know exactly what "good" looks like, they become incredibly effective collaborators.

The rules aren't about limiting creativity—they're about channeling it productively. Just like how poets create beautiful work within the constraints of sonnets, AI assistants create better code within well-defined boundaries.

## Future Evolution

I'm constantly refining these practices based on:
- **New AI capabilities**: As models improve, rules can become more sophisticated
- **Project learnings**: Real-world usage reveals gaps in the rule set
- **Team feedback**: Collaborative development surfaces new patterns

The goal isn't perfect rules—it's rules that evolve with both technology and team needs.

---

*These AI coding assistant rules have transformed my development workflow from chaotic to systematic. The key is treating AI as a collaborative partner that thrives on clear expectations and consistent feedback.*
