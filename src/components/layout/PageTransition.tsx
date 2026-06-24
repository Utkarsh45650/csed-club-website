import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1] // Apple-like custom spring/ease
      }}
      className="w-full h-full origin-top"
    >
      {children}
    </motion.div>
  );
}
