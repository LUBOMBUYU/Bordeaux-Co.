/**
 * Type Definitions for Christoffel's Menu Application
 *
 * This file contains all the TypeScript type definitions used throughout the app.
 * These types ensure type safety and provide IntelliSense support.
 */

/**
 * Course Types
 *
 * Defines the five main course categories for menu items.
 * These represent the complete structure of a restaurant menu:
 * - Starters: Appetizers and first courses
 * - Mains: Main dishes and entrees
 * - Side Dishes: Accompaniments and sides
 * - Desserts: Sweet dishes and final courses
 * - Drinks: Beverages and refreshments
 */
export type Course = 'Starters' | 'Mains' | 'Side Dishes' | 'Desserts' | 'Drinks';

/**
 * Menu Item Interface
 *
 * Represents a single menu item with all its properties.
 * This is the core data structure used throughout the application.
 */
export interface MenuItem {
  id: string;           // Unique identifier (auto-generated using Date.now())
  name: string;         // Display name of the menu item
  description: string;  // Detailed description of the dish
  course: Course;       // Which course category this item belongs to
  price: number;        // Price in South African Rand (ZAR)
  imageUrl?: string;    // Optional image URL or path for the menu item
}

/**
 * User Types
 *
 * Defines the three user types in the system:
 * - owner: Full access to all features
 * - employee: Can add/edit menu items but not prices
 * - customer: Read-only access to menu
 */
export type UserType = 'owner' | 'employee' | 'customer';

/**
 * User Interface
 *
 * Represents a user in the system with authentication details.
 */
export interface User {
  id: string;           // Unique identifier
  name: string;         // Display name of the user
  userCode: string;     // Distinct user code for login
  password: string;     // Password for secure authentication
  type: UserType;       // User type determining permissions
}

/**
 * User Context Value Type
 *
 * Defines the shape of data and functions available in UserContext.
 */
export type UserContextValue = {
  currentUser: User | null;                    // Currently logged-in user
  users: User[];                              // Array of all users
  login: (userCode: string, password: string) => boolean; // Login function with user code and password
  signup: (name: string, userCode: string, password: string) => boolean; // Signup function
  logout: () => void;                         // Logout function
  canAddItem: () => boolean;                  // Check if user can add items
  canEditItem: () => boolean;                 // Check if user can edit items
  canEditPrice: () => boolean;                // Check if user can edit prices
  canRemoveItem: () => boolean;               // Check if user can remove items
};
