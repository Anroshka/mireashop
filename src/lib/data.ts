
import { Product, User } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Minimal Ceramic Vase",
    description: "A sleek, handcrafted ceramic vase perfect for modern interiors. Each piece is uniquely crafted by artisans with attention to detail and quality.",
    price: 49.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1612546958050-82eb14315bde?q=80&w=1287&auto=format&fit=crop",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        userId: 2,
        userName: "Sofia Chen",
        rating: 5,
        comment: "Absolutely beautiful! The craftsmanship is exceptional.",
        date: "2023-04-12"
      },
      {
        id: 2,
        userId: 3,
        userName: "Marcus Kim",
        rating: 4.5,
        comment: "Elegant design, just as pictured. Very happy with my purchase.",
        date: "2023-03-30"
      }
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Minimalist Desk Lamp",
    description: "An elegant desk lamp with adjustable brightness and a sleek design that complements any workspace. Energy-efficient LED with long lifespan.",
    price: 89.99,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1287&auto=format&fit=crop",
    rating: 4.6,
    reviews: [
      {
        id: 3,
        userId: 1,
        userName: "Alex Johnson",
        rating: 4,
        comment: "Great lamp! Clean design and functional.",
        date: "2023-05-02"
      }
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Premium Leather Wallet",
    description: "Handcrafted from full-grain leather, this minimalist wallet offers durability and sophistication. Features multiple card slots and a sleek profile.",
    price: 59.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1287&auto=format&fit=crop",
    rating: 4.9,
    reviews: [
      {
        id: 4,
        userId: 4,
        userName: "Emma Wilson",
        rating: 5,
        comment: "The quality of the leather is exceptional. Worth every penny!",
        date: "2023-02-18"
      },
      {
        id: 5,
        userId: 5,
        userName: "David Lee",
        rating: 4.8,
        comment: "Sleek, minimal and functional. Exactly what I was looking for.",
        date: "2023-01-30"
      }
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones with crystal clear sound quality and extended battery life. Comfortable design for all-day wear.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1287&auto=format&fit=crop",
    rating: 4.7,
    reviews: [
      {
        id: 6,
        userId: 6,
        userName: "Michael Brown",
        rating: 4.5,
        comment: "Sound quality is incredible. Battery lasts as advertised.",
        date: "2023-03-15"
      }
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Marble Coffee Table",
    description: "A striking coffee table with a genuine marble top and black steel legs. The perfect centerpiece for your living space.",
    price: 349.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1169&auto=format&fit=crop",
    rating: 4.5,
    reviews: [
      {
        id: 7,
        userId: 7,
        userName: "Jennifer Taylor",
        rating: 4.5,
        comment: "Absolutely gorgeous table. The marble is stunning in person.",
        date: "2023-04-05"
      }
    ],
    inStock: false
  },
  {
    id: 6,
    name: "Minimal Wall Clock",
    description: "A sleek, minimalist wall clock with a clean design and silent movement. Perfect for any room in your home or office.",
    price: 39.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1170&auto=format&fit=crop",
    rating: 4.2,
    reviews: [
      {
        id: 8,
        userId: 8,
        userName: "Thomas Garcia",
        rating: 4,
        comment: "Simple and elegant. Exactly as pictured.",
        date: "2023-02-28"
      }
    ],
    inStock: true
  },
  {
    id: 7,
    name: "Ceramic Mug Set",
    description: "Set of 4 handcrafted ceramic mugs in minimalist design. Each mug is unique with subtle variations in glaze and texture.",
    price: 49.99,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1577037834093-222dae8210e9?q=80&w=1170&auto=format&fit=crop",
    rating: 4.6,
    reviews: [
      {
        id: 9,
        userId: 9,
        userName: "Sarah Miller",
        rating: 5,
        comment: "These mugs are perfect - stylish, comfortable to hold, and great quality.",
        date: "2023-05-10"
      }
    ],
    inStock: true
  },
  {
    id: 8,
    name: "Smart Watch",
    description: "Sleek, minimalist smartwatch with health tracking, notifications, and customizable faces. Water-resistant and long battery life.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop",
    rating: 4.4,
    reviews: [
      {
        id: 10,
        userId: 10,
        userName: "Ryan Johnson",
        rating: 4.2,
        comment: "Great design and functionality. Battery life could be better.",
        date: "2023-03-22"
      }
    ],
    inStock: true
  }
];

export const users: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123"
  },
  {
    id: 2,
    name: "Sofia Chen",
    email: "sofia@example.com",
    password: "password123"
  }
];

export const categories: string[] = [
  "All",
  "Home Decor",
  "Lighting",
  "Accessories",
  "Electronics",
  "Furniture",
  "Kitchen"
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
}

export function getProductsByFilters(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
}): Product[] {
  let filteredProducts = [...products];

  if (filters.category && filters.category !== "All") {
    filteredProducts = filteredProducts.filter(
      product => product.category === filters.category
    );
  }

  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= filters.minPrice!
    );
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.price <= filters.maxPrice!
    );
  }

  if (filters.inStock !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.inStock === filters.inStock
    );
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
  }

  return filteredProducts;
}
