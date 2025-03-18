import { Product, User } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Минималистичная керамическая ваза",
    description: "Изящная керамическая ваза ручной работы, идеальная для современных интерьеров. Каждое изделие уникально и создано мастерами с вниманием к деталям и качеству.",
    price: 49.99,
    category: "Декор",
    image: "https://images.unsplash.com/photo-1612546958050-82eb14315bde?q=80&w=1287&auto=format&fit=crop",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        userId: 2,
        userName: "София Чен",
        rating: 5,
        comment: "Просто великолепно! Исключительное качество исполнения.",
        date: "2023-04-12"
      },
      {
        id: 2,
        userId: 3,
        userName: "Марк Ким",
        rating: 4.5,
        comment: "Элегантный дизайн, именно как на фото. Очень доволен покупкой.",
        date: "2023-03-30"
      }
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Минималистичная настольная лампа",
    description: "Элегантная настольная лампа с регулируемой яркостью и стильным дизайном, который дополнит любое рабочее пространство. Энергоэффективный светодиод с долгим сроком службы.",
    price: 89.99,
    category: "Освещение",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1287&auto=format&fit=crop",
    rating: 4.6,
    reviews: [
      {
        id: 3,
        userId: 1,
        userName: "Алекс Джонсон",
        rating: 4,
        comment: "Отличная лампа! Чистый дизайн и функциональность.",
        date: "2023-05-02"
      }
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Премиальный кожаный бумажник",
    description: "Изготовлен вручную из кожи высшего качества, этот минималистичный бумажник сочетает в себе прочность и изысканность. Имеет несколько отделений для карт и тонкий профиль.",
    price: 59.99,
    category: "Аксессуары",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1287&auto=format&fit=crop",
    rating: 4.9,
    reviews: [
      {
        id: 4,
        userId: 4,
        userName: "Эмма Уилсон",
        rating: 5,
        comment: "Качество кожи исключительное. Стоит каждой копейки!",
        date: "2023-02-18"
      },
      {
        id: 5,
        userId: 5,
        userName: "Давид Ли",
        rating: 4.8,
        comment: "Стильный, минималистичный и функциональный. Именно то, что я искал.",
        date: "2023-01-30"
      }
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Беспроводные наушники",
    description: "Премиальные наушники с шумоподавлением, кристально чистым качеством звука и долгим временем работы. Удобная конструкция для ношения в течение всего дня.",
    price: 199.99,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1287&auto=format&fit=crop",
    rating: 4.7,
    reviews: [
      {
        id: 6,
        userId: 6,
        userName: "Михаил Браун",
        rating: 4.5,
        comment: "Качество звука невероятное. Батарея держит заявленное время.",
        date: "2023-03-15"
      }
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Мраморный журнальный столик",
    description: "Эффектный журнальный столик с настоящей мраморной столешницей и черными стальными ножками. Идеальный центральный элемент для вашей гостиной.",
    price: 349.99,
    category: "Мебель",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1169&auto=format&fit=crop",
    rating: 4.5,
    reviews: [
      {
        id: 7,
        userId: 7,
        userName: "Дженнифер Тейлор",
        rating: 4.5,
        comment: "Просто великолепный стол. Мрамор выглядит потрясающе вживую.",
        date: "2023-04-05"
      }
    ],
    inStock: false
  },
  {
    id: 6,
    name: "Минималистичные настенные часы",
    description: "Стильные минималистичные настенные часы с чистым дизайном и бесшумным механизмом. Подходят для любой комнаты в доме или офисе.",
    price: 39.99,
    category: "Декор",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=1170&auto=format&fit=crop",
    rating: 4.2,
    reviews: [
      {
        id: 8,
        userId: 8,
        userName: "Томас Гарсия",
        rating: 4,
        comment: "Просто и элегантно. Точно как на фото.",
        date: "2023-02-28"
      }
    ],
    inStock: true
  },
  {
    id: 7,
    name: "Набор керамических кружек",
    description: "Набор из 4 керамических кружек ручной работы в минималистичном дизайне. Каждая кружка уникальна с небольшими вариациями глазури и текстуры.",
    price: 49.99,
    category: "Кухня",
    image: "https://images.unsplash.com/photo-1577037834093-222dae8210e9?q=80&w=1170&auto=format&fit=crop",
    rating: 4.6,
    reviews: [
      {
        id: 9,
        userId: 9,
        userName: "Сара Миллер",
        rating: 5,
        comment: "Эти кружки идеальны - стильные, удобные в руке и отличного качества.",
        date: "2023-05-10"
      }
    ],
    inStock: true
  },
  {
    id: 8,
    name: "Умные часы",
    description: "Стильные минималистичные смарт-часы с отслеживанием здоровья, уведомлениями и настраиваемыми циферблатами. Водонепроницаемые и с длительным сроком службы батареи.",
    price: 199.99,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop",
    rating: 4.4,
    reviews: [
      {
        id: 10,
        userId: 10,
        userName: "Райан Джонсон",
        rating: 4.2,
        comment: "Отличный дизайн и функциональность. Время работы батареи могло бы быть лучше.",
        date: "2023-03-22"
      }
    ],
    inStock: true
  }
];

export const users: User[] = [
  {
    id: 1,
    name: "Алекс Джонсон",
    email: "alex@example.com",
    password: "password123"
  },
  {
    id: 2,
    name: "София Чен",
    email: "sofia@example.com",
    password: "password123"
  }
];

export const categories: string[] = [
  "Все",
  "Декор",
  "Освещение",
  "Аксессуары",
  "Электроника",
  "Мебель",
  "Кухня"
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "Все") return products;
  return products.filter(product => product.category === category);
}

