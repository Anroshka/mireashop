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
  { value: "newest", label: "Новинки", icon: null },
  { value: "price-asc", label: "Цена: от низкой к высокой", icon: <ArrowUpAZ size={16} /> },
  { value: "price-desc", label: "Цена: от высокой к низкой", icon: <ArrowDownAZ size={16} /> },
  { value: "rating-desc", label: "По рейтингу", icon: <Star size={16} /> },
];

const FilterSort = ({ onFilterChange, activeFilters, activeSort }: FilterSortProps) => {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 45000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
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
      setSelectedCategory("Все");
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(category, priceRange, inStockOnly);
  };

  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values);
    // Диапазон цен в компоненте отображается в рублях,
    // оставляем как есть, а конвертацию выполним в функции applyFilters
    applyFilters(selectedCategory, values, inStockOnly);
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
    priceRubles: [number, number], 
    inStock: boolean,
    sort?: SortOption
  ) => {
    setSelectedCategory(category);
    setPriceRange(priceRubles);
    setInStockOnly(inStock);
    
    // Конвертируем рубли в доллары для фильтрации в бэкенде
    const priceDollarsMin = Math.max(0, Math.floor(priceRubles[0] / 90));
    const priceDollarsMax = Math.max(1, Math.min(500, Math.ceil(priceRubles[1] / 90)));
    
    console.log('Applying filters:', { 
      category, 
      priceRubles: priceRubles,
      priceDollars: [priceDollarsMin, priceDollarsMax],
      inStock 
    });
    
    // Если выбрана категория "Все", не включаем ее в фильтр
    const categories = category === "Все" ? [] : [category];
    
    onFilterChange({
      categories: categories,
      minPrice: priceDollarsMin,
      maxPrice: priceDollarsMax,
      inStock,
    }, sort);
  };

  const resetFilters = () => {
    setSelectedCategory("Все");
    setPriceRange([0, 45000]);
    setInStockOnly(false);
    
    // Сбрасываем все фильтры - обнуляем массив категорий и убираем все ограничения
    console.log('FilterSort.resetFilters - resetting all filters');
    
    onFilterChange({ 
      categories: [],
      minPrice: 0,
      maxPrice: 500, // Максимальная цена в долларах
      inStock: false 
    });
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
        <h3 className="text-sm font-medium mb-3">Категории</h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          <Button
            variant={selectedCategory === "Все" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange("Все")}
            className="justify-start"
          >
            Все категории
          </Button>
          
          {categories.filter(category => category !== "Все").map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Цена</h3>
        <div className="px-2">
          <div className="py-6">
            <Slider
              defaultValue={[0, 45000]}
              value={priceRange}
              min={0}
              max={45000}
              step={1000}
              onValueChange={(values) => {
                const range: [number, number] = [values[0], values[1]];
                handlePriceChange(range);
              }}
              className="mb-2"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>{new Intl.NumberFormat('ru-RU').format(priceRange[0])} ₽</span>
            <span>{new Intl.NumberFormat('ru-RU').format(priceRange[1])} ₽</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="in-stock" 
          checked={inStockOnly}
          onCheckedChange={handleInStockChange}
        />
        <label
          htmlFor="in-stock"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Только товары в наличии
        </label>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Наши товары</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isMobile ? (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1 justify-between"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  Фильтры
                  {hasActiveFilters() && (
                    <span className="ml-1.5 w-2 h-2 bg-black rounded-full" />
                  )}
                </span>
                <ChevronDown size={14} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-between">
                    <span className="flex items-center">
                      Сортировка: {sortOptions.find(o => o.value === activeSort)?.label}
                    </span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value as SortOption)}
                      className="flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {option.icon}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Filter size={16} />
                      Фильтры
                      {hasActiveFilters() && (
                        <span className="ml-1 w-2 h-2 bg-black rounded-full" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Фильтры</h3>
                      <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                        <X size={18} />
                      </Button>
                    </div>
                    {filterContent}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Сортировка: {sortOptions.find(o => o.value === activeSort)?.label}
                      <ChevronDown size={14} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleSortChange(option.value as SortOption)}
                        className="flex items-center justify-between"
                      >
                        <span>{option.label}</span>
                        {option.icon}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
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
                <h3 className="text-lg font-medium">Фильтры</h3>
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
                Применить фильтры
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobile && hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mb-4 mt-3">
          {activeFilters.categories && activeFilters.categories.length > 0 && activeFilters.categories[0] !== "Все" && (
            <Badge onRemove={() => handleCategoryChange("Все")}>
              Категория: {activeFilters.categories[0]}
            </Badge>
          )}
          
          {activeFilters.minPrice !== undefined && activeFilters.maxPrice !== undefined && 
           (activeFilters.minPrice > 0 || activeFilters.maxPrice < 500) && (
            <Badge onRemove={() => handlePriceChange([0, 45000])}>
              Цена: {activeFilters.minPrice * 90} ₽ - {activeFilters.maxPrice * 90} ₽
            </Badge>
          )}
          
          {activeFilters.inStock && (
            <Badge onRemove={() => handleInStockChange(false)}>
              Только в наличии
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 px-2"
            onClick={resetFilters}
          >
            <FilterX size={14} className="mr-1" />
            Сбросить все
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
