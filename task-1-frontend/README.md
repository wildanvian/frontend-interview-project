# Frontend Developer Assessment

This project showcases a complete frontend implementation with WordPress CMS integration. It includes responsive design, custom components, accessibility features, and a modern development workflow using Gulp.

## What's Included

- Responsive navigation with mega menu (desktop) and hamburger menu (mobile)
- Custom carousel/slider with lazy loading and keyboard controls
- Multi-step contact form with real-time validation
- Testimonials section pulling data from REST API
- Full WCAG 2.1 accessibility compliance
- WordPress theme with custom post types
- Automated build process with Gulp and BrowserSync

## Getting Started

### Standalone Version

If you just want to see the HTML/CSS/JS implementation:

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

### WordPress Version

The project includes a complete WordPress theme integration. To use it:

1. **Start WordPress server**
   ```bash
   bash start.sh
   ```

2. **Complete WordPress installation**
   - Open http://localhost:8080 in your browser
   - Fill in site details and create an admin account
   - Takes about 2 minutes

3. **Activate the theme**
   - Login to http://localhost:8080/wp-admin
   - Go to Appearance → Themes
   - Activate "FrontDev Portfolio"

4. **Start development with live reload**
   ```bash
   npm run dev:wp
   ```
   Opens at http://localhost:3000 with BrowserSync watching for changes

You can now manage all content through the WordPress admin panel. Add portfolio items, testimonials, and pages without touching any code.

## WordPress Features

The WordPress theme includes:

**Custom Post Types**
- Portfolio items with featured images and descriptions
- Testimonials with custom email field

**REST API Integration**
- Custom endpoint at `/wp-json/frontdev/v1/testimonials`
- JavaScript fetches testimonials dynamically from WordPress

**AJAX Form Handling**
- Contact form submits without page reload
- Server-side validation and email notification

**Modern Development**
- Gulp watches source files and compiles to WordPress theme
- BrowserSync provides live reload even for PHP template changes
- Same SCSS and JavaScript used for both standalone and WordPress versions

## Project Structure

```
task-1-frontend/
├── src/                      # Source files
│   ├── index.html
│   ├── scss/
│   │   ├── style.scss
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   └── js/
│       └── main.js
│
├── dist/                     # Standalone build output
│
├── wordpress/                # WordPress installation
│   └── wp-content/
│       └── themes/
│           └── frontdev-portfolio/    # Custom theme
│               ├── functions.php      # Theme setup, custom post types
│               ├── index.php          # Main template
│               ├── header.php
│               ├── footer.php
│               ├── assets/            # Built by Gulp
│               └── template-parts/    # Modular sections
│
├── gulpfile.js               # Build configuration
└── package.json
```

## Available Commands

```bash
# Standalone HTML
npm run dev          # Development server + watch
npm run build        # Production build

# WordPress
npm run dev:wp       # WordPress dev with live reload
npm run build:wp     # Build assets to WordPress theme

# WordPress utilities
bash start.sh        # Start WordPress server
bash create-database.sh    # Create MySQL database if needed
```

## Technical Details

**Frontend Stack**
- HTML5 with semantic markup
- SCSS with variables and mixins
- Vanilla JavaScript (ES6+, no frameworks)
- Gulp for task automation
- BrowserSync for live development

**Responsive Breakpoints**
- Mobile: 480px
- Tablet: 768px
- Desktop: 1024px
- Large: 1200px
- XLarge: 1440px

**Accessibility**
- Skip to main content link
- All interactive elements keyboard accessible
- ARIA labels and live regions
- Visible focus indicators
- Color contrast meets WCAG AA standards
- Touch targets minimum 44x44px
- Respects prefers-reduced-motion

**Components**

*Navigation*
- Sticky header
- Mobile hamburger menu with smooth animation
- Desktop mega menu with dropdown
- Keyboard navigable with proper focus management

*Carousel*
- Built with vanilla JavaScript
- Auto-rotates every 5 seconds
- Lazy loads images as they come into view
- Keyboard controls (left/right arrows)
- Pause on hover or focus
- Screen reader announces slide changes

*Multi-Step Form*
- Three steps with progress indicator
- Real-time validation on blur and submit
- Email format, required fields, min length checks
- Clear error messages
- Smooth transitions between steps

*Testimonials*
- Fetches from REST API (JSONPlaceholder for standalone, WordPress REST API for CMS version)
- Loading state with spinner
- Error handling
- Responsive grid layout

**WordPress Integration**

The theme (`wordpress/wp-content/themes/frontdev-portfolio/`) includes:

*functions.php*
- Registers Portfolio and Testimonials custom post types
- Enqueues styles and scripts properly
- Creates custom REST API endpoint
- Handles AJAX form submissions
- Adds custom meta boxes for testimonial email field

*Templates*
- Uses WordPress template hierarchy
- Modular template parts for each section
- Proper escaping and sanitization
- Uses WordPress functions like `wp_enqueue_script()`, `get_header()`, etc.

*Development Workflow*
- Edit files in `src/` directory
- Gulp watches and auto-compiles to both `dist/` and WordPress theme
- BrowserSync proxies WordPress server and provides live reload
- One codebase, two outputs

## Notes

Database credentials are in `wordpress/wp-config.php` (user: wpuser, password: wppass123, database: frontdev_wp). If the database doesn't exist, run `bash create-database.sh` or WordPress will guide you through setup during installation.

The standalone version uses JSONPlaceholder API for testimonials. The WordPress version uses its own REST API endpoint to fetch testimonials from the database.

Form submission is handled differently: standalone logs to console, WordPress sends via AJAX to server-side handler that can email the submission.

All images use lazy loading via IntersectionObserver API for better performance.
