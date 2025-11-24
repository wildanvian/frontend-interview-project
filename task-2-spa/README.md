# User Profile Management SPA

A modern single-page application (SPA) for managing user profiles with authentication, built with React, Redux Toolkit, and React Router.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 and login with demo credentials:
- **Admin**: admin@example.com / admin123
- **User**: john.doe@example.com / user123

## ✅ Features Implemented

### Task 2 Requirements (All Completed)

✔️ **Modern JavaScript Framework**: React 19.2 with Vite  
✔️ **User Authentication**: Login/Register with validation  
✔️ **CRUD Operations**: Create, Read, Update, Delete user profiles  
✔️ **State Management**: Redux Toolkit with persistent storage  
✔️ **Client-Side Routing**: React Router with protected routes  

### Additional Features

- Search and filter users by name/email/role
- Responsive design (mobile, tablet, desktop)
- Form validation with error messages
- Confirmation modals for destructive actions
- Statistics dashboard
- Avatar generation
- Modern UI with SCSS

## 🏗️ Project Structure

```
task-2-spa/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Login.jsx        # Login form
│   │   ├── Register.jsx     # Registration form
│   │   ├── UserList.jsx     # User list with search
│   │   ├── UserDetail.jsx   # User profile view
│   │   ├── UserForm.jsx     # Create/Edit form
│   │   ├── Layout.jsx       # App layout
│   │   └── PrivateRoute.jsx # Route protection
│   ├── store/               # Redux store
│   │   ├── store.js         # Store configuration
│   │   ├── authSlice.js     # Auth state
│   │   └── userSlice.js     # User management
│   └── styles/              # SCSS styles
│       ├── global.scss      # Global variables & utilities
│       └── components/      # Component-specific styles
├── package.json
└── vite.config.js
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool |
| Redux Toolkit | 2.11.0 | State management |
| React Router | 7.9.6 | Client-side routing |
| Sass | Latest | CSS preprocessing |

## 📋 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 Key Features

### Authentication
- Login with email/password validation
- User registration with comprehensive validation
- Protected routes (redirect to login if not authenticated)
- Session persistence with localStorage
- Secure logout

### User Management
- **Dashboard**: Statistics and quick actions
- **User List**: Grid view with search and filters
- **User Profile**: Detailed view with contact info
- **Create User**: Form with validation
- **Edit User**: Update existing profiles
- **Delete User**: Remove with confirmation

### UI/UX
- Fully responsive design
- Search by name/email
- Filter by role (admin/user)
- Loading states
- Error handling
- Smooth animations
- Role-based badges

## 🎨 Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/` | - | No | Redirects to dashboard or login |
| `/login` | Login | No | Login form |
| `/register` | Register | No | Registration form |
| `/dashboard` | Dashboard | Yes | Main dashboard |
| `/users` | UserList | Yes | User list with search |
| `/users/create` | UserForm | Yes | Create new user |
| `/users/:id` | UserDetail | Yes | View user profile |
| `/users/:id/edit` | UserForm | Yes | Edit user profile |

## 🔒 State Management

### Redux Store Structure

```javascript
{
  auth: {
    user: { id, email, firstName, lastName, role },
    isAuthenticated: boolean,
    token: string
  },
  users: {
    users: [{ id, email, firstName, lastName, phone, bio, role, avatar }],
    currentProfile: object | null
  }
}
```

### Key Actions

**Auth**: `loginSuccess`, `logout`, `loadUser`  
**Users**: `createUser`, `updateUser`, `deleteUser`, `setCurrentProfile`

## 🎨 Styling Architecture

SCSS files are organized in a proper 7-1 folder structure:

```
src/styles/
├── main.scss                # Main entry point
├── abstracts/               # Variables, mixins, functions
│   ├── _index.scss
│   ├── _variables.scss
│   └── _mixins.scss
├── base/                    # Base styles, resets
│   ├── _index.scss
│   ├── _reset.scss
│   └── _typography.scss
├── components/              # Component-specific styles
│   ├── _index.scss
│   ├── _badges.scss
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   └── _modals.scss
├── layout/                  # Layout components
│   ├── _index.scss
│   ├── _container.scss
│   ├── _header.scss
│   └── _footer.scss
├── pages/                   # Page-specific styles
│   ├── _index.scss
│   ├── _auth.scss
│   ├── _dashboard.scss
│   └── _users.scss
└── utilities/               # Utility classes
    ├── _index.scss
    └── _utilities.scss
```

**Benefits**:
- Centralized style management
- Easy to maintain and scale
- Clear separation of concerns
- Reusable variables and mixins
- Modern SASS with `@use` (no deprecated `@import`)
- Industry-standard 7-1 pattern

## 🚀 Deployment

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Or Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --dir=dist
```

### Production Build

```bash
npm run build
# Output: dist/ directory
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for custom configuration:

```bash
VITE_API_URL=https://api.example.com
```

### SCSS Variables

Edit `src/styles/abstracts/_variables.scss` to customize colors:

```scss
$primary-color: #4f46e5;
$success-color: #10b981;
$danger-color: #ef4444;
```

## 📝 Development Notes

### Why Redux Toolkit?
- Simplified Redux with less boilerplate
- Built-in best practices
- Excellent DevTools integration
- Easy to learn and use

### Why Separate SCSS Folder?
- **Better organization**: All styles in one place
- **Easier maintenance**: Find styles quickly
- **Scalability**: Easy to add new style files
- **Reusability**: Global variables accessible everywhere
- **Industry standard**: Common pattern in large projects

### Form Validation
- Real-time validation feedback
- Email format checking
- Password strength requirements
- Duplicate email detection
- Custom error messages

## 🐛 Troubleshooting

**Port already in use**:
```bash
npx kill-port 5173
npm run dev
```

**Build errors**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Can't login**:
- Verify demo credentials
- Check browser console
- Clear localStorage: `localStorage.clear()`

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev/guide)

## 📄 License

This is a technical interview project for demonstration purposes.

## 👤 Author

Wildan - Front End Developer Candidate

---

**Built with React + Vite + Redux Toolkit** 🚀
