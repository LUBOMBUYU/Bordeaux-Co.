import React, { createContext, useContext, useMemo, useState } from 'react';
import { MenuItem, Course } from '../types';

type MenuContextValue = {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  removeItem: (id: string) => void;
  averagesByCourse: Record<Course, number | null>;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const initialItems: MenuItem[] = [
  // Seed with a couple of examples (not hardcoded at runtime; you can clear these)
  { id: '1', name: 'Tomato Bruschetta', description: 'Fresh tomatoes with basil on toast', course: 'Starters', price: 65 },
  { id: '2', name: 'Grilled Ribeye', description: 'Charred ribeye with herb butter', course: 'Mains', price: 220 },
];

export const MenuProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const id = Date.now().toString();
    setItems(prev => [...prev, { ...item, id }]);
  };

  const removeItem = (id: string) => {
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
