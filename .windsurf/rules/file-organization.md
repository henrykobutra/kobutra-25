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