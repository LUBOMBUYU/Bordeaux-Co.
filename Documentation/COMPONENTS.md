# Components in the Project

This document explains the different components in the project and how they are used in React Native.

## 1. ErrorBoundary.tsx
- **Location**: `src/components/ErrorBoundary.tsx`
- **Styles**: Integrated within component (no separate style file)
- **Type**: Class Component extending React.Component
- **Purpose**: Catches JavaScript errors anywhere in the component tree and displays a fallback UI

### State Management:
- `hasError: boolean` - Tracks if an error has occurred
- `error?: Error` - Stores the caught error object

### Lifecycle Methods:
- `static getDerivedStateFromError(error: Error)` - Updates state when error occurs
- `componentDidCatch(error: Error, errorInfo: React.ErrorInfo)` - Logs error details to console

### Functions:
- `resetError()` - Resets error state and calls optional onReset prop

### UI Components:
- **Container View**: Main wrapper with centered layout and background color
- **Title Text**: "Something went wrong" with danger color and bold font
- **Message Text**: Displays error message or default text, centered alignment
- **Try Again Button**: Pressable component with primary background color and white text

### Animations:
- No animations implemented

### Props:
- `children: React.ReactNode` - Child components to render normally
- `onReset?: () => void` - Optional callback when error is reset

### Error Handling:
- Catches errors in child component tree
- Displays user-friendly error message
- Provides recovery mechanism via "Try Again" button
- Logs detailed error information for debugging

## 2. MenuItemCard.tsx
- **Location**: `src/components/MenuItemCard.tsx`
- **Styles**: `src/styles/MenuItemCardStyles.ts`
- **Type**: Functional Component with memo optimization
- **Purpose**: Displays individual menu items with remove functionality

### State Management:
- `scale: Animated.Value` - Controls card scale animation (initialized to 1)
- `visible: boolean` - Controls card visibility for removal animation

### Hooks Used:
- `useRef()` - Creates persistent Animated.Value reference
- `useState()` - Manages visibility state
- `useUser()` - Accesses user permissions from context

### Functions:
- `animate(to: number)` - Performs spring animation on card scale
- `handleRemove()` - Handles remove button press with animation and callback

### UI Components:
- **Animated.View**: Main card container with scale transformation
- **Row View**: Horizontal layout for title and price
- **Title Text**: Menu item name with bold styling
- **Price Text**: Formatted price using ZAR currency utility
- **Meta Text**: Course category display
- **Description Text**: Item description text
- **Remove Button**: Pressable component with conditional rendering based on permissions

### Animations:
- **Scale Animation**: Spring animation on press (0.98 scale) and release (1.0 scale)
- **Layout Animation**: EaseInEaseOut animation when card is removed
- **Visibility Animation**: Card fades out before removal with 300ms delay

### Props:
- `item: MenuItem` - Menu item data object
- `onRemove?: (id: string) => void` - Optional callback for item removal

### Permission System:
- Uses `canRemoveItem()` from UserContext to conditionally show remove button
- Button only appears for users with removal permissions

### Performance Optimizations:
- Wrapped with `React.memo()` to prevent unnecessary re-renders
- Callback memoization for event handlers
- LayoutAnimation for smooth list updates

## 3. SearchBar.tsx
- **Location**: `src/components/SearchBar.tsx`
- **Styles**: `src/styles/SearchBarStyles.ts`
- **Type**: Functional Component
- **Purpose**: Provides search functionality for filtering menu items

### State Management:
- No local state - uses props for controlled input

### Functions:
- `handleClear()` - Clears the search input by calling onChangeText with empty string

### UI Components:
- **Container View**: Main wrapper for search bar layout
- **TextInput**: Primary input field with placeholder and styling
- **Clear Button**: Pressable component with "✕" symbol, conditionally rendered

### Animations:
- No animations implemented

