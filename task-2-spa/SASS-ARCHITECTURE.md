# SASS 7-1 Architecture Documentation

## Overview

This project follows the industry-standard **SASS 7-1 Architecture Pattern**, which organizes stylesheets into 7 folders and 1 main file that imports everything.

## Folder Structure

```
src/styles/
├── abstracts/           # Configuration and helpers
│   ├── _variables.scss  # SASS variables (colors, spacing, breakpoints)
│   ├── _mixins.scss     # Reusable mixins (responsive, flex-center, etc.)
│   └── _index.scss      # Barrel file for abstracts
│
├── base/                # Foundation styles
│   ├── _reset.scss      # CSS reset and normalization
│   ├── _typography.scss # Typography rules
│   └── _index.scss      # Barrel file for base
│
├── components/          # Reusable UI components
│   ├── _buttons.scss    # Button styles
│   ├── _forms.scss      # Form elements (input, select, textarea)
│   ├── _cards.scss      # Card components
│   ├── _badges.scss     # Badge components
│   ├── _modals.scss     # Modal/dialog styles
│   └── _index.scss      # Barrel file for components
│
├── layout/              # Structural layouts
│   ├── _header.scss     # Navigation bar styles
│   ├── _footer.scss     # Footer styles
│   ├── _container.scss  # Main content containers
│   └── _index.scss      # Barrel file for layout
│
├── pages/               # Page-specific styles
│   ├── _auth.scss       # Login/Register pages
│   ├── _dashboard.scss  # Dashboard page
│   ├── _users.scss      # User List/Detail/Form pages
│   └── _index.scss      # Barrel file for pages
│
├── utilities/           # Helper classes
│   ├── _utilities.scss  # Utility classes (spacing, alerts, loading)
│   └── _index.scss      # Barrel file for utilities
│
└── main.scss            # Main entry point that imports everything
```

## Import Order

The `main.scss` file imports all partials in the correct order:

1. **Abstracts** - Variables and mixins (no CSS output)
2. **Base** - Reset and typography (foundation)
3. **Layout** - Structural components
4. **Components** - Reusable UI components
5. **Pages** - Page-specific styles
6. **Utilities** - Helper classes

## Modern SASS Features

### Using @use Instead of @import

This project uses the modern `@use` directive instead of deprecated `@import`:

```scss
// Old way (deprecated)
@import 'variables';

// New way (recommended)
@use 'abstracts' as *;
```

### Color Functions

Uses `sass:color` module with `color.adjust()` instead of deprecated `darken()`/`lighten()`:

```scss
@use 'sass:color';

// Old way (deprecated)
background: darken($primary-color, 10%);

// New way (recommended)
background: color.adjust($primary-color, $lightness: -10%);
```

## Key Features

### 1. CSS Custom Properties

Variables are exposed as CSS custom properties for dynamic theming:

```scss
:root {
  --primary-color: #{$primary-color};
  --shadow-md: #{$shadow-md};
}
```

### 2. Responsive Mixins

Clean responsive breakpoints using mixins:

```scss
@include mobile {
  // Mobile styles
}

@include tablet {
  // Tablet styles
}
```

### 3. Reusable Mixins

Common patterns extracted into mixins:

- `@mixin button-base` - Base button styles
- `@mixin card` - Card component styles
- `@mixin flex-center` - Centered flex container
- `@mixin truncate` - Text truncation
- `@mixin line-clamp($lines)` - Multi-line truncation

## Benefits of This Architecture

1. **Maintainability** - Easy to find and update styles
2. **Scalability** - Clear structure for adding new components
3. **Reusability** - Mixins and variables reduce duplication
4. **Collaboration** - Standard pattern understood by developers
5. **Performance** - Single compiled CSS file with tree-shaking

## Usage in Components

All React components import the single main entry point:

```jsx
import '../styles/main.scss';
```

This ensures:
- No duplicate style imports
- Consistent load order
- Single compiled CSS bundle
- Better build performance

## Adding New Styles

### New Component

1. Create `_component-name.scss` in `components/`
2. Add styles using project variables and mixins
3. Import in `components/_index.scss`

Example:
```scss
// components/_tooltip.scss
@use '../abstracts' as *;

.tooltip {
  @include card;
  position: absolute;
  z-index: 1000;
}
```

### New Page

1. Create `_page-name.scss` in `pages/`
2. Add page-specific styles
3. Import in `pages/_index.scss`

### New Variable

Add to `abstracts/_variables.scss`:
```scss
$new-color: #123456;
```

### New Mixin

Add to `abstracts/_mixins.scss`:
```scss
@mixin my-mixin {
  // Styles here
}
```

## Build Output

- **Development**: Fast HMR with source maps
- **Production**: Single minified CSS file (~17.5 KB → 3.5 KB gzipped)

## Resources

- [SASS 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [SASS @use Documentation](https://sass-lang.com/documentation/at-rules/use)
- [SASS Color Module](https://sass-lang.com/documentation/modules/color)
