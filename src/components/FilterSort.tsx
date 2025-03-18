
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowDownAZ, 
  ArrowUpAZ, 
  Star, 
  FilterX,
  Filter,
  ChevronDown,
  X
} from "lucide-react";
import { categories } from "@/lib/data";
import { FilterOptions, SortOption } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSortProps {
  onFilterChange: (filters: FilterOptions, sort?: SortOption) => void;
  activeFilters: FilterOptions;
  activeSort: SortOption;
}

const sortOptions = [
  { value: "newest", label: "Newest", icon: null },
  { value: "price-asc", label: "Price: Low to High", icon: <ArrowUpAZ size={16} /> },
  { value: "price-desc", label: "Price: High to Low", icon: <ArrowDownAZ size={16} /> },
  { value: "rating-desc", label: "Highest Rated", icon: <Star size={16} /> },
];

const FilterSort = ({ onFilterChange, activeFilters, activeSort }: FilterSortProps) => {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Initialize filter state from activeFilters
  useEffect(() => {
    if (activeFilters.minPrice !== undefined && activeFilters.maxPrice !== undefined) {
      setPriceRange([activeFilters.minPrice, activeFilters.maxPrice]);
    }
    
    setInStockOnly(activeFilters.inStock || false);
    
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      setSelectedCategory(activeFilters.categories[0]);
    } else {
      setSelectedCategory("All");
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(category, priceRange, inStockOnly);
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    applyFilters(selectedCategory, range, inStockOnly);
  };

  const handleInStockChange = (checked: boolean) => {
    setInStockOnly(checked);
    applyFilters(selectedCategory, priceRange, checked);
  };

  const handleSortChange = (sort: SortOption) => {
    applyFilters(selectedCategory, priceRange, inStockOnly, sort);
  };

  const applyFilters = (
    category: string,
    price: [number, number],
    inStock: boolean,
    sort?: SortOption
  ) => {
    const filters: FilterOptions = {
      categories: category === "All" ? [] : [category],
      minPrice: price[0],
      maxPrice: price[1],
      inStock: inStock,
    };
    
    onFilterChange(filters, sort);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 500]);
    setInStockOnly(false);
    onFilterChange({ categories: [] });
  };

  const hasActiveFilters = (): boolean => {
    return (
      (activeFilters.categories && activeFilters.categories.length > 0) ||
      activeFilters.minPrice !== undefined ||
      activeFilters.maxPrice !== undefined ||
      activeFilters.inStock === true
    );
  };

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <div className="space-y-1.5">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-left"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Price Range</h3>
          <span className="text-xs text-gray-500">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[0, 500]}
          value={priceRange}
          max={500}
          step={10}
          onValueChange={handlePriceChange}
          className="mt-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={handleInStockChange}
        />
        <label
          htmlFor="in-stock"
          className="text-sm font-medium cursor-pointer"
        >
          In Stock Only
        </label>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full text-sm"
        onClick={resetFilters}
      >
        <FilterX size={16} className="mr-2" /> Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Our Products</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isMobile ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} className="mr-2" /> 
                Filters
                {hasActiveFilters() && (
                  <span className="ml-2 w-2 h-2 bg-black rounded-full" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <span className="mr-2">Sort</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={activeSort === option.value ? "bg-accent" : ""}
                      onClick={() => handleSortChange(option.value as SortOption)}
                    >
                      {option.icon && <span className="mr-2">{option.icon}</span>}
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-2" /> 
                    Filters
                    {hasActiveFilters() && (
                      <span className="ml-2 w-2 h-2 bg-black rounded-full" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[250px] p-4">
                  {filterContent}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <span className="mr-2">Sort by</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={activeSort === option.value ? "bg-accent" : ""}
                      onClick={() => handleSortChange(option.value as SortOption)}
                    >
                      {option.icon && <span className="mr-2">{option.icon}</span>}
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      {/* Mobile filters modal */}
      <AnimatePresence>
        {isMobile && isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="bg-white w-full rounded-t-lg p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              {filterContent}
              
              <Button
                className="w-full"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.categories && activeFilters.categories.length > 0 && (
            <Badge onRemove={() => handleCategoryChange("All")}>
              Category: {activeFilters.categories[0]}
            </Badge>
          )}
          
          {activeFilters.minPrice !== undefined && activeFilters.maxPrice !== undefined && (
            <Badge onRemove={() => handlePriceChange([0, 500])}>
              Price: ${activeFilters.minPrice} - ${activeFilters.maxPrice}
            </Badge>
          )}
          
          {activeFilters.inStock && (
            <Badge onRemove={() => handleInStockChange(false)}>
              In Stock Only
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 px-2"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

const Badge = ({ 
  children, 
  onRemove 
}: { 
  children: React.ReactNode; 
  onRemove: () => void 
}) => {
  return (
    <div className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
      {children}
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 ml-1 text-gray-500 hover:text-black"
        onClick={onRemove}
      >
        <X size={12} />
      </Button>
    </div>
  );
};

export default FilterSort;
