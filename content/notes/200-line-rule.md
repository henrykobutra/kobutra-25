---
order: 1
slug: 200-line-rule
title: "The 200-Line Rule: Keeping Components Focused"
tags: ["react", "best-practices", "architecture"]
date: "2024-01-15"
excerpt: "Why limiting components to 200 lines leads to better maintainability and cleaner code architecture."
---

One of the most impactful rules I've adopted in my development workflow is the **200-line rule** for components. This isn't just an arbitrary number—it's a practical threshold that forces better architectural decisions.

## Why 200 Lines?

After years of maintaining codebases, I've noticed that components beyond 200 lines tend to:

- Handle multiple responsibilities
- Become harder to test
- Require more mental overhead to understand
- Lead to prop drilling and state management issues

## Implementation Strategy

Here's how I enforce this rule:

```typescript
// Good: Focused component under 200 lines
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export function UserProfile({ user, onUpdate }: UserProfileProps) {
  // Single responsibility: Display and edit user profile
  // ~150 lines of focused functionality
}
```

```typescript
// Better: Split into smaller components
export function UserProfile({ user, onUpdate }: UserProfileProps) {
  return (
    <div className="user-profile">
      <UserAvatar user={user} />
      <UserDetails user={user} onUpdate={onUpdate} />
      <UserPreferences user={user} onUpdate={onUpdate} />
    </div>
  );
}
```

## Tools for Enforcement

I use a custom script that checks line counts during CI:

```bash
# Check component line counts
find components -name "*.tsx" -exec wc -l {} + | awk '$1 > 200 {print $2 " has " $1 " lines"}'
```

## Benefits I've Observed

1. **Easier Code Reviews**: Reviewers can understand the entire component
2. **Better Testing**: Smaller surface area means more focused tests
3. **Improved Reusability**: Smaller components are naturally more composable
4. **Faster Development**: Less context switching when working on focused components

## Exceptions to the Rule

Sometimes you need to break the rule:

- Complex forms with extensive validation
- Data visualization components
- Legacy components during refactoring

The key is being intentional about these exceptions and having a plan to address them.

---

*This approach has significantly improved my codebase maintainability. What's your experience with component size limits?*
