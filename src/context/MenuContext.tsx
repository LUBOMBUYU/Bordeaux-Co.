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
import { useUser } from './UserContext/UserContext';
import menuImages from '../utils/menuImages';

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
  // Starters / Appetizers
  { id: '1', name: 'Garlic Bread', description: 'Freshly baked bread with garlic butter and herbs', course: 'Starters', price: 45, imageUrl: menuImages['Garlic Bread'] },
  { id: '2', name: 'Chicken Wings (BBQ)', description: 'Crispy chicken wings coated in tangy BBQ sauce', course: 'Starters', price: 85, imageUrl: menuImages['Chicken Wings (BBQ)'] },
  { id: '3', name: 'Chicken Wings (Spicy)', description: 'Crispy chicken wings with spicy buffalo sauce', course: 'Starters', price: 85, imageUrl: menuImages['Chicken Wings (Spicy)'] },
  { id: '4', name: 'Mozzarella Sticks', description: 'Golden fried mozzarella cheese sticks with marinara sauce', course: 'Starters', price: 65, imageUrl: menuImages['Mozzarella Sticks'] },
  { id: '5', name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili sauce', course: 'Starters', price: 55, imageUrl: menuImages['Spring Rolls'] },
  { id: '6', name: 'Soup of the Day', description: 'Chef\'s daily selection of fresh homemade soup', course: 'Starters', price: 50, imageUrl: menuImages['Soup of the Day'] },
  { id: '7', name: 'Nachos with Cheese', description: 'Crispy tortilla chips topped with melted cheese and jalapeños', course: 'Starters', price: 70, imageUrl: menuImages['Nachos with Cheese'] },

  // Main Dishes
  { id: '8', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil', course: 'Mains', price: 120, imageUrl: menuImages['Margherita Pizza'] },
  { id: '9', name: 'Pepperoni Pizza', description: 'Pizza topped with pepperoni, mozzarella, and tomato sauce', course: 'Mains', price: 135, imageUrl: menuImages['Pepperoni Pizza'] },
  { id: '10', name: 'Grilled Chicken Breast', description: 'Juicy grilled chicken breast with seasonal vegetables', course: 'Mains', price: 145, imageUrl: menuImages['Grilled Chicken Breast'] },
  { id: '11', name: 'Beef Burger with Fries', description: 'Grilled beef patty with lettuce, tomato, and fries', course: 'Mains', price: 125, imageUrl: menuImages['Beef Burger with Fries'] },
  { id: '12', name: 'Spaghetti Bolognese', description: 'Pasta with rich meat sauce and parmesan cheese', course: 'Mains', price: 115, imageUrl: menuImages['Spaghetti Bolognese'] },
  { id: '13', name: 'Vegetarian Stir-Fry', description: 'Mixed vegetables stir-fried with tofu and soy sauce', course: 'Mains', price: 105, imageUrl: menuImages['Vegetarian Stir-Fry'] },
  { id: '14', name: 'Fish and Chips', description: 'Beer-battered fish with golden fries and tartar sauce', course: 'Mains', price: 135, imageUrl: menuImages['Fish and Chips'] },
  { id: '15', name: 'Steak and Mashed Potatoes', description: 'Grilled sirloin steak with creamy mashed potatoes', course: 'Mains', price: 195, imageUrl: menuImages['Steak and Mashed Potatoes'] },

  // Side Dishes
  { id: '16', name: 'French Fries', description: 'Golden crispy fries seasoned with sea salt', course: 'Side Dishes', price: 35, imageUrl: menuImages['French Fries'] },
  { id: '17', name: 'Onion Rings', description: 'Crispy battered onion rings with dipping sauce', course: 'Side Dishes', price: 45, imageUrl: menuImages['Onion Rings'] },
  { id: '18', name: 'Side Salad', description: 'Fresh mixed greens with house vinaigrette', course: 'Side Dishes', price: 40, imageUrl: menuImages['Side Salad'] },
  { id: '19', name: 'Mashed Potatoes', description: 'Creamy mashed potatoes with butter and herbs', course: 'Side Dishes', price: 35, imageUrl: menuImages['Mashed Potatoes'] },
  { id: '20', name: 'Rice Pilaf', description: 'Fluffy rice with vegetables and aromatic spices', course: 'Side Dishes', price: 30, imageUrl: menuImages['Rice Pilaf'] },
  { id: '21', name: 'Steamed Vegetables', description: 'Seasonal vegetables steamed to perfection', course: 'Side Dishes', price: 40, imageUrl: menuImages['Steamed Vegetables'] },

  // Desserts
  { id: '22', name: 'Chocolate Cake', description: 'Rich chocolate cake with chocolate frosting', course: 'Desserts', price: 65, imageUrl: menuImages['Chocolate Cake'] },
  { id: '23', name: 'Cheesecake', description: 'Creamy cheesecake with berry compote', course: 'Desserts', price: 70, imageUrl: menuImages['Cheesecake'] },
  { id: '24', name: 'Ice Cream Sundae', description: 'Vanilla ice cream with chocolate sauce and nuts', course: 'Desserts', price: 55, imageUrl: menuImages['Ice Cream Sundae'] },
  { id: '25', name: 'Apple Pie', description: 'Warm apple pie with cinnamon and vanilla ice cream', course: 'Desserts', price: 60, imageUrl: menuImages['Apple Pie'] },
  { id: '26', name: 'Brownies', description: 'Fudgy chocolate brownies with walnuts', course: 'Desserts', price: 50, imageUrl: menuImages['Brownies'] },
  { id: '27', name: 'Fruit Salad', description: 'Fresh seasonal fruits with mint garnish', course: 'Desserts', price: 45, imageUrl: menuImages['Fruit Salad'] },

  // Drinks
  { id: '28', name: 'Water (Still)', description: 'Refreshing still mineral water', course: 'Drinks', price: 20, imageUrl: menuImages['Water (Still)'] },
  { id: '29', name: 'Water (Sparkling)', description: 'Bubbly sparkling mineral water', course: 'Drinks', price: 25, imageUrl: menuImages['Water (Sparkling)'] },
  { id: '30', name: 'Coke', description: 'Classic Coca-Cola soft drink', course: 'Drinks', price: 25, imageUrl: menuImages['Coke'] },
  { id: '31', name: 'Sprite', description: 'Lemon-lime flavored soft drink', course: 'Drinks', price: 25, imageUrl: menuImages['Sprite'] },
  { id: '32', name: 'Fanta', description: 'Orange flavored soft drink', course: 'Drinks', price: 25, imageUrl: menuImages['Fanta'] },
  { id: '33', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', course: 'Drinks', price: 35, imageUrl: menuImages['Fresh Orange Juice'] },
  { id: '34', name: 'Fresh Apple Juice', description: 'Freshly pressed apple juice', course: 'Drinks', price: 35, imageUrl: menuImages['Fresh Apple Juice'] },
  { id: '35', name: 'Fresh Mango Juice', description: 'Fresh mango juice with tropical flavor', course: 'Drinks', price: 40, imageUrl: menuImages['Fresh Mango Juice'] },
  { id: '36', name: 'Espresso', description: 'Strong Italian-style coffee', course: 'Drinks', price: 30, imageUrl: menuImages['Espresso'] },
  { id: '37', name: 'Cappuccino', description: 'Coffee with steamed milk and foam', course: 'Drinks', price: 40, imageUrl: menuImages['Cappuccino'] },
  { id: '38', name: 'Latte', description: 'Smooth coffee with steamed milk', course: 'Drinks', price: 45, imageUrl: menuImages['Latte'] },
  { id: '39', name: 'Black Tea', description: 'Traditional black tea with lemon', course: 'Drinks', price: 25, imageUrl: menuImages['Black Tea'] },
  { id: '40', name: 'Green Tea', description: 'Refreshing green tea with jasmine', course: 'Drinks', price: 25, imageUrl: menuImages['Green Tea'] },
  { id: '41', name: 'Herbal Tea', description: 'Caffeine-free herbal infusion', course: 'Drinks', price: 25, imageUrl: menuImages['Herbal Tea'] },
  { id: '42', name: 'Vanilla Milkshake', description: 'Creamy vanilla milkshake with whipped cream', course: 'Drinks', price: 50, imageUrl: menuImages['Vanilla Milkshake'] },
  { id: '43', name: 'Chocolate Milkshake', description: 'Rich chocolate milkshake with chocolate chips', course: 'Drinks', price: 55, imageUrl: menuImages['Chocolate Milkshake'] },
  { id: '44', name: 'Strawberry Milkshake', description: 'Fresh strawberry milkshake with real fruit', course: 'Drinks', price: 55, imageUrl: menuImages['Strawberry Milkshake'] },
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
    const courses: Course[] = ['Starters', 'Mains', 'Side Dishes', 'Desserts', 'Drinks'];
    const result: Record<Course, number | null> = {
      Starters: null, Mains: null, 'Side Dishes': null, Desserts: null, Drinks: null
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
