/**
 * User Context
 *
 * This context manages user authentication, state, and role-based permissions.
 * It provides functions for login, logout, and signup, and exposes the current
 * user's information and permissions to the rest of the application.
 *
 * Authentication is based on user codes for simplicity in this demo application.
 */
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserContextValue, UserType } from './src/types/index';

const UserContext = createContext<UserContextValue | undefined>(undefined);

// Pre-seeded users for demonstration purposes
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Christoffel',
    userCode: 'owner123',
    type: 'owner',
  },
  {
    id: '2',
    name: 'John Doe',
    userCode: 'employee123',
    type: 'employee',
  },
  {
    id: '3',
    name: 'Jane Smith',
    userCode: 'customer123',
    type: 'customer',
  },
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (userCode: string): boolean => {
    const user = users.find((u) => u.userCode.toLowerCase() === userCode.toLowerCase());
    if (!user) {
      console.log('Login failed: User not found');
      return false;
    }

    console.log('Login successful for:', user.name);
    setCurrentUser(user);
    return true;
  };

  const signup = (name: string, userCode: string): boolean => {
    if (users.some(u => u.userCode.toLowerCase() === userCode.toLowerCase())) {
        console.log('Signup failed: User code already exists');
        return false;
    }

    const newUser: User = {
        id: String(Date.now()), // Simple unique ID
        name,
        userCode,
        type: 'customer', // New users are customers by default
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    console.log('Signup successful for:', newUser.name);
    // Automatically log in the new user
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    console.log('Logging out user');
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

  const value: UserContextValue = {
    currentUser,
    users,
    login,
    signup,
    logout,
    canAddItem,
    canEditItem,
    canEditPrice,
    canRemoveItem,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};