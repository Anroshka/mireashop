import { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Конвертация цен в рубли
  const priceInRubles = (product.price * 90).toFixed(0);
  const totalPriceInRubles = (product.price * quantity * 90).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start py-4 space-x-4"
    >
      <div className="relative w-20 h-20 overflow-hidden rounded-md bg-secondary">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium hover:underline transition-all"
          >
            {product.name}
          </Link>
          <Button
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => removeItem(product.id)}
          >
            <X size={16} />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">{priceInRubles} ₽</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2 border border-border rounded-md overflow-hidden">
            <Button
              className="h-7 w-7 rounded-none border-r border-border"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              className="h-7 w-7 rounded-none border-l border-border"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <p className="text-sm font-medium">
            {totalPriceInRubles} ₽
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
