import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createUser, updateUser } from '../store/userSlice';
import { UilArrowLeft, UilSave, UilPlusCircle } from '@iconscout/react-unicons';
import '../styles/main.scss';

const UserForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingUser = useSelector((state) =>
    state.users.users.find((u) => u.id === id)
  );
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    role: 'user',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && existingUser) {
      // Check permissions: only allow editing own profile or if user is admin
      const isOwnProfile = currentUser?.id === existingUser.id;
      const isAdmin = currentUser?.role === 'admin';
      
      if (!isOwnProfile && !isAdmin) {
        navigate('/users');
        return;
      }

      setFormData({
        firstName: existingUser.firstName || '',
        lastName: existingUser.lastName || '',
        email: existingUser.email || '',
        phone: existingUser.phone || '',
        bio: existingUser.bio || '',
        role: existingUser.role || 'user',
        password: existingUser.password || '',
      });
    }
  }, [isEditMode, existingUser, currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else {
      // Check if email exists (excluding current user in edit mode)
      const emailExists = users.find(
        (u) => u.email === formData.email && (!isEditMode || u.id !== id)
      );
      if (emailExists) {
        newErrors.email = 'Email already exists';
      }
    }

    if (!isEditMode && !formData.password) {
      newErrors.password = 'Password is required for new users';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEditMode) {
      dispatch(updateUser({ ...formData, id }));
    } else {
      dispatch(createUser(formData));
    }

    navigate('/users');
  };

  return (
    <div className="user-form-container">
      <div className="user-form-card">
        <div className="form-header">
          <Link to="/users" className="btn btn-back">
            <UilArrowLeft size="20" /> Back
          </Link>
          <h1>{isEditMode ? 'Edit User Profile' : 'Create New User'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Account Settings</h2>

            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <select 
                id="role" 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                disabled={currentUser?.role !== 'admin'}
              >
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
              {currentUser?.role !== 'admin' && (
                <span className="error-text">Only administrators can change user roles</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password {!isEditMode && '*'} {isEditMode && '(leave blank to keep current)'}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>

            <div className="form-group">
              <label htmlFor="bio">Biography</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about this user"
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/users')} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? <><UilSave size="20" /> Update User</> : <><UilPlusCircle size="20" /> Create User</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
