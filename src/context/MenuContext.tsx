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
  // Starters / Appetizers
  { id: '1', name: 'Garlic Bread', description: 'Freshly baked bread with garlic butter and herbs', course: 'Starters', price: 45, imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop' },
  { id: '2', name: 'Chicken Wings (BBQ)', description: 'Crispy chicken wings coated in tangy BBQ sauce', course: 'Starters', price: 85, imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop' },
  { id: '3', name: 'Chicken Wings (Spicy)', description: 'Crispy chicken wings with spicy buffalo sauce', course: 'Starters', price: 85, imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop' },
  { id: '4', name: 'Mozzarella Sticks', description: 'Golden fried mozzarella cheese sticks with marinara sauce', course: 'Starters', price: 65, imageUrl: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=300&fit=crop' },
  { id: '5', name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili sauce', course: 'Starters', price: 55, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
  { id: '6', name: 'Soup of the Day', description: 'Chef\'s daily selection of fresh homemade soup', course: 'Starters', price: 50, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop' },
  { id: '7', name: 'Nachos with Cheese', description: 'Crispy tortilla chips topped with melted cheese and jalapeños', course: 'Starters', price: 70, imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop' },

  // Main Dishes
  { id: '8', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil', course: 'Mains', price: 120, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' },
  { id: '9', name: 'Pepperoni Pizza', description: 'Pizza topped with pepperoni, mozzarella, and tomato sauce', course: 'Mains', price: 135, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop' },
  { id: '10', name: 'Grilled Chicken Breast', description: 'Juicy grilled chicken breast with seasonal vegetables', course: 'Mains', price: 145, imageUrl: 'https://images.unsplash.com/photo-1532636619361-6e5a5d63f5e?w=400&h=300&fit=crop' },
  { id: '11', name: 'Beef Burger with Fries', description: 'Grilled beef patty with lettuce, tomato, and fries', course: 'Mains', price: 125, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
  { id: '12', name: 'Spaghetti Bolognese', description: 'Pasta with rich meat sauce and parmesan cheese', course: 'Mains', price: 115, imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop' },
  { id: '13', name: 'Vegetarian Stir-Fry', description: 'Mixed vegetables stir-fried with tofu and soy sauce', course: 'Mains', price: 105, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' },
  { id: '14', name: 'Fish and Chips', description: 'Beer-battered fish with golden fries and tartar sauce', course: 'Mains', price: 135, imageUrl: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=400&h=300&fit=crop' },
  { id: '15', name: 'Steak and Mashed Potatoes', description: 'Grilled sirloin steak with creamy mashed potatoes', course: 'Mains', price: 195, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop' },

  // Side Dishes
  { id: '16', name: 'French Fries', description: 'Golden crispy fries seasoned with sea salt', course: 'Side Dishes', price: 35, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop' },
  { id: '17', name: 'Onion Rings', description: 'Crispy battered onion rings with dipping sauce', course: 'Side Dishes', price: 45, imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop' },
  { id: '18', name: 'Side Salad', description: 'Fresh mixed greens with house vinaigrette', course: 'Side Dishes', price: 40, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' },
  { id: '19', name: 'Mashed Potatoes', description: 'Creamy mashed potatoes with butter and herbs', course: 'Side Dishes', price: 35, imageUrl: 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?w=400&h=300&fit=crop' },
  { id: '20', name: 'Rice Pilaf', description: 'Fluffy rice with vegetables and aromatic spices', course: 'Side Dishes', price: 30, imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop' },
  { id: '21', name: 'Steamed Vegetables', description: 'Seasonal vegetables steamed to perfection', course: 'Side Dishes', price: 40, imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop' },

  // Desserts
  { id: '22', name: 'Chocolate Cake', description: 'Rich chocolate cake with chocolate frosting', course: 'Desserts', price: 65, imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
  { id: '23', name: 'Cheesecake', description: 'Creamy cheesecake with berry compote', course: 'Desserts', price: 70, imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop' },
  { id: '24', name: 'Ice Cream Sundae', description: 'Vanilla ice cream with chocolate sauce and nuts', course: 'Desserts', price: 55, imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop' },
  { id: '25', name: 'Apple Pie', description: 'Warm apple pie with cinnamon and vanilla ice cream', course: 'Desserts', price: 60, imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a9?w=400&h=300&fit=crop' },
  { id: '26', name: 'Brownies', description: 'Fudgy chocolate brownies with walnuts', course: 'Desserts', price: 50, imageUrl: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=300&fit=crop' },
  { id: '27', name: 'Fruit Salad', description: 'Fresh seasonal fruits with mint garnish', course: 'Desserts', price: 45, imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop' },

  // Drinks
  { id: '28', name: 'Water (Still)', description: 'Refreshing still mineral water', course: 'Drinks', price: 20, imageUrl: 'https://images.unsplash.com/photo-1559839914-17aae19cec4?w=400&h=300&fit=crop' },
  { id: '29', name: 'Water (Sparkling)', description: 'Bubbly sparkling mineral water', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop' },
  { id: '30', name: 'Coke', description: 'Classic Coca-Cola soft drink', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop' },
  { id: '31', name: 'Sprite', description: 'Lemon-lime flavored soft drink', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop' },
  { id: '32', name: 'Fanta', description: 'Orange flavored soft drink', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1624517452488-0482ebb8970b?w=400&h=300&fit=crop' },
  { id: '33', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', course: 'Drinks', price: 35, imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop' },
  { id: '34', name: 'Fresh Apple Juice', description: 'Freshly pressed apple juice', course: 'Drinks', price: 35, imageUrl: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop' },
  { id: '35', name: 'Fresh Mango Juice', description: 'Fresh mango juice with tropical flavor', course: 'Drinks', price: 40, imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop' },
  { id: '36', name: 'Espresso', description: 'Strong Italian-style coffee', course: 'Drinks', price: 30, imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop' },
  { id: '37', name: 'Cappuccino', description: 'Coffee with steamed milk and foam', course: 'Drinks', price: 40, imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53?w=400&h=300&fit=crop' },
  { id: '38', name: 'Latte', description: 'Smooth coffee with steamed milk', course: 'Drinks', price: 45, imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop' },
  { id: '39', name: 'Black Tea', description: 'Traditional black tea with lemon', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' },
  { id: '40', name: 'Green Tea', description: 'Refreshing green tea with jasmine', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=300&fit=crop' },
  { id: '41', name: 'Herbal Tea', description: 'Caffeine-free herbal infusion', course: 'Drinks', price: 25, imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=300&fit=crop' },
  { id: '42', name: 'Vanilla Milkshake', description: 'Creamy vanilla milkshake with whipped cream', course: 'Drinks', price: 50, imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop' },
  { id: '43', name: 'Chocolate Milkshake', description: 'Rich chocolate milkshake with chocolate chips', course: 'Drinks', price: 55, imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
  { id: '44', name: 'Strawberry Milkshake', description: 'Fresh strawberry milkshake with real fruit', course: 'Drinks', price: 55, imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e9ef23d4?w=400&h=300&fit=crop' },
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
