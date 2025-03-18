import { useState } from "react";
import { Product, Review } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsProps {
  product: Product;
}

const Reviews = ({ product }: ReviewsProps) => {
  const { reviews } = product;
  const { isAuthenticated, currentUser } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите комментарий",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // In a real app, we would send this to an API
    // Here we're just simulating
    setTimeout(() => {
      // Add review to the product (this is just for demo purposes)
      if (currentUser) {
        const newReview: Review = {
          id: reviews.length + 1,
          userId: currentUser.id,
          userName: currentUser.name,
          rating,
          comment,
          date: new Date().toISOString().split("T")[0],
        };
        
        product.reviews.unshift(newReview);
        
        // Recalculate average rating
        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.rating = +(totalRating / product.reviews.length).toFixed(1);
      }
      
      setComment("");
      setRating(5);
      setShowForm(false);
      setIsSubmitting(false);
      
      toast({
        title: "Отзыв отправлен",
        description: "Спасибо за ваш отзыв!",
      });
    }, 1000);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Отзывы</h2>
        {isAuthenticated && !showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Написать отзыв
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-gray-50 p-4 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Ваша оценка
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-gray-300 hover:text-black transition-colors p-1"
                      >
                        <Star
                          size={24}
                          className={`${
                            rating >= star ? "text-black fill-black" : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium mb-2"
                  >
                    Ваш отзыв
                  </label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Напишите свой отзыв здесь..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить отзыв"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAuthenticated && (
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg mb-6">
          <AlertCircle size={20} className="text-gray-400 mt-0.5" />
          <div className="text-sm">
            <p>Чтобы написать отзыв, необходимо войти в систему.</p>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Пока нет отзывов. Будьте первым, кто оставит отзыв!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-100 pb-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{review.userName}</h3>
                    <span className="text-xs text-gray-500">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          review.rating >= star
                            ? "text-black fill-black"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
