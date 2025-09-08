# App Navigation Diagram

## Overview
This document provides a comprehensive diagram of the Christoffel's Menu app navigation structure, showing all screens, navigation flows, and user interaction paths.

## Navigation Architecture

### Stack Navigation Structure
```
NavigationContainer
└── Stack.Navigator (initialRouteName: "Login")
    ├── LoginScreen
    │   ├── Navigate to Signup → SignupScreen
    │   └── Login Success → HomeScreen
    │
    ├── SignupScreen
    │   ├── Navigate to Login → LoginScreen
    │   └── Signup Success → HomeScreen
    │
    ├── HomeScreen (Main Menu)
    │   ├── Navigate to AddItem → AddItemScreen
    │   ├── Navigate to Filter → FilterScreen
    │   ├── Navigate to Basket → BasketScreen
    │   └── Logout → LoginScreen
    │
    ├── AddItemScreen
    │   ├── Save Success → HomeScreen (goBack)
    │   ├── Navigate to Filter → FilterScreen
    │   └── Back to Home → HomeScreen (goBack)
    │
    ├── FilterScreen
    │   ├── Navigate to Home → HomeScreen
    │   ├── Navigate to AddItem → AddItemScreen
    │   └── Navigate to Basket → BasketScreen
    │
    └── BasketScreen
        ├── Checkout Success → HomeScreen (replace)
        └── Back to Previous → Previous Screen (goBack)
```

## Screen Flow Diagrams

### Authentication Flow
```
┌─────────────┐     Login     ┌─────────────┐
│             │──────────────►│             │
│ LoginScreen │               │ HomeScreen  │
│             │◄──────────────│             │
└──────┬──────┘   Logout      └─────────────┘
       │
       │ Signup
       ▼
┌─────────────┐     Login     ┌─────────────┐
│             │──────────────►│             │
│ SignupScreen│               │ HomeScreen  │
│             │◄──────────────│             │
└─────────────┘   Logout      └─────────────┘
```

### Menu Management Flow
```
┌─────────────┐     Add Item    ┌─────────────┐
│             │◄────────────────┤             │
│ HomeScreen  │────────────────►│AddItemScreen│
│             │◄────────────────┤             │
└──────┬──────┘   Filter        └─────────────┘
       │
       │ Filter
       ▼
┌─────────────┐     Add Item    ┌─────────────┐
│             │◄────────────────┤             │
│FilterScreen │────────────────►│AddItemScreen│
│             │◄────────────────┤             │
└─────────────┘   Home          └─────────────┘
```

## Navigation Implementation Details

### Stack Screen Options
```typescript
// Login Screen
<Stack.Screen
  name="Login"
  component={LoginScreen}
  options={{ title: 'Login' }}
/>

// Home Screen
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: "Christoffel's Menu" }}
/>

// Add Item Screen
<Stack.Screen
  name="AddItem"
  component={AddItemScreen}
  options={{ title: 'Add Menu Item' }}
/>

// Filter Screen
<Stack.Screen
  name="Filter"
  component={FilterScreen}
  options={{ title: 'Filter by Course' }}
/>
```

### Navigation Methods Used

#### Programmatic Navigation
- `navigation.navigate('ScreenName')` - Navigate to screen
- `navigation.goBack()` - Go back to previous screen
- `navigation.replace('ScreenName')` - Replace current screen

#### Conditional Navigation
- Login success → HomeScreen
- Logout → LoginScreen (replace to prevent back navigation)
- Save item success → HomeScreen (goBack)

## User Experience Flow

### New User Journey
1. **App Launch** → LoginScreen
2. **Click "Sign Up"** → SignupScreen
3. **Complete Registration** → HomeScreen
4. **Explore Menu** → FilterScreen (optional)
5. **Add Items to Basket** → BasketScreen
6. **Manage Basket** → Adjust quantities, remove items
7. **Checkout** → Payment simulation → HomeScreen
8. **Add Items** → AddItemScreen (if permitted)
9. **Logout** → LoginScreen

### Returning User Journey
1. **App Launch** → LoginScreen
2. **Enter Credentials** → HomeScreen
3. **Browse Menu** → FilterScreen
4. **Add Items to Basket** → BasketScreen
5. **Manage Basket** → Adjust quantities, checkout
6. **Manage Items** → AddItemScreen (if permitted)
7. **Logout** → LoginScreen

## Permission-Based Navigation

### Owner User
- ✅ Can access all screens
- ✅ Can add items with price editing
- ✅ Can remove items
- ✅ Full menu management

### Employee User
- ✅ Can access all screens
- ❌ Cannot edit prices (disabled input)
- ✅ Can add items without price
- ❌ Cannot remove items (no remove button)

### Customer User
- ✅ Can view HomeScreen and FilterScreen
- ❌ Cannot access AddItemScreen
- ❌ Cannot add or remove items
- ✅ Read-only access

## Navigation Guards

### Authentication Guards
- Unauthenticated users redirected to LoginScreen
- Login required for HomeScreen, AddItemScreen, FilterScreen, BasketScreen

### Permission Guards
- Role-based access control implemented in components
- UI elements conditionally rendered based on user permissions
- Form fields disabled/enabled based on user type

## Error Handling in Navigation

### Network Errors
- Navigation continues with local state
- Error boundaries catch navigation errors

### Authentication Errors
- Invalid login → Stay on LoginScreen with error message
- Session expired → Redirect to LoginScreen

### Permission Errors
- Attempted unauthorized action → Show permission message
- No navigation block, just UI restriction

## Performance Considerations

### Navigation Performance
- Lazy loading of screens
- Memoized navigation callbacks
- Optimized re-renders

### State Management
- Context providers for global state
- Local state for screen-specific data
- Debounced search for performance

This navigation structure provides a complete, user-friendly experience with proper authentication, permission handling, and error management.
