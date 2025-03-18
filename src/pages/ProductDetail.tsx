import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Check, ArrowLeft, Star } from "lucide-react";
import Reviews from "@/components/Reviews";
import ProductGrid from "@/components/ProductGrid";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, products } = useProducts();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const product = getProduct(Number(id));
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-semibold mb-4">Товар не найден</h1>
        <p className="text-gray-500 mb-6">
          Товар, который вы ищете, не существует.
        </p>
        <Button onClick={() => navigate("/shop")}>Вернуться в магазин</Button>
      </div>
    );
  }
  
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addItem(product, quantity);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };
  
  // Конвертация цены в рубли
  const priceInRubles = (product.price * 90).toFixed(0);
  
  // Get similar products (same category but not the current product)
  const similarProducts = products
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);
  
  return (
    <div className="space-y-16">
      <Button
        variant="ghost"
        className="mb-6 -ml-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-2" /> Назад
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-1"
          >
            <span className="text-sm text-gray-500">{product.category}</span>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      product.rating >= star
                        ? "text-black fill-black"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">
                {product.rating} ({product.reviews.length} отзывов)
              </span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl font-semibold">{priceInRubles} ₽</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-600">{product.description}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            {product.inStock ? (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                В наличии
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                Нет в наличии
              </span>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6"
          >
            <div className="flex space-x-4">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || !product.inStock}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={incrementQuantity}
                  disabled={!product.inStock}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isAddingToCart ? (
                    <motion.span
                      key="adding"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center"
                    >
                      <Check size={18} className="mr-2" /> Добавлено в корзину
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center"
                    >
                      <ShoppingBag size={18} className="mr-2" /> Добавить в корзину
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Reviews product={product} />
      
      {similarProducts.length > 0 && (
        <div className="pt-8">
          <h2 className="text-2xl font-semibold mb-6">Вам также может понравиться</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

const ProductDetailSkeleton = () => {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
        
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-100 animate-pulse" />
            <div className="w-3/4 h-8 bg-gray-100 animate-pulse" />
            <div className="w-32 h-4 bg-gray-100 animate-pulse" />
          </div>
          
          <div className="w-16 h-6 bg-gray-100 animate-pulse" />
          
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-100 animate-pulse" />
            <div className="w-full h-4 bg-gray-100 animate-pulse" />
            <div className="w-2/3 h-4 bg-gray-100 animate-pulse" />
          </div>
          
          <div className="w-16 h-6 bg-gray-100 animate-pulse" />
          
          <div className="flex space-x-4 pt-6">
            <div className="w-32 h-10 bg-gray-100 animate-pulse rounded-md" />
            <div className="flex-1 h-10 bg-gray-100 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
