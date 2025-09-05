/**
 * Menu Context - Global State Management
 *
 * This context provides centralized state management for the menu application.
 * It handles CRUD operations for menu items and calculates course averages.
 *
 * Key Features:
 * - Add new menu items with auto-generated IDs
 * - Remove items by ID
 * - Calculate average prices per course
 * - Memoized computations for performance
 *
 * Data Flow:
 * 1. Components call addItem/removeItem functions
 * 2. State updates trigger re-calculations
 * 3. useMemo ensures expensive calculations only run when needed
 * 4. All consuming components re-render with new data
 */

import React, { createContext, useContext, useMemo, useState } from 'react';
import { MenuItem, Course } from '../types';
import { useUser } from './UserContext';

/**
 * Context value type definition
 * Defines the shape of data and functions available to consuming components
 */
type MenuContextValue = {
  items: MenuItem[];                                    // Array of all menu items
  addItem: (item: Omit<MenuItem, 'id'>) => void;        // Add new item (ID auto-generated)
  removeItem: (id: string) => void;                     // Remove item by ID
  averagesByCourse: Record<Course, number | null>;      // Average prices per course
};

/**
 * Create the React Context
 * This will hold the global menu state and functions
 */
const MenuContext = createContext<MenuContextValue | undefined>(undefined);

/**
 * Initial menu items for demonstration
 * These are sample items that appear when the app first loads
 * In a real app, these would typically come from an API or database
 */
const initialItems: MenuItem[] = [
  // Sample starter item
  { id: '1', name: 'Tomato Bruschetta', description: 'Fresh tomatoes with basil on toast', course: 'Starters', price: 65 },
  // Sample main course item
  { id: '2', name: 'Grilled Ribeye', description: 'Charred ribeye with herb butter', course: 'Mains', price: 220 },
];

export const MenuProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const { canAddItem, canRemoveItem } = useUser();

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    if (!canAddItem()) {
      throw new Error('Insufficient permissions to add menu items');
    }
    const id = Date.now().toString();
    setItems(prev => [...prev, { ...item, id }]);
  };

  const removeItem = (id: string) => {
    if (!canRemoveItem()) {
      throw new Error('Insufficient permissions to remove menu items');
    }
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const averagesByCourse = useMemo(() => {
    const courses: Course[] = ['Starters', 'Mains', 'Dessert'];
    const result: Record<Course, number | null> = {
      Starters: null, Mains: null, Dessert: null
    };

    courses.forEach(c => {
      const filtered = items.filter(i => i.course === c);
      if (filtered.length === 0) {
        result[c] = null;
      } else {
        const sum = filtered.reduce((acc, cur) => acc + cur.price, 0);
        result[c] = Number((sum / filtered.length).toFixed(2));
      }
    });
    return result;
  }, [items]);

  return (
    <MenuContext.Provider value={{ items, addItem, removeItem, averagesByCourse }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within a MenuProvider');
  return ctx;
};
