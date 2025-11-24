# Frontend Developer Technical Assessment

A comprehensive demonstration of modern frontend development skills, including responsive design with WordPress CMS integration, React SPA with state management, and professional testing practices.

---

## 📋 Overview

This repository contains three complete projects showcasing expertise in:

- **Modern Frontend Development**: HTML5, CSS3/SCSS, JavaScript ES6+
- **Framework Proficiency**: React 19, Redux Toolkit, React Router
- **Build Tools**: Gulp, Vite
- **CMS Integration**: WordPress theme development with REST API
- **Testing**: Jest, React Testing Library, 98% code coverage
- **Best Practices**: Accessibility (WCAG 2.1), responsive design, SEO optimization

---

## 🗂️ Project Structure

```
interview-project/
├── task-1-frontend/         # Responsive Website (Vanilla JS + Gulp)
├── task-1-wordpress/        # WordPress Theme Integration
├── task-2-spa/              # React SPA (User Management)
└── task-3-test/             # Testing Suite (Jest + RTL)
```

---

## 📝 Tasks

### Task 1: HTML/CSS/JavaScript + WordPress

A fully responsive portfolio website with WordPress CMS integration featuring custom carousel, multi-step form, and WCAG 2.1 compliance.

**Key Features:**
- Custom carousel/slider with lazy loading (vanilla JS)
- Multi-step form with real-time validation
- Responsive navigation (mega menu + hamburger)
- Dynamic testimonials via REST API
- WordPress custom theme with post types
- Gulp automation with BrowserSync

**Tech Stack:** Vanilla JavaScript (ES6+), SCSS, Gulp 5.0, WordPress 6.x, PHP

**Quick Start:**
```bash
cd task-1-frontend
npm install
npm run dev          # Standalone version
npm run dev:wp       # WordPress version
```

**📖 [Full Documentation](./task-1-frontend/README.md) | [WordPress Theme](./task-1-wordpress/README.md)**

---

### Task 2: React SPA with Authentication

A modern single-page application for user profile management with authentication, CRUD operations, and Redux state management.

**Key Features:**
- User authentication (login/register) with protected routes
- Full CRUD operations for user profiles
- Redux Toolkit for state management
- React Router for client-side routing
- Search and filter functionality
- SASS 7-1 Architecture
- Fully responsive design

**Tech Stack:** React 19.2, Redux Toolkit 2.11, React Router 7.9, Vite 7.2, SCSS

**Demo Credentials:**
- Admin: `admin@example.com` / `admin123`
- User: `john.doe@example.com` / `user123`

**Quick Start:**
```bash
cd task-2-spa
npm install
npm run dev
```

**📖 [Full Documentation](./task-2-spa/README.md) | [SASS Architecture](./task-2-spa/SASS-ARCHITECTURE.md)**

---

### Task 3: Advanced Testing

Comprehensive testing suite with 25 professional tests demonstrating best practices in unit and integration testing.

**Key Features:**
- 25 comprehensive tests across 2 components
- 98% code coverage
- Async testing (API calls, loading states)
- Edge cases and error handling
- Accessibility testing (ARIA)
- Fully documented with testing guide

**Tech Stack:** Jest 30.2, React Testing Library 16.3, Babel

**Test Coverage:**
```
File              | % Stmts | % Branch | % Funcs | % Lines 
------------------|---------|----------|---------|----------
TodoList.jsx      |   97.05 |       96 |   94.11 |   96.55
UserProfile.jsx   |     100 |      100 |     100 |     100
```

**Quick Start:**
```bash
cd task-3-test
npm install
npm test                # Watch mode
npm run test:coverage   # Coverage report
```

**📖 [Full Documentation](./task-3-test/README.md) | [Testing Guide](./task-3-test/TESTING_GUIDE.md) | [Summary](./task-3-test/SUMMARY.md)**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Git
- Modern web browser

### Clone & Run
```bash
git clone https://github.com/wildanvian/frontend-interview-project.git
cd frontend-interview-project

# Choose a task to run (see individual README files for detailed instructions)
```

---

## ⭐ Key Highlights

### Technical Excellence
- ✅ **Accessibility**: WCAG 2.1 Level AA compliant
- ✅ **Performance**: Lazy loading, code splitting, optimized builds
- ✅ **Responsive**: Mobile-first design with multiple breakpoints
- ✅ **Modern Practices**: React 19, Redux Toolkit, modern SASS (@use)
- ✅ **Testing**: 98% code coverage with comprehensive test suites

### Code Quality
- Clean, maintainable, well-documented code
- Industry-standard architecture patterns
- Separation of concerns
- DRY principles
- Production-ready

### Documentation
Each task includes comprehensive documentation covering:
- Architecture decisions
- Setup instructions
- Code organization
- API documentation
- Testing strategies

---

## 🛠️ Technologies Summary

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19.2, Vanilla JS (ES6+), HTML5, SCSS |
| **State Management** | Redux Toolkit 2.11 |
| **Build Tools** | Vite 7.2, Gulp 5.0 |
| **Testing** | Jest 30.2, React Testing Library 16.3 |
| **CMS** | WordPress 6.x, PHP 7.4+ |
| **Other** | React Router 7.9, BrowserSync, ESLint, Babel |

---

## 📚 Documentation

Detailed documentation for each task:

- **[Task 1 Frontend README](./task-1-frontend/README.md)** - HTML/CSS/JS with Gulp
- **[Task 1 WordPress README](./task-1-wordpress/README.md)** - WordPress theme integration
- **[Task 2 README](./task-2-spa/README.md)** - React SPA
- **[Task 2 SASS Architecture](./task-2-spa/SASS-ARCHITECTURE.md)** - Style organization
- **[Task 3 README](./task-3-test/README.md)** - Testing suite
- **[Task 3 Testing Guide](./task-3-test/TESTING_GUIDE.md)** - Testing patterns
- **[Task 3 Summary](./task-3-test/SUMMARY.md)** - Testing overview

---

## 📞 Contact

**Repository**: [github.com/wildanvian/frontend-interview-project](https://github.com/wildanvian/frontend-interview-project)