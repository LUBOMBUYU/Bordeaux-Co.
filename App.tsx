/**
 * Main Application Entry Point
 *
 * This is the root component of the Christoffel's Menu React Native application.
 * It sets up the navigation structure and provides global context providers.
 *
 * Architecture:
 * - ErrorBoundary: Catches and handles JavaScript errors gracefully
 * - MenuProvider: Provides menu state management via React Context
 * - NavigationContainer: Manages navigation state and deep linking
 * - Stack.Navigator: Handles screen transitions with native stack animation
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreens';
import AddItemScreen from './src/screens/AddItemScreen';
import FilterScreen from './src/screens/FilterScreen';
import { MenuProvider } from './src/context/MenuContext';
import ErrorBoundary from './src/components/ErrorBoundary';

/**
 * Type definition for navigation parameters
 * Each screen in the stack navigator has a corresponding entry here
 */
export type RootStackParamList = {
  Home: undefined;        // Home screen - no parameters needed
  AddItem: undefined;     // Add item screen - no parameters needed
  Filter: undefined;      // Filter screen - no parameters needed
};

/**
 * Create the native stack navigator instance
 * This provides the navigation functionality for screen transitions
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root App Component
 *
 * Component hierarchy:
 * App
 * ├── ErrorBoundary (catches crashes)
 *     ├── MenuProvider (global state)
 *         ├── NavigationContainer (navigation state)
 *             └── Stack.Navigator (screen management)
 *                 ├── HomeScreen
 *                 ├── AddItemScreen
 *                 └── FilterScreen
 */
export default function App() {
  return (
    // Error boundary catches any JavaScript errors in child components
    <ErrorBoundary>
      {/* MenuProvider provides menu state to all child components */}
      <MenuProvider>
        {/* NavigationContainer manages navigation state and deep linking */}
        <NavigationContainer>
          {/* Stack Navigator handles screen transitions with native animations */}
          <Stack.Navigator>
            {/* Home screen - main menu display */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Christoffel's Menu" }}
            />
            {/* Add item screen - form for creating new menu items */}
            <Stack.Screen
              name="AddItem"
              component={AddItemScreen}
              options={{ title: 'Add Menu Item' }}
            />
            {/* Filter screen - course-based filtering */}
            <Stack.Screen
              name="Filter"
              component={FilterScreen}
              options={{ title: 'Filter by Course' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </ErrorBoundary>
  );
}
