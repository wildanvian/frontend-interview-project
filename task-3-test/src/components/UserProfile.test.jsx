/**
 * UserProfile Component Tests
 * 
 * This file demonstrates:
 * - Async API calls testing
 * - Loading states
 * - Error handling
 * - Mocking fetch requests
 * - Testing useEffect
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from './UserProfile.jsx';

// Mock the global fetch function
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  
  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // TEST 1: No User Selected
  test('shows "no user selected" message when no userId is provided', () => {
    render(<UserProfile />);
    
    expect(screen.getByText('No user selected')).toBeInTheDocument();
  });

  // TEST 2: Loading State
  test('shows loading indicator while fetching user data', () => {
    // Mock fetch to never resolve (simulate loading)
    global.fetch.mockImplementation(() => new Promise(() => {}));
    
    render(<UserProfile userId={1} />);
    
    // Should show loading message
    expect(screen.getByText('Loading user...')).toBeInTheDocument();
  });

  // TEST 3: Successful API Call
  test('displays user data after successful fetch', async () => {
    // Mock successful API response
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'Acme Corp'
      }
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId={1} />);

    // Wait for user data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check all user details are displayed
    expect(screen.getByTestId('user-email')).toHaveTextContent('Email: john@example.com');
    expect(screen.getByTestId('user-phone')).toHaveTextContent('Phone: 123-456-7890');
    expect(screen.getByTestId('user-website')).toHaveTextContent('Website: johndoe.com');
    expect(screen.getByTestId('user-company')).toHaveTextContent('Acme Corp');
  });

  // TEST 4: API Error - HTTP Error
  test('displays error message when API returns HTTP error', async () => {
    // Mock failed API response (404)
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<UserProfile userId={999} />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Error: HTTP error! status: 404/i)).toBeInTheDocument();
    });

    // Retry button should be visible
    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });

  // TEST 5: API Error - Network Error
  test('displays error message when network request fails', async () => {
    // Mock network error
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<UserProfile userId={1} />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });
  });

  // TEST 6: Retry Functionality
  test('retries fetching user when retry button is clicked', async () => {
    const user = userEvent.setup();

    // First call fails
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(<UserProfile userId={1} />);

    // Wait for error
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
    });

    // Second call succeeds
    const mockUser = {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      website: 'janesmith.com',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    // Click retry button
    const retryButton = screen.getByTestId('retry-button');
    await user.click(retryButton);

    // Should show user data
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  // TEST 7: UserId Change
  test('fetches new user data when userId prop changes', async () => {
    // First user
    const mockUser1 = {
      id: 1,
      name: 'User One',
      email: 'user1@example.com',
      phone: '111-111-1111',
      website: 'user1.com',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser1,
    });

    const { rerender } = render(<UserProfile userId={1} />);

    // Wait for first user
    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    // Second user
    const mockUser2 = {
      id: 2,
      name: 'User Two',
      email: 'user2@example.com',
      phone: '222-222-2222',
      website: 'user2.com',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser2,
    });

    // Change userId
    rerender(<UserProfile userId={2} />);

    // Should fetch and display second user
    await waitFor(() => {
      expect(screen.getByText('User Two')).toBeInTheDocument();
    });
  });

  // TEST 8: User Without Company
  test('handles user data without company information', async () => {
    const mockUser = {
      id: 1,
      name: 'Solo Worker',
      email: 'solo@example.com',
      phone: '555-555-5555',
      website: 'solo.com',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Solo Worker')).toBeInTheDocument();
    });

    // Company section should not exist
    expect(screen.queryByTestId('user-company')).not.toBeInTheDocument();
  });

  // TEST 9: Accessibility - Loading State
  test('has proper accessibility attributes for loading state', () => {
    global.fetch.mockImplementation(() => new Promise(() => {}));
    
    render(<UserProfile userId={1} />);
    
    const loadingElement = screen.getByTestId('loading');
    
    // Should have role and aria-live for screen readers
    expect(loadingElement).toHaveAttribute('role', 'status');
    expect(loadingElement).toHaveAttribute('aria-live', 'polite');
  });

  // TEST 10: Accessibility - Error State
  test('has proper accessibility attributes for error state', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Error'));
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      const errorElement = screen.getByTestId('error');
      expect(errorElement).toHaveAttribute('role', 'alert');
    });
  });

  // TEST 11: Correct API Endpoint
  test('calls the correct API endpoint', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 5, name: 'Test', email: 'test@test.com' }),
    });

    render(<UserProfile userId={5} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/5'
      );
    });
  });

  // TEST 12: Rapid UserId Changes
  test('handles rapid userId changes correctly', async () => {
    const mockUser3 = {
      id: 3,
      name: 'Final User',
      email: 'final@example.com',
      phone: '333-333-3333',
      website: 'final.com',
    };

    // Mock multiple responses
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, name: 'First', email: 'first@test.com' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 2, name: 'Second', email: 'second@test.com' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser3,
      });

    const { rerender } = render(<UserProfile userId={1} />);
    
    // Quickly change userIds
    rerender(<UserProfile userId={2} />);
    rerender(<UserProfile userId={3} />);

    // Should end up showing the final user
    await waitFor(() => {
      expect(screen.getByText('Final User')).toBeInTheDocument();
    });
  });
});