export function getProductsByFilters(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
}): Product[] {
  console.log('data.getProductsByFilters - started with filters:', filters);
  console.log('data.getProductsByFilters - all products:', products.length);
  
  let filteredProducts = [...products];
  let count = 0;

  // Фильтрация по категории
  if (filters.category && filters.category !== "Все") {
    console.log('data.getProductsByFilters - filtering by category:', filters.category);
    filteredProducts = filteredProducts.filter(
      product => product.category === filters.category
    );
    console.log('data.getProductsByFilters - after category filter:', filteredProducts.length);
    count++;
  }

  // Фильтрация по минимальной цене
  if (filters.minPrice !== undefined) {
    console.log('data.getProductsByFilters - filtering by min price:', filters.minPrice);
    filteredProducts = filteredProducts.filter(
      product => product.price >= filters.minPrice!
    );
    console.log('data.getProductsByFilters - after min price filter:', filteredProducts.length);
    count++;
  }

  // Фильтрация по максимальной цене
  if (filters.maxPrice !== undefined) {
    console.log('data.getProductsByFilters - filtering by max price:', filters.maxPrice);
    console.log('data.getProductsByFilters - product prices:', filteredProducts.map(p => p.price));
    filteredProducts = filteredProducts.filter(
      product => product.price <= filters.maxPrice!
    );
    console.log('data.getProductsByFilters - after max price filter:', filteredProducts.length);
    count++;
  }

  // Фильтрация по наличию
  if (filters.inStock === true) { // Только если true, а не undefined или false
    console.log('data.getProductsByFilters - filtering by in stock');
    filteredProducts = filteredProducts.filter(
      product => product.inStock === true
    );
    console.log('data.getProductsByFilters - after stock filter:', filteredProducts.length);
    count++;
  }

  // Сортировка
  if (filters.sortBy) {
    console.log('data.getProductsByFilters - sorting by:', filters.sortBy);
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

  console.log(`data.getProductsByFilters - finished: applied ${count} filters, returned ${filteredProducts.length} products`);
  return filteredProducts;
}
