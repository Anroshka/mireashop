
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

  const handleCheckout = () => {
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully",
    });
    clearCart();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-sm"
          >
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <p className="text-gray-500 text-center max-w-md">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="mt-4">
            <Link to="/shop">Start Shopping</Link>
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
                  <hr className="border-gray-100" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 rounded-lg space-y-4"
            >
              <h2 className="text-lg font-medium">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items ({totalItems})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-100 rounded text-xs">
                <AlertCircle size={14} className="mr-2 flex-shrink-0" />
                <p>This is a demo store. No real payments are processed.</p>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
