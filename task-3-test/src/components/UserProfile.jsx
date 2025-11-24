import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * UserProfile Component - Demonstrates async API calls and error handling
 */
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div data-testid="loading" role="status" aria-live="polite">
        Loading user...
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error" role="alert">
        <p>Error: {error}</p>
        <button onClick={fetchUser} data-testid="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <div data-testid="no-user">No user selected</div>;
  }

  return (
    <div className="user-profile" data-testid="user-profile">
      <h2>{user.name}</h2>
      <p data-testid="user-email">Email: {user.email}</p>
      <p data-testid="user-phone">Phone: {user.phone}</p>
      <p data-testid="user-website">Website: {user.website}</p>
      {user.company && (
        <div data-testid="user-company">
          <h3>Company</h3>
          <p>{user.company.name}</p>
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.number,
};

export default UserProfile;
