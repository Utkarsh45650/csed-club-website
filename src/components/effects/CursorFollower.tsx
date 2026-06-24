import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const CursorFollower = () => {
  // Only render on devices with a fine pointer (mouse/trackpad), not touch screens
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Track if we are hovering over an interactive element
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();

  // Motion values for X and Y coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth interpolation (performance optimized)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Update coordinates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest('a, button, [role="button"], [role="switch"]');
      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop, mouseX, mouseY, isVisible]);

  if (!isDesktop || shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden sm:block"
      style={{
        x: smoothX,
        y: smoothY,
        // Center the circle on the cursor
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 0.4 : 1,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
      aria-hidden="true"
    >
      {/* Outer Ring */}
      <div className="w-8 h-8 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all">
        {/* Inner Dot */}
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>
    </motion.div>
  );
}

export default React.memo(CursorFollower);
