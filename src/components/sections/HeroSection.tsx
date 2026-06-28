import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

import Button from '../ui/Button';
import StaggeredHeadline from '../ui/StaggeredHeadline';
import Hero3DModel from './Hero3DModel';
import TypingCodePanel from '../ui/TypingCodePanel';

// ----------------------------------------------------------------------
// Main Hero Section Component
// ----------------------------------------------------------------------
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

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
            <Button
              variant="primary"
              onClick={() => window.open('#apply', '_blank')}
            >
              Apply for Membership
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/projects')}
            >
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
            style={{ x: compX2, y: compY2, rotateY: 15, rotateX: 5 }}
            className="absolute z-10 right-0 -top-16 w-[360px] h-72 rounded-xl border border-white/10 bg-[#1E1E1E]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            <TypingCodePanel />
          </motion.div>

          {/* Floating Panel 2: 3D Model (Foreground/Left) */}
          <motion.div
            style={{ x: compX1, y: compY1 }}
            className="absolute z-20 w-[700px] h-[700px] -left-38 -top-30"
          >
            <Hero3DModel />
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
