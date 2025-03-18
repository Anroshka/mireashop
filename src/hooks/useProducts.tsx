import { useState } from "react";
import { Product, SortOption, FilterOptions } from "@/lib/types";
import { getProductsByFilters, getProductById, products } from "@/lib/data";

export const useProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({ categories: [] });
  const [activeSort, setActiveSort] = useState<SortOption>("newest");

  const applyFilters = (filters: FilterOptions, sort?: SortOption) => {
    const sortOption = sort || activeSort;
    
    // Создаем копию фильтров для безопасного обновления state
    const safeFilters = {
      categories: filters.categories || [],
      minPrice: typeof filters.minPrice === 'number' ? filters.minPrice : 0,
      maxPrice: typeof filters.maxPrice === 'number' ? filters.maxPrice : 500,
      inStock: !!filters.inStock
    };
    
    console.log('useProducts.applyFilters - received filters:', filters);
    console.log('useProducts.applyFilters - safe filters:', safeFilters);
    
    setActiveFilters(safeFilters);
    if (sort) setActiveSort(sort);

    const categoryFilter = safeFilters.categories.length > 0 && !safeFilters.categories.includes("Все") 
      ? safeFilters.categories[0] 
      : undefined;
      
    console.log('useProducts.applyFilters - category filter:', categoryFilter);

    const filtersForAPI = {
      category: categoryFilter,
      minPrice: safeFilters.minPrice,
      maxPrice: safeFilters.maxPrice,
      inStock: safeFilters.inStock,
      sortBy: sortOption,
    };
    
    console.log('useProducts.applyFilters - applying filters:', filtersForAPI);
    
    const filtered = getProductsByFilters(filtersForAPI);
    
    console.log('useProducts.applyFilters - filtered products:', filtered.length);
    
    setFilteredProducts(filtered);
    return filtered;
  };

  const getProduct = (id: number): Product | undefined => {
    return getProductById(id);
  };

  return {
    products: filteredProducts,
    applyFilters,
    getProduct,
    activeFilters,
    activeSort,
  };
};
