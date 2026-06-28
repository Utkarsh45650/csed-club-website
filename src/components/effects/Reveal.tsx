import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

export default function Reveal({ children, width = '100%', delay = 0, className = '' }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} style={{ position: 'relative', width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
