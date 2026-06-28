import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(
        "flex flex-col gap-4 mb-16",
        align === 'center' ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.span variants={item} className="text-sm font-semibold tracking-widest text-[#00D4FF] uppercase">
        {eyebrow}
      </motion.span>
      <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={item} className="text-lg text-gray-400 max-w-2xl">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
