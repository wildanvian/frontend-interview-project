import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UilUsersAlt, UilAward, UilUser, UilClipboardAlt, UilPlusCircle, UilUserCircle } from '@iconscout/react-unicons';
import '../styles/main.scss';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  const isAdmin = user?.role === 'admin';

  const stats = {
    totalUsers: users.length,
    admins: users.filter((u) => u.role === 'admin').length,
    regularUsers: users.filter((u) => u.role === 'user').length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName}!</h1>
        <p>Manage user profiles and view system statistics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><UilUsersAlt size="48" /></div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><UilAward size="48" /></div>
          <div className="stat-content">
            <h3>{stats.admins}</h3>
            <p>Administrators</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><UilUser size="48" /></div>
          <div className="stat-content">
            <h3>{stats.regularUsers}</h3>
            <p>Regular Users</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/users" className="btn btn-primary">
            <UilClipboardAlt size="20" />
            View All Users
          </Link>
          {isAdmin && (
            <Link to="/users/create" className="btn btn-success">
              <UilPlusCircle size="20" />
              Create New User
            </Link>
          )}
          <Link to={`/users/${user?.id}`} className="btn btn-secondary">
            <UilUserCircle size="20" />
            My Profile
          </Link>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Users</h2>
        <div className="user-list-mini">
          {users.slice(0, 5).map((u) => (
            <Link to={`/users/${u.id}`} key={u.id} className="user-mini-card">
              <img src={u.avatar} alt={`${u.firstName} ${u.lastName}`} />
              <div className="user-mini-info">
                <h4>
                  {u.firstName} {u.lastName}
                </h4>
                <p>{u.email}</p>
              </div>
              <span className={`role-badge role-${u.role}`}>{u.role}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
