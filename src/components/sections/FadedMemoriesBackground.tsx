import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { memoryImages as IMAGES } from '../../data/images';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function FadedMemoriesBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const MAX_VISIBLE = 5;

  useEffect(() => {
    setMounted(true);
    // Delay loading the images and animations until after initial page load (1 second delay)
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // Rotate images every 4 seconds
    return () => clearInterval(interval);
  }, [isReady]);

  // Pre-calculate animation paths for all images so they don't recalculate on re-renders
  const imageAnimations = useMemo(() => {
    return IMAGES.map(() => {
      // Keep between 5 and 75 to prevent them from moving too far right or offscreen
      const initialX = random(5, 75);
      const initialY = random(5, 75);
      return {
        initialX,
        initialY,
        moveX: [initialX, random(5, 75), random(5, 75), initialX],
        moveY: [initialY, random(5, 75), random(5, 75), initialY],
        duration: random(60, 100),
        rotate: [random(-15, 15), random(-30, 30), random(-15, 15)],
        width: random(200, 320)
      };
    });
  }, []);

  if (!mounted || shouldReduceMotion) return null;

  const visibleImages = [];
  if (isReady && IMAGES.length > 0) {
    for (let i = 0; i < Math.min(MAX_VISIBLE, IMAGES.length); i++) {
      const index = (activeIndex + i) % IMAGES.length;
      visibleImages.push({ src: IMAGES[index], id: index, anim: imageAnimations[index] });
    }
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background Gradient to ensure the background remains dark */}
      <div className="absolute inset-0 bg-[#050816] z-0" />

      <AnimatePresence>
        {visibleImages.map((img) => (
          <motion.div
            key={img.id}
            className="absolute rounded-xl overflow-hidden z-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              x: img.anim.moveX.map((val: number) => `${val}vw`),
              y: img.anim.moveY.map((val: number) => `${val}vh`),
              rotate: img.anim.rotate,
              opacity: [0.15, 0.4, 0.15],
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 2 } }}
            transition={{
              duration: img.anim.duration,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: img.anim.duration / 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: { duration: 2, ease: "easeOut" }
            }}
            style={{
              width: `${img.anim.width}px`,
              aspectRatio: "16/9",
              x: `${img.anim.initialX}vw`,
              y: `${img.anim.initialY}vh`,
              willChange: "transform, opacity"
            }}
          >
            {/* Color tint to blend with theme */}
            <div className="absolute inset-0 bg-[#6C63FF]/20 z-10" />
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover grayscale opacity-80"
              loading="lazy"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
