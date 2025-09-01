import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuItemCard from '../src/components/MenuItemCard';
import { MenuItem } from '../src/types';

const mockItem: MenuItem = {
  id: '1',
  name: 'Test Dish',
  description: 'Test Description',
  course: 'Mains',
  price: 100,
};

describe('MenuItemCard', () => {
  it('renders item details correctly', () => {
    const { getByText } = render(<MenuItemCard item={mockItem} />);
    expect(getByText('Test Dish')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('Mains')).toBeTruthy();
    expect(getByText(/R/)).toBeTruthy();
  });

  it('calls onRemove when Remove button is pressed', () => {
    const onRemoveMock = jest.fn();
    const { getByText } = render(<MenuItemCard item={mockItem} onRemove={onRemoveMock} />);
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
    expect(onRemoveMock).toHaveBeenCalledWith('1');
  });
});
