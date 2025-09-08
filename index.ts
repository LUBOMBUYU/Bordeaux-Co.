export enum Course {
    Starters = 'Starters',
    Mains = 'Mains',
    Dessert = 'Dessert',
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    course: Course;
}

export enum UserType {
    Owner = 'owner',
    Employee = 'employee',
    Customer = 'customer',
}

export interface User {
    id: string;
    name: string;
    username: string;
    passwordHash: string; // We store a hash, not the password
    type: UserType;
}

export interface MenuContextValue {
    items: MenuItem[];
    addItem: (item: Omit<MenuItem, 'id'>) => void;
    removeItem: (id: string) => void;
    editItem: (id: string, updates: Partial<MenuItem>) => void;
    averagesByCourse: Record<Course, number | null>;
    loading: boolean;
}

export interface UserContextValue {
    user: User | null;
    users: User[];
    login: (username: string, password: string) => Promise<boolean>;
    signup: (name: string, username: string, password: string) => Promise<boolean>;
    logout: () => void;
}