### Props:
- `value: string` - Current search input value (controlled component)
- `onChangeText: (text: string) => void` - Callback for text changes
- `placeholder?: string` - Optional placeholder text (defaults to "Search...")

### Input Configuration:
- `autoCorrect={false}` - Disables autocorrect for search
- `autoCapitalize="none"` - Prevents automatic capitalization
- `clearButtonMode="while-editing"` - Shows iOS clear button
- `placeholderTextColor` - Uses muted color from theme

### Clear Button Logic:
- Only renders when `value.length > 0`
- Pressing clears the input via `onChangeText('')`
- Uses "✕" Unicode character for cross symbol

### Styling:
- Container provides layout and spacing
- Input field has border, padding, and background color
- Clear button positioned absolutely within container

## Context Components

## 4. MenuContext.tsx
- **Location**: `src/context/MenuContext.tsx`
- **Styles**: No styles (logic-only component)
- A React Context for managing menu state.
- Provides functions to add, remove, and manage menu items.
- Calculates average prices per course.
- Includes role-based permission checks.
- Used throughout the app to access menu data and functions.

## 5. BasketContext.tsx
- **Location**: `src/context/BasketContext.tsx`
- **Styles**: No styles (logic-only component)
- A React Context for managing shopping basket/cart state.
- Handles adding items to basket, updating quantities, and removing items.
- Calculates real-time basket total price.
- Manages basket persistence during navigation.
- Provides basket operations throughout the app.

## 6. UserContext.tsx
- **Location**: `src/context/UserContext.tsx`
- **Styles**: No styles (logic-only component)
- A React Context for managing user authentication and permissions.
- Handles user login, signup, and logout.
- Provides role-based permission functions.
- Manages current user state.
- Used to control access to features based on user type.

## Screen Components

## 6. AddItemScreen.tsx
- **Location**: `src/screens/AddItemScreen.tsx`
- **Styles**: `src/styles/AddItemScreenStyles.ts`
- **Type**: Functional Component with navigation
- **Purpose**: Screen for adding new menu items with form validation

### State Management:
- `name: string` - Menu item name input
- `desc: string` - Menu item description input
- `price: string` - Menu item price input
- `course: Course` - Selected course category

### Hooks Used:
- `useRef()` - Creates Animated.Value for button animations
- `useState()` - Manages form input states
- `useMenu()` - Accesses menu context for adding items
- `useUser()` - Accesses user context for permission checks

### Functions:
- `onSave()` - Validates form and adds item to menu
- `animate(to: number)` - Handles button press animations
- `handleBackPress()` - Navigation back to home screen

### UI Components:
- **KeyboardAvoidingView**: Main container with keyboard handling
- **ScrollView**: Scrollable content area with bottom padding
- **Form Container View**: Groups form elements with styling
- **Section Title Text**: "Add New Menu Item" heading
- **Label Texts**: Field labels for name, description, price, course
- **TextInput Fields**: Name, description (multiline), price inputs
- **Picker**: Course selection dropdown with emoji labels
- **Animated.View**: Save button with scale animation
- **Save Button**: Primary action button with validation
- **Navigation Buttons**: Back to Home and Browse Menu buttons

### Animations:
- **Button Scale Animation**: Spring animation (0.98 scale on press, 1.0 on release)
- **Keyboard Avoidance**: Automatic scrolling when keyboard appears

### Form Validation:
- Required field validation for name, description, price
- Numeric validation for price (must be positive number)
- Alert dialogs for validation errors and success messages

### Permission System:
- Price input disabled for non-owners via `canEditPrice()`
- Permission notice text displayed when price editing is restricted

### Navigation:
- Success navigation back to home after item creation
- Direct navigation to Filter screen for browsing
- Back button navigation to home screen

## 7. FilterScreen.tsx
- **Location**: `src/screens/FilterScreen.tsx`
- **Styles**: `src/styles/FilterScreenStyles.ts`
- **Type**: Functional Component with navigation
- **Purpose**: Screen for filtering menu items by course category

