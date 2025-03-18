
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
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <p className="text-gray-500 mt-2">Discover our most popular items</p>
          </div>
          
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/shop" className="group flex items-center">
              View All{" "}
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
          <h2 className="text-3xl font-semibold mb-4">Our Design Philosophy</h2>
          <p className="text-gray-600 mb-8">
            We believe in the power of minimalism - creating products that are both beautiful and functional, 
            without unnecessary elements. Every piece in our collection is thoughtfully designed to enhance 
            your everyday experiences.
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
              <h3 className="font-medium mb-2">Simplicity</h3>
              <p className="text-sm text-gray-500">
                Clean lines and uncluttered designs that speak for themselves.
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
              <h3 className="font-medium mb-2">Functionality</h3>
              <p className="text-sm text-gray-500">
                Products that are practical and enhance your daily routines.
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
              <h3 className="font-medium mb-2">Quality</h3>
              <p className="text-sm text-gray-500">
                Crafted with premium materials for longevity and durability.
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
              Ready to elevate your space?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-8"
            >
              Explore our collection and discover the perfect additions to your home.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                <Link to="/shop">
                  Shop Now
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
