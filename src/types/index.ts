export type Course = 'Starters' | 'Mains' | 'Dessert';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number; // in ZAR
}
