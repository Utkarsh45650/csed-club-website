import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export default function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Motion values for X and Y offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth and performant interpolation
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Move the button slightly towards the mouse (0.3 is the subtlety factor)
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 py-4 rounded-xl font-medium text-sm transition-colors duration-300",
        {
          "bg-[#00D4FF] text-[#050816] hover:bg-[#00FFC8] shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,200,0.5)]": variant === 'primary',
          "bg-transparent text-white border border-white/10 hover:bg-white/5": variant === 'secondary',
          "bg-transparent text-gray-400 hover:text-white hover:bg-white/5": variant === 'ghost',
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
