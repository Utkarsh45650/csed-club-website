import { motion, useReducedMotion } from "framer-motion";

export default function PageLoader() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center">
        <motion.div 
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={shouldReduceMotion ? {} : { duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-white/5 rounded-full border-t-[#00D4FF] border-r-[#00D4FF]/50"
        />
        <div className={shouldReduceMotion ? "absolute w-8 h-8 bg-[#6C63FF] rounded-full filter blur-[20px] opacity-50" : "absolute w-8 h-8 bg-[#6C63FF] rounded-full filter blur-[20px] animate-pulse opacity-50"} />
      </div>
      <span className="text-sm font-medium text-gray-500 tracking-widest uppercase">
        Loading Environment
      </span>
    </div>
  );
}
