import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/ProductGrid";
import FilterSort from "@/components/FilterSort";
import { FilterOptions, SortOption } from "@/lib/types";

const Shop = () => {
  const { products, applyFilters, activeFilters, activeSort } = useProducts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: FilterOptions, sort?: SortOption) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      applyFilters(filters, sort);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div>
      <FilterSort 
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        activeSort={activeSort}
      />
      <ProductGrid products={products} isLoading={isLoading} />
    </div>
  );
};

export default Shop;
