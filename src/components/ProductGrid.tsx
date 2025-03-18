
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium">Товары не найдены</h3>
        <p className="text-gray-500 mt-2">
          Попробуйте изменить фильтры или поисковый запрос
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-lg overflow-hidden"
        >
          <div className="aspect-[4/5] bg-gray-100 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-8 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="w-full h-5 bg-gray-100 rounded animate-pulse" />
            <div className="flex justify-between items-center pt-2">
              <div className="w-16 h-5 bg-gray-100 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