### State Management:
- `course: Course` - Currently selected course filter

### Hooks Used:
- `useState()` - Manages selected course state
- `useMenu()` - Accesses menu items from context
- `useCallback()` - Memoizes course change handler

### Functions:
- `handleCourseChange(v: Course)` - Updates selected course filter

### UI Components:
- **Container View**: Main screen wrapper
- **Label Text**: "Select Course Category" instruction
- **Picker Container View**: Wrapper for picker component
- **Picker**: Dropdown selector with course options and emojis
- **FlatList**: Displays filtered menu items
- **Navigation Buttons Container**: Bottom navigation area
- **Back to Home Button**: Navigation to home screen
- **Add New Item Button**: Navigation to add item screen

### Animations:
- No animations implemented

### Filtering Logic:
- Real-time filtering based on selected course
- Uses `useMemo()` for performance optimization
- Filters items where `item.course === course`

### Picker Configuration:
- Three course options: Starters, Mains, Dessert
- Emoji labels for visual appeal: 🍽️, 🍖, 🍰
- Text color from theme colors

### List Rendering:
- `FlatList` with optimized rendering
- `MenuItemCard` components for each filtered item
- Empty state message when no items match filter
- Content container padding for consistent spacing

### Navigation:
- Back navigation to Home screen
- Forward navigation to AddItem screen

## 8. HomeScreens.tsx
- **Location**: `src/screens/HomeScreens.tsx`
- **Styles**: `src/styles/HomeScreens.ts`
- **Type**: Functional Component with navigation
- **Purpose**: Main home screen displaying menu items with search, sort, and navigation

### State Management:
- `searchTerm: string` - Current search input value
- `debouncedSearchTerm: string` - Debounced search term for performance
- `sortOption: 'name' | 'priceAsc' | 'priceDesc'` - Current sorting preference

### Hooks Used:
- `useMemo()` - Memoizes filtered and sorted items
- `useState()` - Manages search and sort state
- `useEffect()` - Implements search debouncing
- `useCallback()` - Memoizes event handlers
- `useMenu()` - Accesses menu data and functions
- `useUser()` - Accesses user authentication and permissions

### Functions:
- `handleRemoveItem(id: string)` - Removes menu item with callback memoization
- `handleLogout()` - Shows confirmation alert and logs out user
- `filteredItems` - Memoized filtering logic combining search and sort
- `averagesRow` - Memoized average price badges rendering

### UI Components:
- **SafeAreaView**: Main container with safe area handling
- **Header Area View**: Top section with logo and branding
- **Image**: Restaurant logo with contain resize mode
- **Title Text**: "Christoffel's Menu" with bold styling
- **Subtitle Text**: "Total Items: {count}" display
- **User Info Text**: Shows logged-in user name and type
- **Badge Row View**: Horizontal layout for average price badges
- **Badge Views**: Individual course average displays
- **SearchBar Component**: Reusable search input component
- **Navigation Buttons Container**: Horizontal button layout
- **Add Item Button**: Conditional rendering based on permissions
- **Filter Button**: Navigation to filter screen
- **Logout Button**: Destructive action button with danger color
- **Sort Options Container**: Vertical button group for sorting
- **Sort Buttons**: Three sorting options with active state styling
- **FlatList**: Virtualized list for menu items with performance optimization

### Animations:
- No animations implemented in this component

### Search and Filtering:
- **Debounced Search**: 300ms delay to reduce filtering frequency
- **Multi-field Search**: Searches both name and description
- **Case-insensitive**: Converts search term to lowercase
- **Real-time Updates**: Immediate visual feedback on search changes

### Sorting Options:
- **Sort by Name**: Alphabetical sorting (A-Z)
- **Sort by Price ↑**: Ascending price order (low to high)
- **Sort by Price ↓**: Descending price order (high to low)
- **Active State**: Visual indication of current sort option

