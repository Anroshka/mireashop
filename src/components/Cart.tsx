import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  // Конвертация итоговой цены в рубли
  const totalPriceInRubles = (totalPrice * 90).toFixed(0);

  const handleCheckout = () => {
    toast({
      title: "Заказ оформлен",
      description: "Ваш заказ успешно оформлен",
    });
    clearCart();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Корзина</h1>
        {items.length > 0 && (
          <Button
            onClick={clearCart}
            className="text-sm"
          >
            Очистить корзину
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="p-4 bg-secondary rounded-full">
            <ShoppingBag size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium">Ваша корзина пуста</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Похоже, вы еще ничего не добавили в корзину.
          </p>
          <Button asChild className="mt-4">
            <Link to="/shop">Начать покупки</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-1">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                >
                  <CartItem item={item} />
                  <hr className="border-border" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card p-6 rounded-lg space-y-4"
            >
              <h2 className="text-lg font-medium">Итог заказа</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span>{totalPriceInRubles} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between font-medium">
                  <span>Итого</span>
                  <span>{totalPriceInRubles} ₽</span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-secondary rounded text-xs">
                <AlertCircle size={14} className="mr-2 flex-shrink-0" />
                <p>Это демо-магазин. Реальные платежи не обрабатываются.</p>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
