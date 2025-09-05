/**
 * Type Definitions for Christoffel's Menu Application
 *
 * This file contains all the TypeScript type definitions used throughout the app.
 * These types ensure type safety and provide IntelliSense support.
 */

/**
 * Course Types
 *
 * Defines the three main course categories for menu items.
 * These represent the traditional structure of a restaurant menu:
 * - Starters: Appetizers and first courses
 * - Mains: Main dishes and entrees
 * - Dessert: Sweet dishes and final courses
 */
export type Course = 'Starters' | 'Mains' | 'Dessert';

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
}
