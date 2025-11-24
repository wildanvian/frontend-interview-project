import { createSlice } from '@reduxjs/toolkit';

// Initialize users from localStorage or use demo data
const loadUsers = () => {
  const stored = localStorage.getItem('users');
  if (stored) {
    return JSON.parse(stored);
  }
  // Demo users
  return [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff',
      bio: 'System Administrator',
      role: 'admin',
    },
    {
      id: '2',
      email: 'john.doe@example.com',
      password: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff',
      bio: 'Software Developer',
      role: 'user',
    },
  ];
};

const initialState = {
  users: loadUsers(),
  currentProfile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now().toString(),
        avatar: `https://ui-avatars.com/api/?name=${action.payload.firstName}+${action.payload.lastName}&background=random&color=fff`,
      };
      state.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      const userToDelete = state.users.find((user) => user.id === userId);
      
      // Prevent deletion of admin users (additional safety check)
      if (userToDelete && userToDelete.role !== 'admin') {
        state.users = state.users.filter((user) => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    clearCurrentProfile: (state) => {
      state.currentProfile = null;
    },
  },
});

export const { createUser, updateUser, deleteUser, setCurrentProfile, clearCurrentProfile } =
  userSlice.actions;
export default userSlice.reducer;
