# Christoffel's Menu - React Native App

<p align="center">
  <img src="assets/Bordeaux_and_Co.jpeg" alt="Christoffel's Menu Logo" width="200"/>
</p>

A modern, elegant restaurant menu management application built with React Native and Expo. This app allows restaurant staff to manage menu items, track pricing, and maintain an organized digital menu system.

## Features

### 🔐 User-Based Login System
- **Role-Based Access**: Three user types - Owner, Employee, and Customer
- **Secure Login**: Username and password authentication with password hashing (SHA-256).
- **Permission Management**: Granular access levels for menu management.
- **Owner Access**: Full control over menu items (add, edit, remove)
- **Employee Access**: Can add items but cannot modify prices
- **Customer Access**: Read-only access to menu browsing

### 🏠 Home Screen
- **Menu Display**: View all menu items in a clean, scrollable list
- **Search Functionality**: Real-time search through menu items by name or description
- **Sorting Options**: Sort items alphabetically or by price (ascending/descending)
- **Course Averages**: Display average prices for each course (Starters, Mains, Dessert)
- **Restaurant Branding**: Custom logo display with elegant dark theme
- **Role-Based UI**: Interface adapts based on user permissions

### ➕ Add Menu Items
- **Item Creation**: Add new menu items with name, description, course, and price
- **Course Selection**: Choose from Starters, Mains, or Dessert categories
- **Form Validation**: Ensure all required fields are filled before saving

### 🔍 Filter by Course
- **Course Filtering**: Filter menu items by specific courses
- **Dynamic Updates**: Real-time filtering with instant results

### 🎨 Design & UX
- **Dark Theme**: Modern black background with gold accents
- **Responsive Design**: Optimized for mobile devices
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Performance Optimized**: Efficient rendering with FlatList virtualization

## Technical Architecture

### 📱 Tech Stack
- **React Native 0.79.6**: Latest React Native with New Architecture
- **Expo SDK 53**: Managed workflow for easy development and deployment
- **TypeScript**: Type-safe development with full IntelliSense support
- **React Navigation**: Native stack navigation for seamless screen transitions

### 🏗️ Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx    # Error handling wrapper
│   ├── MenuItemCard.tsx     # Individual menu item display
│   └── SearchBar.tsx        # Search input component
├── context/             # React Context for state management
│   ├── MenuContext.tsx      # Menu state and business logic
│   └── UserContext.tsx      # User authentication and role management
├── screens/            # Main application screens
│   ├── HomeScreens.tsx      # Main menu display
│   ├── AddItemScreen.tsx    # Add new menu items
│   ├── FilterScreen.tsx     # Course filtering
│   └── LoginScreen.tsx      # User authentication screen
├── styles/             # StyleSheet definitions
│   ├── HomeScreens.ts       # Home screen styling
│   ├── AddItemScreenStyles.ts
│   ├── FilterScreenStyles.ts
│   ├── MenuItemCardStyles.ts
│   ├── SearchBarStyles.ts
│   └── SignupScreenStyles.ts
├── theme/              # Theme configuration
│   └── colors.ts           # Color palette definitions
├── types/              # TypeScript type definitions
│   └── index.ts            # MenuItem, Course, and User types
└── utils/              # Utility functions
    ├── currency.ts         # Currency formatting
    └── navigation.ts       # Navigation helpers
```

### 🔄 State Management
- **Context API**: React Context for global menu state management
- **User Context**: Separate context for user authentication and role management
- **Local State**: Component-level state for UI interactions
- **Memoization**: Optimized re-renders with useMemo and useCallback

### 🎯 Key Components

#### MenuContext
```typescript
// Central state management for menu items
const MenuContextValue = {
  items: MenuItem[],           // Array of menu items
  addItem: (item) => void,     // Add new menu item
  removeItem: (id) => void,   // Remove item by ID
  averagesByCourse: Record<Course, number | null>  // Price averages
}
```

#### MenuItem Structure
```typescript
interface MenuItem {
  id: string;           // Unique identifier
  name: string;         // Item name
  description: string;  // Item description
  course: Course;       // 'Starters' | 'Mains' | 'Dessert'
  price: number;        // Price in ZAR
}
```

#### UserContext
```typescript
// User authentication and role management with secure password handling
const UserContextValue = {
  user: User | null,           // Current logged-in user
  login: (username: string, password: string) => Promise<boolean>,  // Secure login
  signup: (name: string, username: string, password: string) => Promise<boolean>,  // Create new user with hashed password
  logout: () => void,          // Logout current user
}
```

#### User Structure
```typescript
interface User {
  id: string;           // Unique identifier
  name: string;         // User display name
  userCode: string;     // Authentication code
  type: UserType;       // 'owner' | 'employee' | 'customer'
}
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g @expo/cli`
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd christoffel-menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web
   - Scan QR code with Expo Go app

## Development

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm test` - Run Jest test suite

### Code Quality
- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code linting and formatting
- **Jest**: Unit testing framework
- **Prettier**: Code formatting

### Performance Optimizations
- **FlatList Optimization**: `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`
- **Memoization**: `useMemo` for expensive calculations, `useCallback` for event handlers
- **Debounced Search**: 300ms delay to reduce filtering frequency
- **Virtualization**: `removeClippedSubviews` for better scroll performance

## Features in Detail

### Search & Filter System
- **Real-time Search**: Debounced input with 300ms delay
- **Multi-field Search**: Search in both name and description
- **Course Filtering**: Filter by specific menu courses
- **Combined Operations**: Search and sort can be used together

### Price Analytics
- **Course Averages**: Calculate average prices per course
- **Dynamic Updates**: Averages update automatically when items change
- **Null Handling**: Graceful handling of empty courses

### UI/UX Design
- **Dark Theme**: Black background with gold (#FFD700) accents
- **Typography**: Clear hierarchy with appropriate font weights
- **Spacing**: Consistent padding and margins throughout
- **Accessibility**: Proper contrast ratios and touch targets

## Testing

The app includes comprehensive testing:
- **Unit Tests**: Component and utility function testing
- **Context Testing**: Menu state management verification
- **Integration Tests**: Screen interaction testing

Run tests with:
```bash
npm test
```

## Deployment

### Expo Build
1. **Configure app.json** for production
2. **Build for platforms**:
   ```bash
   expo build:android
   expo build:ios
   ```

### App Store Deployment
- **Android**: Generate APK/AAB for Google Play Store
- **iOS**: Generate IPA for Apple App Store

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React Native and Expo
- Icons and assets from Expo Vector Icons
- Testing framework: Jest with React Native Testing Library
- Navigation: React Navigation
