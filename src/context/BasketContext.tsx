import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from '../types';

export interface BasketItem extends MenuItem {
  quantity: number;
}

export type BasketContextValue = {
  basketItems: BasketItem[];
  addToBasket: (item: MenuItem, quantity?: number) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  getTotal: () => number;
};

const BasketContext = createContext<BasketContextValue | undefined>(undefined);

export const BasketProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const addToBasket = (item: MenuItem, quantity: number = 1) => {
    setBasketItems(prevItems => {
      const existing = prevItems.find(i => i.id === item.id);
      if (existing) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromBasket = (id: string) => {
    setBasketItems(prevItems => prevItems.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(id);
      return;
    }
    setBasketItems(prevItems =>
      prevItems.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const getTotal = () => {
    return basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <BasketContext.Provider
      value={{ basketItems, addToBasket, removeFromBasket, updateQuantity, clearBasket, getTotal }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used within a BasketProvider');
  return ctx;
};
