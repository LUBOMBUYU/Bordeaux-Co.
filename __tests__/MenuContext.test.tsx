import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MenuProvider, useMenu } from '../src/context/MenuContext';
import { MenuItem } from '../src/types';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MenuProvider>{children}</MenuProvider>
);

describe('MenuContext', () => {
  it('should add an item', () => {
    const { result } = renderHook(() => useMenu(), { wrapper });

    const newItem = {
      name: 'Test Dish',
      description: 'Test Description',
      course: 'Mains' as const,
      price: 100,
    };

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.items.some(item => item.name === 'Test Dish')).toBe(true);
  });

  it('should remove an item', () => {
    const { result } = renderHook(() => useMenu(), { wrapper });

    const newItem = {
      name: 'To Remove',
      description: 'Remove Description',
      course: 'Starters' as const,
      price: 50,
    };

    act(() => {
      result.current.addItem(newItem);
    });

    const addedItem = result.current.items.find(item => item.name === 'To Remove');
    expect(addedItem).toBeDefined();

    if (addedItem) {
      act(() => {
        result.current.removeItem(addedItem.id);
      });
      expect(result.current.items.some(item => item.id === addedItem.id)).toBe(false);
    }
  });

  it('should calculate averages by course correctly', () => {
    const { result } = renderHook(() => useMenu(), { wrapper });

    // Clear initial items first
    result.current.items.forEach(item => {
      act(() => {
        result.current.removeItem(item.id);
      });
    });

    act(() => {
      result.current.addItem({
        name: 'Starter Dish',
        description: 'Starter Desc',
        course: 'Starters',
        price: 100,
      });
      result.current.addItem({
        name: 'Main Dish',
        description: 'Main Desc',
        course: 'Mains',
        price: 200,
      });
      result.current.addItem({
        name: 'Main Dish 2',
        description: 'Main Desc 2',
        course: 'Mains',
        price: 300,
      });
    });

    const averages = result.current.averagesByCourse;
    expect(averages.Starters).toBeCloseTo(100);
    expect(averages.Mains).toBeCloseTo(250);
    expect(averages.Dessert).toBeNull();
  });
});
