import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

import Button from '../ui/Button';

import StaggeredHeadline from '../ui/StaggeredHeadline';

// ----------------------------------------------------------------------
// Main Hero Section Component
// ----------------------------------------------------------------------
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize mouse position between -1 and 1
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  // Parallax Transforms for Background & Right Composition
  const gridX = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);
  const gridY = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);
  
  const compX1 = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [30, -30]);
  const compY1 = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [30, -30]);
  
  const compX2 = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-40, 40]);
  const compY2 = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-40, 40]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] pt-20"
    >
      {/* ---------------- BACKGROUND LAYER ---------------- */}
      
      {/* Gradient Orb 1 */}
      <motion.div
        animate={{
          x: shouldReduceMotion ? 0 : [0, 50, 0],
          y: shouldReduceMotion ? 0 : [0, -30, 0],
          scale: shouldReduceMotion ? 1 : [1, 1.1, 1]
        }}
        transition={shouldReduceMotion ? {} : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.2)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* Gradient Orb 2 */}
      <motion.div
        animate={{
          x: shouldReduceMotion ? 0 : [0, -40, 0],
          y: shouldReduceMotion ? 0 : [0, 50, 0],
          scale: shouldReduceMotion ? 1 : [1, 1.05, 1]
        }}
        transition={shouldReduceMotion ? {} : { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* Animated Grid */}
      <motion.div 
        style={{ x: gridX, y: gridY, willChange: "transform" }}
        className="absolute inset-[-100%] pointer-events-none opacity-5 z-0"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 20%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 60%)',
          }}
        />
        {/* Infinite CSS Animation for Grid Panning could be added here via a CSS class, 
            but for Framer Motion, we use the mouse parallax instead. */}
      </motion.div>

      {/* ---------------- CONTENT LAYER ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left: Typography & CTAs */}
        <div className="flex flex-col items-start gap-8">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFC8] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
              The Future of Engineering
            </span>
          </motion.div>

          {/* Headline */}
          <StaggeredHeadline text="Innovating the digital frontier." />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed"
          >
            Join the brightest minds building the next generation of technology. 
            We turn bold ideas into production-ready software.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 1.0 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Button variant="primary">
              Apply for Membership
            </Button>
            <Button variant="secondary">
              Explore Projects
            </Button>
          </motion.div>

        </div>

        {/* Right: Abstract Visual Composition */}
        <div className="relative h-[400px] md:h-[500px] w-full hidden lg:flex items-center justify-center perspective-[1000px] select-none pointer-events-none">
          
          {/* Core Glowing Orb */}
          <div className="absolute center w-32 h-32 bg-[#00D4FF] rounded-full filter blur-[40px] opacity-50 animate-pulse" />

          {/* Floating Panel 1: Code Editor (Background/Right) */}
          <motion.div
            style={{ x: compX2, y: compY2, rotateY: 20, rotateX: -10 }}
            className="absolute z-10 -right-8 -top-8 w-[340px] h-72 rounded-xl border border-white/10 bg-[#1E1E1E]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D]/90 border-b border-black/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="text-blue-400">⚡</span> App.tsx
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>
            
            {/* Editor Body */}
            <div className="flex-1 p-4 font-mono text-[10px] sm:text-xs leading-relaxed text-gray-300 overflow-hidden">
              <div className="flex">
                <div className="text-gray-600 select-none pr-4 text-right">
                  1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
                </div>
                <div>
                  <span className="text-purple-400">import</span> <span className="text-blue-300">{'{'}</span> useState <span className="text-blue-300">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-300">'react'</span>;<br/>
                  <br/>
                  <span className="text-purple-400">export default function</span> <span className="text-yellow-200">TechInnovation</span>() {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-purple-400">const</span> [isFuture, setFuture] = <span className="text-blue-300">useState</span>(<span className="text-orange-300">true</span>);<br/>
                  <br/>
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">&lt;</span><span className="text-blue-400">div</span> <span className="text-blue-200">className</span><span className="text-gray-400">=</span><span className="text-green-300">"build-tomorrow"</span><span className="text-gray-400">&gt;</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">&lt;</span><span className="text-blue-400">Rocket</span> <span className="text-gray-400">/&gt;</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Panel 2: Terminal (Foreground/Left) */}
          <motion.div
            style={{ x: compX1, y: compY1, rotateY: -15, rotateX: 10 }}
            className="absolute z-20 w-80 h-64 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5">
              <div className="text-[10px] text-gray-500 font-mono tracking-wider">bash — ~</div>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-4 font-mono text-[11px] sm:text-xs text-gray-300 space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400">csed@club:~$</span>
                <span className="text-white">npm run build</span>
              </div>
              <div className="text-gray-400">
                &gt; csed-club-website@1.0.0 build<br/>
                &gt; tsc -b && vite build
              </div>
              <div className="text-blue-400 mt-2">
                vite v8.1.0 building for production...
              </div>
              <div className="text-green-400">
                ✓ 405 modules transformed.
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-400">csed@club:~$</span>
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-white block"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Rings */}
          <motion.div 
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={shouldReduceMotion ? {} : { duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border border-white/5 rounded-full border-dashed"
          />
          <motion.div 
            animate={shouldReduceMotion ? {} : { rotate: -360 }}
            transition={shouldReduceMotion ? {} : { duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] border border-[#00D4FF]/10 rounded-full"
          />

        </div>
      </div>
    </section>
  );
}
