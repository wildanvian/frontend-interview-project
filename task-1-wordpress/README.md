# WordPress Theme - FrontDev Portfolio

> **Note**: This folder contains only the custom WordPress theme files that can be imported into any WordPress installation. The theme integrates with the Task 1 frontend project.

## 📦 What's Included

This package contains:
- Custom WordPress theme: **FrontDev Portfolio**
- Setup scripts for quick WordPress installation (optional)
- Theme structure ready for import

## 🚀 Quick Import

### Option 1: Import Theme Only (Recommended)

1. Copy the theme folder to your WordPress installation:
   ```bash
   cp -r wp-content/themes/frontdev-portfolio /path/to/wordpress/wp-content/themes/
   ```

2. Log in to WordPress admin
3. Go to **Appearance → Themes**
4. Activate **FrontDev Portfolio**

### Option 2: Use Automated Setup Scripts

If you don't have WordPress installed, use the included scripts:

```bash
# 1. Setup WordPress (creates config, installs theme)
bash setup-wordpress.sh

# 2. Start WordPress server
bash start.sh
```

Then complete WordPress installation at `http://localhost:8080`

## 📁 Theme Structure

```
wp-content/themes/frontdev-portfolio/
├── style.css              # Theme header (required by WordPress)
├── functions.php          # Theme setup, custom post types, REST API
├── index.php             # Main template
├── header.php            # Site header
├── footer.php            # Site footer
├── assets/               # Compiled CSS/JS from Task 1 Gulp
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── template-parts/       # Modular template sections
    ├── hero.php
    ├── services.php
    ├── portfolio.php
    ├── testimonials.php
    └── contact.php
```

## ✨ Theme Features

- **Custom Post Types**: Portfolio and Testimonials
- **REST API Endpoint**: `/wp-json/frontdev/v1/testimonials`
- **AJAX Form Handling**: Contact form submissions
- **Responsive Design**: Mobile-first with compiled assets
- **Accessibility**: WCAG 2.1 compliant
- **Modular Templates**: Reusable template parts

## 🎨 Asset Integration

The theme includes pre-compiled CSS and JavaScript from Task 1 frontend project:

- **CSS**: Compiled from SCSS with Gulp (`assets/css/style.css`)
- **JavaScript**: Bundled and minified (`assets/js/main.js`)
- **Images**: Optimized assets included

### Building Assets (For Development)

If you need to rebuild assets from the main project:

```bash
# From the task-1-frontend directory
npm run build:wp
```

This compiles SCSS and JavaScript into the theme's `assets/` folder.

## 📝 Custom Post Types

### Portfolio
- **Supports**: title, editor, thumbnail
- **Archive**: yes
- **REST API**: enabled
- **Menu Order**: custom ordering

### Testimonials
- **Supports**: title, editor
- **Custom Meta**: email field
- **REST API**: enabled
- **Used in**: Dynamic testimonials section

## 💻 Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.2 or higher
- **MySQL**: 5.6 or higher (or MariaDB equivalent)

## 📋 Setup Scripts Included

This package includes helper scripts for quick setup:

| Script | Purpose |
|--------|---------|
| `setup-wordpress.sh` | Creates WordPress config and installs theme |
| `start.sh` | Starts PHP development server |
| `start-wordpress.sh` | Alternative start script |
| `create-database.sh` | Helper for database creation |

## 🎯 Usage

This folder structure allows you to:

1. **Quick Import**: Copy theme folder to any WordPress installation
2. **Automated Setup**: Use scripts for fresh WordPress setup
3. **Review Code**: Inspect theme files without full WordPress core
4. **Test Integration**: See how frontend integrates with CMS

### What to Expect

- Clean, well-documented theme code
- Custom post types for portfolio management
- REST API integration for dynamic content
- Responsive design matching Task 1 frontend
- Accessibility-first approach

## 📖 Related Projects

- **Task 1 Frontend**: `../task-1-frontend/` - Static HTML/SCSS/JS with Gulp
- **Main README**: `../README.md` - Full project overview

## 🔧 Development Notes

### Theme Assets
Assets are pre-compiled from the Task 1 frontend project. The theme loads:
- Compiled CSS from Gulp build process
- Minified JavaScript with all functionality
- Optimized images and fonts

### Template Structure
The theme uses WordPress template hierarchy with custom template parts for modularity and maintainability.

### REST API
Custom endpoint provides testimonials data:
```
GET /wp-json/frontdev/v1/testimonials
```

Returns JSON array of testimonial posts with title, content, and email.

## 📄 License

This is a technical interview project for demonstration purposes.
