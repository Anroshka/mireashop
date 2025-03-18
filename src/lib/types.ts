
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: Review[];
  inStock: boolean;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface FilterOptions {
  categories: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}
