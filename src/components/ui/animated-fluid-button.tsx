import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedFluidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const AnimatedFluidButton = React.forwardRef<HTMLButtonElement, AnimatedFluidButtonProps>(
  ({ text = "Button", className = "", onClick }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated fluid background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0"
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
        
        {/* Button text */}
        <span className="relative z-10">{text}</span>
      </motion.button>
    );
  }
);

AnimatedFluidButton.displayName = "AnimatedFluidButton";

export { AnimatedFluidButton }; 