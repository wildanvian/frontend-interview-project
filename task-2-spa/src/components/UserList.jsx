import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UilPlusCircle, UilSearch, UilEnvelope, UilPhone } from '@iconscout/react-unicons';
import '../styles/main.scss';

const UserList = () => {
  const { users } = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const isAdmin = currentUser?.role === 'admin';

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h1>User Profiles</h1>
        {isAdmin && (
          <Link to="/users/create" className="btn btn-primary">
            <UilPlusCircle size="20" /> Create New User
          </Link>
        )}
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon"><UilSearch size="20" /></span>
        </div>

        <div className="filter-group">
          <label>Filter by Role:</label>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="user-count">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      <div className="user-grid">
        {filteredUsers.map((user) => (
          <Link to={`/users/${user.id}`} key={user.id} className="user-card">
            <div className="user-card-avatar">
              <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              <span className={`role-badge role-${user.role}`}>{user.role}</span>
            </div>
            <div className="user-card-info">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p className="email"><UilEnvelope size="16" /> {user.email}</p>
              {user.phone && <p className="phone"><UilPhone size="16" /> {user.phone}</p>}
              {user.bio && <p className="bio">{user.bio}</p>}
            </div>
          </Link>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">
          <p>No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
