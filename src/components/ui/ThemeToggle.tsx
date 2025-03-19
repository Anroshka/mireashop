import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <Button
      onClick={handleToggle}
      className={`
        relative overflow-hidden rounded-full w-10 h-10
        transition-colors duration-300
        ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-100'}
        ${isAnimating ? 'scale-95' : ''}
      `}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isAnimating ? 360 : 0, 
          scale: isAnimating ? 0.8 : 1 
        }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'dark' ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </motion.div>
    </Button>
  );
} 