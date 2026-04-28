# StatusBadge Component Implementation Plan

## Component Architecture

### Props Interface
```typescript
type Status = 'active' | 'inactive' | 'pending';

interface StatusBadgeProps {
  status: Status;
  label: string;
}
```

### Design Tokens
| Status | Color | Hex |
|--------|-------|-----|
| active | green | #22c55e |
| inactive | gray | #6b7280 |
| pending | yellow | #f59e0b |

### Component Structure
```
src/components/StatusBadge/
├── StatusBadge.tsx       # Component implementation
├── StatusBadge.module.css # CSS modules styling
├── StatusBadge.test.tsx   # Unit tests
└── StatusBadge.stories.tsx # Storybook documentation
```

### Accessibility
- Role: `status` for screen readers
- Color contrast: WCAG AA compliant (4.5:1 minimum)
- Dot indicator with aria-label

### Install Commands
```bash
npm install --save-dev typescript @types/react @types/react-dom @storybook/react @storybook/react-vite @storybook/addon-essentials
```

### Test Plan
- Render all 3 status variants
- Verify label text content
- Verify CSS class application
- Verify accessibility attributes
