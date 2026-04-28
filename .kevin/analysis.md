# UserAvatar Component Implementation

## Component Architecture

### Props Interface
```typescript
interface UserAvatarProps {
  src?: string;      // Optional image URL
  name: string;      // Required - used for initials fallback and accessibility
  size?: 'sm' | 'md' | 'lg';  // Default: 'md'
}
```

### Behavior
- Render `<img>` when `src` provided and valid
- Fallback to initials div when no `src` or image fails to load
- Initials extracted: split name by spaces, take first char of first two words
- Size variants: sm (32px), md (40px), lg (48px)

### Accessibility
- Image: `alt="{name}'s avatar"`
- Initials: `aria-label="{name}'s avatar"` on container
- `role="img"` for initials fallback

### File Structure
```
src/components/UserAvatar/
├── UserAvatar.tsx
├── UserAvatar.module.css
├── UserAvatar.test.tsx
```

## Dependencies
- No new dependencies needed
- Uses existing: React 18, TypeScript, CSS modules, Vitest, @testing-library/react

## Install Command
```bash
npm install  # Already installed
```

## Test Cases
1. Renders image when src provided
2. Renders initials fallback when no src
3. Renders initials when image fails to load
4. All size variants (sm, md, lg)
5. Initials extraction from various name formats
6. Accessibility attributes present
7. Edge case: empty name shows '?'
