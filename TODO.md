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

## Step 9: Test Implementation
- Test user switching
- Verify role-based permissions
- Ensure menu functionality works for each user type
