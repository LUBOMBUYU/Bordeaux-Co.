import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreens';
import AddItemScreen from './src/screens/AddItemScreen';
import FilterScreen from './src/screens/FilterScreen';
import { MenuProvider } from './src/context/MenuContext';
import ErrorBoundary from './src/components/ErrorBoundary';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ErrorBoundary>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Christoffel's Menu" }} />
            <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Add Menu Item' }} />
            <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Filter by Course' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </ErrorBoundary>
  );
}
