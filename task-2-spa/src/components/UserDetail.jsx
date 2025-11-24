import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteUser } from '../store/userSlice';
import { UilArrowLeft, UilEdit, UilTrashAlt, UilEnvelope, UilPhone, UilUser, UilUserCircle } from '@iconscout/react-unicons';
import '../styles/main.scss';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const user = useSelector((state) => state.users.users.find((u) => u.id === id));
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/users');
    }
  }, [user, navigate]);

  const handleDelete = () => {
    dispatch(deleteUser(id));
    navigate('/users');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const isOwnProfile = currentUser?.id === user.id;
  const isCurrentUserAdmin = currentUser?.role === 'admin';
  const canEdit = isOwnProfile || isCurrentUserAdmin;
  const canDelete = isCurrentUserAdmin && !isOwnProfile;

  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <Link to="/users" className="btn btn-back">
          <UilArrowLeft size="20" /> Back to Users
        </Link>
        <div className="action-buttons">
          {canEdit && (
            <Link to={`/users/${id}/edit`} className="btn btn-primary">
              <UilEdit size="20" /> Edit Profile
            </Link>
          )}
          {canDelete && (
            <button onClick={() => setShowDeleteModal(true)} className="btn btn-danger">
              <UilTrashAlt size="20" /> Delete User
            </button>
          )}
        </div>
      </div>

      <div className="user-profile-card">
        <div className="profile-header">
          <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="avatar" />
          <div className="profile-info">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <span className={`role-badge role-${user.role}`}>{user.role}</span>
            {isOwnProfile && <span className="badge-current">You</span>}
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h2>Contact Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label"><UilEnvelope size="16" /> Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
              {user.phone && (
                <div className="detail-item">
                  <span className="detail-label"><UilPhone size="16" /> Phone</span>
                  <span className="detail-value">{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {user.bio && (
            <div className="detail-section">
              <h2>Biography</h2>
              <p className="bio-text">{user.bio}</p>
            </div>
          )}

          <div className="detail-section">
            <h2>Account Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label"><UilUser size="16" /> User ID</span>
                <span className="detail-value">{user.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><UilUserCircle size="16" /> Role</span>
                <span className="detail-value">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