### Average Price Display:
- **Course Averages**: Calculated from MenuContext
- **Badge Format**: "Course: R{price}" or "Course: —" for no items
- **Real-time Updates**: Automatically updates when menu changes

### Permission System:
- **Add Item Button**: Only visible to users with `canAddItem()` permission
- **Remove Functionality**: Passed to MenuItemCard components
- **User Display**: Shows current user information

### Performance Optimizations:
- **FlatList Virtualization**: `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`
- **Memoized Filtering**: Prevents unnecessary recalculations
- **Callback Memoization**: Stable function references for child components
- **Clipped Subviews**: Optimizes rendering for large lists

### Navigation:
- **AddItem Screen**: Conditional navigation for item creation
- **Filter Screen**: Navigation for course-based filtering
- **Login Screen**: Navigation after logout with screen replacement

## 9. LoginScreen.tsx
- **Location**: `src/screens/LoginScreen.tsx`
- **Styles**: `src/styles/SignupScreenStyles.ts` (shared with SignupScreen)
- **Type**: Functional Component with navigation
- **Purpose**: Authentication screen for user login with user code validation

### State Management:
- `userCode: string` - Current user code input value

### Hooks Used:
- `useState()` - Manages user code input state
- `useUser()` - Accesses user authentication context

### Functions:
- `handleLogin()` - Validates and processes login attempt

### UI Components:
- **SafeAreaView**: Main container with safe area handling
- **ScrollView**: Scrollable content area with centered layout
- **Header Container View**: Top section with logo and branding
- **Image**: Restaurant logo with contain resize mode
- **Title Text**: "Christoffel's Menu" with bold styling and primary color
- **Subtitle Text**: "Login with your user code" instruction
- **Form Container View**: Groups input field with styling
- **Label Text**: "Enter User Code:" field label
- **TextInput**: User code input field with validation styling
- **Login Button**: Primary action button with pressable animation
- **Login Button Text**: "Login" text with white color and bold font
- **Signup Link**: Pressable text for navigation to signup screen
- **Demo Section View**: Container for demo user codes display
- **Demo Title Text**: "Available User Codes (Demo):" heading
- **User Code List**: Mapped list of demo user codes with name, type, and code

### Animations:
- No animations implemented

### Input Configuration:
- `autoCapitalize="characters"` - Forces uppercase input
- `autoCorrect={false}` - Disables autocorrect
- `placeholder="e.g., OWNER001"` - Example user code format
- `placeholderTextColor` - Uses muted color from theme

### Form Validation:
- **Required Field**: Alerts if user code is empty
- **Authentication**: Calls `login()` from UserContext with uppercase code
- **Success Navigation**: Replaces screen with Home on successful login
- **Error Handling**: Shows alert for invalid user codes

### Demo User Codes Display:
- **Dynamic List**: Maps through `users` array from UserContext
- **User Info Format**: "{name} ({type}): {userCode}"
- **Text Styling**: Uses muted color for demo information

### Navigation:
- **Success**: Navigation to Home screen with screen replacement
- **Signup**: Navigation to Signup screen
- **Error**: Stays on login screen with error message

### Permission System:
- No permission checks - accessible to all users
- User type determined by successful login

## 10. BasketScreen.tsx
- **Location**: `src/screens/BasketScreen.tsx`
- **Styles**: `src/styles/BasketScreenStyles.ts`
- **Type**: Functional Component with navigation
- **Purpose**: Screen for managing shopping basket/cart with quantity controls and checkout

### State Management:
- No local state - uses BasketContext for all basket operations

### Hooks Used:
- `useBasket()` - Accesses basket context for items, total, and operations
- `useNavigation()` - Accesses navigation for back navigation

