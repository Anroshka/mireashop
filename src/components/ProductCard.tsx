
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Star, ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    addItem(product);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link 
        to={`/product/${product.id}`} 
        className="flex flex-col h-full bg-white rounded-lg overflow-hidden border border-transparent transition-all duration-300 hover:border-gray-200 hover:shadow-md"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!product.inStock && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 text-xs font-medium text-white bg-black rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-1 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {product.category}
            </span>
            <div className="flex items-center">
              <Star size={14} className="text-black fill-black" />
              <span className="ml-1 text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="flex-1 text-base font-medium">{product.name}</h3>
          
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-base font-semibold">${product.price.toFixed(2)}</span>
            
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full transition-all duration-300 ${
                isAddingToCart ? 'bg-black text-white' : ''
              } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
            >
              {isAddingToCart ? (
                <Check size={16} className="animate-scale-in" />
              ) : (
                <ShoppingBag size={16} />
              )}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
