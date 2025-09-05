/**
 * User Context - Global State Management for User Authentication
 *
 * This context provides centralized state management for user authentication and role-based access control.
 * It handles user login/logout and permission checks for menu operations.
 *
 * Key Features:
 * - User authentication using distinct user codes
 * - Role-based permissions (owner, employee, customer)
 * - Permission checks for menu operations
 *
 * Data Flow:
 * 1. Components call login/logout functions
 * 2. State updates trigger permission re-evaluations
 * 3. All consuming components re-render with updated permissions
 */

import React, { createContext, useContext, useState } from 'react';
import { User, UserContextValue, UserType } from '../types';

/**
 * Initial users array
 * These are sample users with distinct user codes for demonstration
 * In a real app, these would typically come from an API or database
 */
const initialUsers: User[] = [
  // Owner user
  { id: '1', name: 'Christoffel', userCode: 'OWNER001', type: 'owner' },
  // Sample employee users
  { id: '2', name: 'Employee 1', userCode: 'EMP001', type: 'employee' },
  { id: '3', name: 'Employee 2', userCode: 'EMP002', type: 'employee' },
  // Sample customer users
  { id: '4', name: 'Customer 1', userCode: 'CUST001', type: 'customer' },
  { id: '5', name: 'Customer 2', userCode: 'CUST002', type: 'customer' },
];

/**
 * Create the React Context
 * This will hold the global user state and functions
 */
const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users] = useState<User[]>(initialUsers);

  const login = (userCode: string): boolean => {
    const user = users.find(u => u.userCode === userCode);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = (name: string, userCode: string): boolean => {
    const exists = users.some(u => u.userCode === userCode);
    if (exists) {
      return false;
    }
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      userCode,
      type: 'customer' as const,
    };
    setCurrentUser(newUser);
    users.push(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const canAddItem = (): boolean => {
    return currentUser?.type === 'owner' || currentUser?.type === 'employee';
  };

  const canEditItem = (): boolean => {
    return currentUser?.type === 'owner' || currentUser?.type === 'employee';
  };

  const canEditPrice = (): boolean => {
    return currentUser?.type === 'owner';
  };

  const canRemoveItem = (): boolean => {
    return currentUser?.type === 'owner';
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      users,
      login,
      signup,
      logout,
      canAddItem,
      canEditItem,
      canEditPrice,
      canRemoveItem
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
};