### Functions:
- `handleIncreaseQuantity(itemId: string)` - Increases item quantity by 1
- `handleDecreaseQuantity(itemId: string)` - Decreases item quantity by 1
- `handleRemoveItem(itemId: string)` - Removes item from basket with confirmation
- `handleCheckout()` - Processes payment simulation and clears basket

### UI Components:
- **SafeAreaView**: Main container with safe area handling
- **Header Container View**: Top section with basket title and back navigation
- **Basket Title Text**: "Shopping Basket" with bold styling
- **Empty Basket View**: Display when basket is empty with message and icon
- **FlatList**: Displays basket items with quantity controls
- **Basket Item View**: Individual item display with name, price, quantity controls
- **Quantity Controls**: +/- buttons for adjusting item quantities
- **Remove Button**: Trash icon button for removing items
- **Total Section View**: Bottom section showing basket total
- **Total Text**: "Total: R{total}" with bold styling
- **Checkout Button**: Primary action button for payment processing

### Animations:
- No animations implemented

### Basket Operations:
- **Quantity Management**: Real-time updates to item quantities
- **Price Calculation**: Automatic total recalculation on quantity changes
- **Item Removal**: Confirmation dialog before removing items
- **Checkout Process**: Simulated payment with success message

### Navigation:
- **Back Navigation**: Returns to previous screen (Home or Filter)
- **Checkout Success**: Navigation back to Home screen with basket cleared

### Permission System:
- No permission checks - accessible to all authenticated users
- Basket functionality available to all user types

## 11. SignupScreen.tsx
- **Location**: `src/screens/SignupScreen.tsx`
- **Styles**: `src/styles/SignupScreenStyles.ts` (shared with LoginScreen)
- **Type**: Functional Component with navigation
- **Purpose**: User registration screen for creating new accounts with form validation

### State Management:
- `name: string` - User name input value
- `userCode: string` - User code input value

### Hooks Used:
- `useState()` - Manages form input states
- `useUser()` - Accesses user authentication context

### Functions:
- `handleSignup()` - Validates and processes signup attempt

### UI Components:
- **SafeAreaView**: Main container with safe area handling
- **ScrollView**: Scrollable content area with centered layout
- **Header Container View**: Top section with logo and branding
- **Image**: Restaurant logo with contain resize mode
- **Title Text**: "Christoffel's Menu" with bold styling and primary color
- **Subtitle Text**: "Create your account" instruction
- **Form Container View**: Groups input fields with styling
- **Label Texts**: Field labels for name and user code
- **TextInput Fields**: Name and user code inputs with validation styling
- **Signup Button**: Primary action button with pressable animation
- **Signup Button Text**: "Sign Up" text with white color and bold font
- **Login Link**: Pressable text for navigation to login screen
- **Demo Section View**: Container for demo user codes display
- **Demo Title Text**: "Available User Codes (Demo):" heading
- **User Code List**: Mapped list of demo user codes with name, type, and code

### Animations:
- No animations implemented

### Input Configuration:
- **Name Input**: `autoCapitalize="words"` for proper name formatting
- **User Code Input**: `autoCapitalize="characters"` for uppercase codes
- **Both Inputs**: `autoCorrect={false}` to disable autocorrect
- **Placeholders**: "Enter your name" and "e.g., STAFF001"
- **Placeholder Colors**: Uses muted color from theme

### Form Validation:
- **Required Fields**: Alerts if name or user code is empty
- **User Code Format**: Must be uppercase (automatically converted)
- **Signup Process**: Calls `signup()` from UserContext
- **Success Navigation**: Replaces screen with Home on successful signup
- **Error Handling**: Shows alert for signup failures (duplicate codes, etc.)

### Demo User Codes Display:
- **Dynamic List**: Maps through `users` array from UserContext
- **User Info Format**: "{name} ({type}): {userCode}"
- **Text Styling**: Uses muted color for demo information
- **Purpose**: Helps users understand available user types and code formats

### Navigation:
- **Success**: Navigation to Home screen with screen replacement
- **Login**: Navigation to Login screen
- **Error**: Stays on signup screen with error message

