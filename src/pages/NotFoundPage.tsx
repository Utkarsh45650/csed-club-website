import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/seo/SEO';

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const textX = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-30, 30]);
  const textY = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-30, 30]);

  const gridX = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);
  const gridY = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);

  return (
    <>
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for has been moved or doesn't exist in our system." 
      />
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen bg-[#050816] flex items-center justify-center relative overflow-hidden px-6"
      >
        {/* Background Orbs */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={shouldReduceMotion ? {} : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.2)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.05, 1] }}
          transition={shouldReduceMotion ? {} : { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
          style={{ willChange: "transform" }}
        />

        {/* Grid Pattern */}
        <motion.div 
          style={{ x: gridX, y: gridY, willChange: "transform" }}
          className="absolute inset-[-100%] pointer-events-none opacity-5 z-0"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,212,255,0.15)]"
          >
            <Terminal className="w-8 h-8 text-[#00D4FF]" />
          </motion.div>

          {/* Parallax 404 Text */}
          <div className="relative h-40 flex items-center justify-center w-full mb-6">
            <motion.h1 
              style={{ x: textX, y: textY }}
              className="text-[120px] md:text-[180px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none absolute"
            >
              404
            </motion.h1>
            {/* Glitch Overlay Effect */}
            <motion.h1 
              animate={shouldReduceMotion ? {} : { x: [-2, 2, -1, 1, 0] }}
              transition={shouldReduceMotion ? {} : { duration: 0.2, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
              className="text-[120px] md:text-[180px] font-black tracking-tighter text-[#00D4FF] opacity-30 mix-blend-screen absolute select-none pointer-events-none"
              style={{ x: textX, y: textY }}
            >
              404
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Endpoint Not Found
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md mx-auto">
              The trajectory you're on has drifted into deep space. This URL does not exist in our current matrix.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors w-full sm:w-auto font-medium"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
              
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00D4FF] text-[#050816] hover:bg-[#00FFC8] shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,200,0.5)] transition-all w-full sm:w-auto font-medium"
              >
                <Home size={18} />
                Return Home
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
