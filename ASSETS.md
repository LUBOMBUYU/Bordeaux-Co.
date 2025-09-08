# Assets Documentation

This document catalogs all images, icons, and media assets used in the Christoffel's Menu React Native application.

## Images

### Restaurant Logo
- **File**: `assets/Bordeaux_and_Co.jpeg`
- **Location**: `src/assets/Bordeaux_and_Co.jpeg`
- **Usage**: Main restaurant logo displayed in the header of HomeScreen
- **Dimensions**: 150x90 (display size), original size may vary
- **Format**: JPEG
- **Description**: Official Bordeaux & Co restaurant branding

## Icons and Emojis

### Course Category Icons
The app uses Unicode emojis for course categorization:

- **🍽️ Starters**: Used in Picker components for appetizer items
- **🍖 Mains**: Used in Picker components for main course items
- **🍰 Dessert**: Used in Picker components for dessert items

### Navigation and UI Icons
- **Search functionality**: Uses default TextInput search icon
- **Add Item**: Text-based "Add New Item" button
- **Filter**: Text-based "Filter by Course" button
- **Logout**: Text-based "Logout" button with danger color styling

## Color Assets

### Theme Colors
All colors are defined in `src/theme/colors.ts`:

```typescript
// Brand Colors
primary: '#FFD700'     // Gold - main brand color
accent: '#FFA500'      // Orange - secondary brand color

// Background Colors
bg: '#000000'          // Black - main background
card: '#1A1A1A'        // Dark gray - card backgrounds

// Text Colors
white: '#FFFFFF'       // Pure white for maximum contrast
text: '#FFFFFF'        // Primary text color
muted: '#B0B0B0'       // Light gray for secondary text

// Semantic Colors
danger: '#FF4444'      // Red - for delete actions and errors
success: '#4CAF50'     // Green - for success states
warning: '#FF9800'    // Orange - for warnings
info: '#2196F3'       // Blue - for informational messages

// UI Element Colors
border: '#333333'      // Dark gray - borders and dividers
shadow: 'rgba(255, 255, 255, 0.1)' // Light shadow for depth
```

## Font Assets

### Typography
The app uses React Native's default system fonts:
- **iOS**: System Font (San Francisco)
- **Android**: Roboto

### Font Sizes (from UI Design Guide)
- **H1**: 24px, 800 weight - Main titles
- **H2**: 20px, 700 weight - Section headers
- **H3**: 18px, 600 weight - Sub-section headers
- **Body**: 16px, 400 weight - Regular text
- **Caption**: 14px, 400 weight - Secondary information
- **Small**: 12px, 400 weight - Helper text

## Asset Organization

### Directory Structure
```
assets/
├── Bordeaux_and_Co.jpeg    # Restaurant logo
└── (future assets)

src/
├── theme/
│   └── colors.ts           # Color definitions
├── styles/
│   ├── AddItemScreenStyles.ts
│   ├── HomeScreens.ts
│   ├── FilterScreenStyles.ts
│   ├── MenuItemCardStyles.ts
│   └── SearchBarStyles.ts
└── components/
    └── (UI components)
```

## Usage Guidelines

### Image Usage
- **Logo**: Always use `require('../../assets/Bordeaux_and_Co.jpeg')`
- **Resize Mode**: Use `resizeMode="contain"` for logo
- **Dimensions**: Logo displays at 150x90 pixels

### Color Usage
- Import colors: `import { colors } from '../theme/colors'`
- Use semantic color names: `colors.primary`, `colors.danger`, etc.
- Maintain consistency across all screens

### Icon Usage
- Use Unicode emojis for course categories
- Ensure emojis are properly displayed on target devices
- Consider accessibility when using icon-only elements

## Performance Considerations

### Image Optimization
- JPEG format for photos (smaller file size)
- Appropriate dimensions for mobile displays
- Lazy loading for large image lists (if implemented)

### Color Performance
- Use StyleSheet.create() for optimal performance
- Define colors once in theme file
- Avoid inline color definitions

## Accessibility

### Color Contrast
- Primary text on background: 21:1 ratio (AAA compliant)
- Secondary text: 10.5:1 ratio (AA compliant)
- Interactive elements: 4.5:1 minimum contrast

### Icon Accessibility
- Use descriptive text with emojis
- Ensure emoji meanings are clear in context
- Provide alternative text for screen readers

## Future Assets

### Planned Additions
- **Loading spinners**: Custom loading animations
- **Success/Error icons**: For feedback states
- **User avatars**: For user profiles (if implemented)
- **Menu item photos**: For visual menu display

### Asset Naming Convention
- Use descriptive names: `restaurant-logo.jpeg`, `success-icon.png`
- Use kebab-case for file names
- Include size/density in name if multiple variants: `logo-small.png`, `logo-large.png`

This documentation ensures consistent asset usage and provides guidance for future development and maintenance of the application's visual elements.
