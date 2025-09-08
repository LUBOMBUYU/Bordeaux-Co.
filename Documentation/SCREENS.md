
# Screens in the Project

This document provides an overview of all the screens in the project, describing their purpose and key features.

## 1. AddItemScreen.tsx
- Screen for adding new menu items.
- Includes form inputs for item name, description, course, and price.
- Price input is disabled for employees.
- Shows permission messages based on user role.
- Uses context to add items to the menu.
- Uses background image: `assets/add-item-background.png`
- Components:
  - `AddItemForm`: Form for entering menu item details.
  - `SaveButton`: Button to save the new item.
  - `NavigationButtons`: Buttons to navigate back home or browse menu.

## 2. FilterScreen.tsx
- Screen for filtering menu items.
- Allows users to filter items by course or search by name.
- Displays filtered list of menu items.
- Uses context to access menu items and filtering logic.
- Uses background image: `assets/filter-background.png`
- Components:
  - `FilterButton`: Buttons to select course filters.
  - `MenuItemCard`: Displays individual menu items.
  - `NavigationButtons`: Buttons to navigate back home or add new item.

## 3. HomeScreens.tsx
- Main home screen displaying the menu.
- Shows list of menu items grouped by course.
- Displays average prices per course.
- Shows Add Item button only for users with permission.
- Includes user info and logout option.
- Components:
  - `MenuItemCard`: Displays individual menu items.
  - `AddItemButton`: Button to add new menu items.
  - `FilterButton`: Button to filter menu items.
  - `BasketButton`: Button to view basket.
  - `LogoutButton`: Button to log out.

## 4. LoginScreen.tsx
- Screen for user login with password authentication.
- Allows users to enter their user code and password to log in.
- Validates both user code and password against stored credentials.
- Navigates to Home on successful authentication.
- Displays error messages for invalid login attempts.
- Includes link to signup for new users.
- Uses logo image: `assets/Bordeaux_and_Co.jpeg`
- Components:
  - `LoginForm`: Form for user code and password input.
  - `ErrorMessage`: Displays login errors.
  - `SignupLink`: Link to signup screen.

## 5. BasketScreen.tsx
- Screen for managing shopping basket/cart.
- Displays all items added to basket with quantities.
- Allows users to increase/decrease item quantities with +/- buttons.
- Shows real-time total price calculation.
- Provides option to remove items from basket.
- Includes checkout button for payment simulation.
- Navigates back to Home after successful checkout.
- Uses background image: `assets/basket-background.png`
- Components:
  - `BasketItem`: Displays individual basket items.
  - `QuantityControls`: Buttons to adjust item quantities.
  - `CheckoutButton`: Button to proceed to checkout.

## 6. SignupScreen.tsx
- Screen for new user signup.
- Form to enter name and create a user code.
- Validates uniqueness of user code.
- Signs up new users and logs them in automatically.
- Navigates to Home after successful signup.
- Components:
  - `SignupForm`: Form for user details input.
  - `LoginLink`: Link to login screen.

