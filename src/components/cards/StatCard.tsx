import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// ----------------------------------------------------------------------
// Number Counter Component
// ----------------------------------------------------------------------
export const NumberCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Custom snappy easing
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.floor(v).toString() + suffix;
          }
        },
      });
      return controls.stop;
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// ----------------------------------------------------------------------
// Stat Card Component
// ----------------------------------------------------------------------
export interface StatCardProps {
  icon: any;
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCard({ icon: Icon, value, suffix, label }: StatCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { type: 'spring', damping: 25, stiffness: 150 } 
        },
        hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
      }}
      whileHover="hover"
      className="group relative w-full rounded-2xl bg-[#111827]/40 backdrop-blur-md border border-white/5 p-4 sm:p-6 lg:p-8 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)] h-full"
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/0 to-[#00D4FF]/0 group-hover:from-[#00D4FF]/5 group-hover:to-transparent transition-colors duration-500" />
      
      {/* Border Glow Animation via CSS Pseudo-element logic inline */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:border-[#00D4FF]/50 shadow-[0_0_0px_rgba(0,212,255,0)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500 pointer-events-none z-20" />

      <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 h-full justify-center">
        {/* Icon Container */}
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-[#00D4FF]/50 transition-all duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-[#00D4FF] transition-colors" />
        </div>

        {/* Counter */}
        <div className="flex items-baseline text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00D4FF] group-hover:to-[#00FFC8] transition-all">
          <NumberCounter value={value} suffix={suffix} />
        </div>

        {/* Label */}
        <span className="text-[10px] sm:text-sm font-medium text-gray-400 tracking-wide uppercase leading-snug">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
