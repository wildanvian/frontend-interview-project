import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { UilUsersAlt, UilEstate, UilSignOutAlt } from '@iconscout/react-unicons';
import '../styles/main.scss';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="app-layout">
      {isAuthenticated && (
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/dashboard">
              <span className="logo"><UilUsersAlt size="28" /></span>
              <span className="app-name">User Manager</span>
            </Link>
          </div>

          <div className="navbar-menu">
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
              <UilEstate size="20" /> Dashboard
            </Link>
            <Link to="/users" className={isActive('/users') ? 'active' : ''}>
              <UilUsersAlt size="20" /> Users
            </Link>
          </div>

          <div className="navbar-user">
            <div className="user-info">
              <img src={user?.avatar} alt={user?.firstName} className="user-avatar" />
              <div className="user-details">
                <span className="user-name">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="user-role">{user?.role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-logout">
              <UilSignOutAlt size="20" /> Logout
            </button>
          </div>
        </nav>
      )}

      <main className={isAuthenticated ? 'main-content' : 'main-content-public'}>
        {children}
      </main>

      {isAuthenticated && (
        <footer className="footer">
          <p>&copy; 2025 Wildan Arvianto. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
};

export default Layout;
