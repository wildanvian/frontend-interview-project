# WordPress Theme - FrontDev Portfolio

This is a custom WordPress theme that integrates with the Task 1 frontend project.

## Installation

1. Copy the `frontdev-portfolio` folder to your WordPress installation:
   ```
   wp-content/themes/frontdev-portfolio/
   ```

2. Log in to WordPress admin
3. Go to **Appearance → Themes**
4. Activate **FrontDev Portfolio**

## Theme Features

- Custom post types: Portfolio and Testimonials
- REST API endpoint: `/wp-json/frontdev/v1/testimonials`
- AJAX form handling for contact submissions
- Responsive design with compiled assets
- Full accessibility support (WCAG 2.1)

## Development Workflow

The theme uses Gulp to compile assets from the main project:

```bash
# From the main project directory
npm run build:wp
```

This compiles SCSS and JavaScript into the theme's `assets/` folder.

## Theme Structure

```
frontdev-portfolio/
├── style.css              # Theme header (required by WordPress)
├── functions.php          # Theme setup, custom post types, REST API
├── index.php             # Main template
├── header.php            # Site header
├── footer.php            # Site footer
├── assets/               # Compiled CSS/JS from Gulp
│   ├── css/
│   └── js/
└── template-parts/       # Modular template sections
    ├── hero.php
    ├── services.php
    ├── portfolio.php
    ├── testimonials.php
    └── contact.php
```

## Custom Post Types

### Portfolio
- Supports: title, editor, thumbnail
- Archive: yes
- REST API enabled

### Testimonials
- Supports: title, editor
- Custom meta field: email
- REST API enabled

## Requirements

- WordPress 5.0+
- PHP 7.2+
- MySQL 5.6+

## Note for Reviewers

This folder contains ONLY the custom theme files. It should be placed in a working WordPress installation's `wp-content/themes/` directory. WordPress core files are not included to keep the repository lightweight.