### Permission System:
- No permission checks - accessible to all users
- User type determined by user code format during signup

## Utility Components

## 11. App.tsx
- **Location**: `App.tsx` (root level)
- **Styles**: No styles (navigation setup only)
- The root component of the React Native app.
- Sets up navigation and context providers.
- Wraps the entire app with UserProvider and MenuProvider.

## 12. index.ts
- **Location**: `index.ts` (root level)
- **Styles**: No styles (entry point only)
- The entry point of the app.
- Registers the App component with React Native.

## Style Files Organization

### Screen Styles
- **AddItemScreenStyles.ts**: `src/styles/AddItemScreenStyles.ts`
  - Form containers, input fields, buttons, validation styles
  - Enhanced with shadows, better spacing, and consistent theming

- **HomeScreens.ts**: `src/styles/HomeScreens.ts`
  - Header styling, navigation buttons, sort options
  - Card layouts, badge styling for averages

- **FilterScreenStyles.ts**: `src/styles/FilterScreenStyles.ts`
  - Picker styling, navigation buttons, empty state

- **SignupScreenStyles.ts**: `src/styles/SignupScreenStyles.ts`
  - Shared between LoginScreen and SignupScreen
  - Form inputs, buttons, layout containers

### Component Styles
- **MenuItemCardStyles.ts**: `src/styles/MenuItemCardStyles.ts`
  - Card layout, text styling, remove button

- **SearchBarStyles.ts**: `src/styles/SearchBarStyles.ts`
  - Input field styling, container layout

### Theme and Colors
- **colors.ts**: `src/theme/colors.ts`
  - Centralized color definitions
  - Brand colors, semantic colors, UI element colors

## How Components Work Together

### Component Hierarchy:
```
App.tsx (Root)
├── UserProvider (Context)
│   ├── MenuProvider (Context)
│   │   ├── BasketProvider (Context)
│   │   │   ├── Stack.Navigator (Navigation)
│   │   │   │   ├── LoginScreen
│   │   │   │   ├── SignupScreen
│   │   │   │   ├── HomeScreens
│   │   │   │   ├── AddItemScreen
│   │   │   │   ├── FilterScreen
│   │   │   │   ├── BasketScreen
│   │   │   │   └── SearchBar
│   │   │   └── MenuItemCard (used in HomeScreens and FilterScreen)
│   │   └── ErrorBoundary (Error handling)
└── ErrorBoundary (Error handling)
```

### Data Flow:
1. **User Authentication**: UserContext manages user state and permissions
2. **Menu Management**: MenuContext manages menu items and operations
3. **Navigation**: React Navigation handles screen transitions
4. **UI Components**: Reusable components like MenuItemCard and SearchBar
5. **Error Handling**: ErrorBoundary catches and handles errors

### Key Patterns Used:
- **Context API**: For global state management (UserContext, MenuContext)
- **React Navigation**: For screen navigation
- **Role-Based Access**: Permission checks throughout the app
- **Reusable Components**: MenuItemCard, SearchBar for consistent UI
- **Error Boundaries**: For graceful error handling
- **TypeScript**: For type safety and better development experience

### Component Communication:
- **Props**: For passing data from parent to child components
- **Context**: For accessing global state from any component
- **Callbacks**: For child components to communicate back to parents
- **Navigation**: For programmatic screen transitions

### Style Architecture:
- **Centralized Colors**: All colors defined in `src/theme/colors.ts`
- **Screen-Specific Styles**: Each screen has its own style file
- **Component Styles**: Reusable components have dedicated style files
- **Consistent Theming**: All styles follow the UI Design Guide principles
- **Performance Optimized**: Uses StyleSheet.create() for optimal rendering

This architecture provides a scalable, maintainable React Native application with clear separation of concerns, proper state management, and consistent styling throughout all components and screens.
