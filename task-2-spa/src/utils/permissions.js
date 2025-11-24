/**
 * Permission utilities for role-based access control
 */

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const canEditUser = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) return false;
  
  // Admins can edit any user
  if (currentUser.role === ROLES.ADMIN) return true;
  
  // Users can only edit their own profile
  return currentUser.id === targetUser.id;
};

export const canDeleteUser = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) return false;
  
  // Only admins can delete users
  if (currentUser.role !== ROLES.ADMIN) return false;
  
  // Cannot delete yourself
  if (currentUser.id === targetUser.id) return false;
  
  // Cannot delete other admins
  if (targetUser.role === ROLES.ADMIN) return false;
  
  return true;
};

export const canCreateUser = (currentUser) => {
  if (!currentUser) return false;
  return currentUser.role === ROLES.ADMIN;
};

export const canChangeRole = (currentUser) => {
  if (!currentUser) return false;
  return currentUser.role === ROLES.ADMIN;
};

export const isAdmin = (user) => {
  return user?.role === ROLES.ADMIN;
};

export const hasPermission = (currentUser, permission, targetUser = null) => {
  switch (permission) {
    case 'edit_user':
      return canEditUser(currentUser, targetUser);
    case 'delete_user':
      return canDeleteUser(currentUser, targetUser);
    case 'create_user':
      return canCreateUser(currentUser);
    case 'change_role':
      return canChangeRole(currentUser);
    default:
      return false;
  }
};
