import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { memoryImages as IMAGES } from '../../data/images';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function FadedMemoriesBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Delay loading the images and animations until after initial page load (1 second delay)
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background Gradient to ensure the background remains dark */}
      <div className="absolute inset-0 bg-[#050816] z-0" />

      {isReady && IMAGES.map((src, i) => {
        // Randomize animation movement range in vh/vw
        const initialX = random(-10, 110);
        const initialY = random(-10, 110);

        const moveX = [initialX, random(-10, 110), random(-10, 110), initialX];
        const moveY = [initialY, random(-10, 110), random(-10, 110), initialY];

        const duration = random(60, 120);
        const delay = random(-100, 0);
        const rotate = [random(-15, 15), random(-30, 30), random(-15, 15)];

        return (
          <motion.div
            key={i}
            className="absolute rounded-xl overflow-hidden z-10"
            style={{
              width: `${random(200, 400)}px`,
              aspectRatio: "16/9",
              x: `${initialX}vw`,
              y: `${initialY}vh`,
              willChange: "transform, opacity"
            }}
            animate={{
              x: moveX.map(val => `${val}vw`),
              y: moveY.map(val => `${val}vh`),
              rotate: rotate,
              opacity: [0.15, 0.4, 0.15], // Increased visibility, pulsing opacity
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
              opacity: {
                duration: duration / 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Color tint to blend with theme */}
            <div className="absolute inset-0 bg-[#6C63FF]/20 z-10" />
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover grayscale opacity-80"
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
