/**
 * Centralized menu images mapping
 *
 * This file exports an object mapping menu item names or IDs to their image URLs.
 * Updating an image URL here will update it throughout the app wherever used.
 */

const menuImages: Record<string, string> = {
  'Garlic Bread': 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
  'Chicken Wings (BBQ)': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop',
  'Chicken Wings (Spicy)': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop',
  'Mozzarella Sticks': 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=300&fit=crop',
  'Spring Rolls': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
  'Soup of the Day': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
  'Nachos with Cheese': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop',
  'Margherita Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
  'Pepperoni Pizza': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
  'Grilled Chicken Breast': 'https://images.unsplash.com/photo-1532636619361-6e5a5d63f5e?w=400&h=300&fit=crop',
  'Beef Burger with Fries': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  'Spaghetti Bolognese': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
  'Vegetarian Stir-Fry': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  'Fish and Chips': 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=400&h=300&fit=crop',
  'Steak and Mashed Potatoes': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
  'French Fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
  'Onion Rings': 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop',
  'Side Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  'Mashed Potatoes': 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?w=400&h=300&fit=crop',
  'Rice Pilaf': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
  'Steamed Vegetables': 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop',
  'Chocolate Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'Cheesecake': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
  'Ice Cream Sundae': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
  'Apple Pie': 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a9?w=400&h=300&fit=crop',
  'Brownies': 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=300&fit=crop',
  'Fruit Salad': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
  'Water (Still)': 'https://images.unsplash.com/photo-1559839914-17aae19cec4?w=400&h=300&fit=crop',
  'Water (Sparkling)': 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop',
  'Coke': 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop',
  'Sprite': 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop',
  'Fanta': 'https://images.unsplash.com/photo-1624517452488-0482ebb8970b?w=400&h=300&fit=crop',
  'Fresh Orange Juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
  'Fresh Apple Juice': 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop',
  'Fresh Mango Juice': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop',
  'Espresso': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
  'Cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53?w=400&h=300&fit=crop',
  'Latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
  'Black Tea': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
  'Green Tea': 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=300&fit=crop',
  'Herbal Tea': 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=300&fit=crop',
  'Vanilla Milkshake': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop',
  'Chocolate Milkshake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'Strawberry Milkshake': 'https://images.unsplash.com/photo-1553909489-cd47e9ef23d4?w=400&h=300&fit=crop',
};

export default menuImages;
