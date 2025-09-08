# TODO: Implement User-Based Login System

## Step 1: Update Type Definitions ✓
- Add UserType enum ('owner', 'employee', 'customer')
- Add User interface with id, name, userCode, type
- Add UserContextValue type for user management

## Step 2: Create User Context ✓
- Create UserContext.tsx with user state management
- Implement login function using user codes
- Add role-based permission checks

## Step 3: Update Menu Context for Role-Based Access ✓
- Add user role checks to addItem, removeItem functions
- Restrict price editing for employees
- Ensure customers have read-only access

## Step 4: Create Login Screen ✓
- Create LoginScreen.tsx for user selection/login
- Implement user code input and validation
- Navigate to Home after successful login

## Step 5: Update App Navigation ✓
- Add Login screen to navigation stack
- Set Login as initial screen
- Add UserProvider to app hierarchy

## Step 6: Update Home Screen for Role-Based UI ✓
- Hide Add Item button for customers
- Hide Remove buttons for customers and employees (if not allowed)
- Show user info and logout option

## Step 7: Update Add Item Screen ✓
- Disable price input for employees
- Show appropriate permissions message

## Step 8: Update Menu Item Card ✓
- Conditionally show remove button based on user role

## Step 9: Test Implementation ✓
- Test user switching
- Verify role-based permissions
- Ensure menu functionality works for each user type
- Fixed test setup to include UserProvider wrappers
- Added mocks for useUser hook in tests
- All tests now passing (5/5)

## New Tasks: Update App Loading and Authentication UI

## Step 10: Update Splash Screen ✓
- Change splash screen image from flaticon to Bordeaux_and_Co.jpeg logo
- Update app.json splash configuration

## Step 11: Add Logo to Login Page ✓
- Import and display Bordeaux_and_Co.jpeg logo in LoginScreen.tsx
- Position logo appropriately in the login UI

## Step 12: Create Signup Page ✓
- Create SignupScreen.tsx component
- Add signup form with user code creation
- Implement signup logic in UserContext

## Step 13: Update Navigation for Signup ✓
- Add Signup screen to RootStackParamList
- Add Signup route to Stack.Navigator in App.tsx
- Add navigation between Login and Signup screens

## Step 14: Test New Features
- Verify splash screen shows logo on app load
- Confirm logo displays on login page
- Test signup functionality and navigation

## Step 15: Move Signup Styles to Stylesheet ✓
- Create SignupScreenStyles.ts
- Move all inline styles to stylesheet
- Update SignupScreen.tsx to use stylesheet
