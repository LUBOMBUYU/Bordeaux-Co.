import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuItemCard from '../src/components/MenuItemCard';
import { MenuItem } from '../src/types';
import { UserProvider } from '../src/context/UserContext';

// Mock the useUser hook to return an owner user for testing
jest.mock('../src/context/UserContext', () => ({
  ...jest.requireActual('../src/context/UserContext'),
  useUser: () => ({
    currentUser: { id: '1', name: 'Test Owner', userCode: 'owner123', type: 'owner' },
    users: [],
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    canAddItem: () => true,
    canEditItem: () => true,
    canEditPrice: () => true,
    canRemoveItem: () => true,
  }),
}));

const mockItem: MenuItem = {
  id: '1',
  name: 'Test Dish',
  description: 'Test Description',
  course: 'Mains',
  price: 100,
};

describe('MenuItemCard', () => {
  it('renders item details correctly', () => {
    const { getByText } = render(
      <UserProvider>
        <MenuItemCard item={mockItem} />
      </UserProvider>
    );
    expect(getByText('Test Dish')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByText('Mains')).toBeTruthy();
    expect(getByText(/R/)).toBeTruthy();
  });

  it('calls onRemove when Remove button is pressed', async () => {
    const onRemoveMock = jest.fn();
    const { getByText } = render(
      <UserProvider>
        <MenuItemCard item={mockItem} onRemove={onRemoveMock} />
      </UserProvider>
    );
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    // Wait for the animation delay (300ms) plus some buffer
    await new Promise(resolve => setTimeout(resolve, 350));

    expect(onRemoveMock).toHaveBeenCalledWith('1');
  });
});
