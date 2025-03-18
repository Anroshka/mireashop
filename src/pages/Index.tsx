import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Index = () => {
  const { products } = useProducts();
  const { scrollYProgress } = useScroll();
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Featured products (show only 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <section className="mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Популярные товары</h2>
            <p className="text-gray-500 mt-2">Откройте для себя наши самые популярные позиции</p>
          </div>
          
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/shop" className="group flex items-center">
              Смотреть все{" "}
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* About Section */}
      <section className="relative bg-gray-50 rounded-2xl py-16 px-8 overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-lg mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl font-semibold mb-4">Наша философия дизайна</h2>
          <p className="text-gray-600 mb-8">
            Мы верим в силу минимализма - создаем продукты, которые одновременно красивы и функциональны, 
            без лишних элементов. Каждый предмет в нашей коллекции тщательно продуман, чтобы улучшить 
            ваш повседневный опыт.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-medium">01</span>
              </div>
              <h3 className="font-medium mb-2">Простота</h3>
              <p className="text-sm text-gray-500">
                Чистые линии и ненагруженный дизайн, который говорит сам за себя.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-medium">02</span>
              </div>
              <h3 className="font-medium mb-2">Функциональность</h3>
              <p className="text-sm text-gray-500">
                Продукты, которые практичны и улучшают вашу повседневную жизнь.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-medium">03</span>
              </div>
              <h3 className="font-medium mb-2">Качество</h3>
              <p className="text-sm text-gray-500">
                Изготовлено из премиальных материалов для длительной службы и прочности.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* CTA Section */}
      <section className="mt-20">
        <div className="bg-black text-white rounded-2xl p-12 md:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Готовы улучшить ваше пространство?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-8"
            >
              Изучите нашу коллекцию и найдите идеальные дополнения для вашего дома.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                <Link to="/shop">
                  Перейти в магазин
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
