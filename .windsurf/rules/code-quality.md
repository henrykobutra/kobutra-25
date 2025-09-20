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