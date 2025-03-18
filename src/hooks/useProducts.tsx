
import { useState } from "react";
import { Product, SortOption, FilterOptions } from "@/lib/types";
import { getProductsByFilters, getProductById, products } from "@/lib/data";

export const useProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({ categories: [] });
  const [activeSort, setActiveSort] = useState<SortOption>("newest");

  const applyFilters = (filters: FilterOptions, sort?: SortOption) => {
    const sortOption = sort || activeSort;
    setActiveFilters(filters);
    if (sort) setActiveSort(sort);

    const categoryFilter = filters.categories.length > 0 && !filters.categories.includes("All") 
      ? filters.categories[0] 
      : undefined;

    const filtered = getProductsByFilters({
      category: categoryFilter,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      inStock: filters.inStock,
      sortBy: sortOption,
    });

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
