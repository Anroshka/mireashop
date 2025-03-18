import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 z-10"></div>
      
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px] py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-20 space-y-6"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full uppercase tracking-wider"
          >
            Минималистичная коллекция
          </motion.span>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl"
          >
            МИРЭА - это больше чем {" "}
            <span className="relative inline-block">
              просто ВУЗ
              <span className="absolute inset-x-0 bottom-2 h-1 bg-black"></span>
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-md"
          >
            Откройте для себя нашу коллекцию минималистичных товаров, созданных, чтобы привнести в вашу повседневную жизнь элегантность и простоту.
          </motion.p>
          
          <motion.div variants={itemVariants} className="pt-4">
            <Button asChild size="lg" className="group">
              <Link to="/shop">
                Перейти в магазин{" "}
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1974&auto=format&fit=crop" 
              alt="Минималистичный дизайн" 
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          
          <div className="absolute left-0 bottom-0 -ml-4 -mb-4 bg-white p-4 rounded-lg shadow-md max-w-[200px] transform translate-y-1/4 md:translate-y-0">
            <p className="text-sm font-medium">Создано с любовью</p>
            <p className="text-xs text-gray-500 mt-1">
              Каждый товар изготовлен с вниманием к деталям и качеству
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
