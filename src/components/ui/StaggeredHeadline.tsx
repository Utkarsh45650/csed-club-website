import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StaggeredHeadline({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08, delayChildren: shouldReduceMotion ? 0 : 0.2 * i } }),
  };
  const childVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
    },
  };

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block mr-[0.25em] overflow-hidden py-2">
            {word.split("").map((char, charIndex) => (
              <motion.span
                variants={childVariants}
                key={charIndex}
                className={cn("inline-block", char === "." ? "text-[#00D4FF]" : "")}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>
    </>
  );
}
