import React, { useEffect, useState, useRef } from 'react';
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Canvas Trail Effect
  useEffect(() => {
    if (!isDesktop || shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let animationFrameId: number;
    let lastX = smoothX.get();
    let lastY = smoothY.get();

    let points: { x: number; y: number; age: number }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; age: number; life: number; color: string; size: number }[] = [];

    const colors = ['#8b5cf6', '#a855f7', '#d946ef', '#3b82f6', '#60a5fa']; // vibrant violet, fuchsia, blue

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentX = smoothX.get();
      const currentY = smoothY.get();
      
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Add points to trail if moving
      if (speed > 0.5) {
        // Interpolate points for smoother curves when moving fast
        const steps = Math.min(Math.floor(speed / 2), 5);
        for (let i = 1; i <= steps; i++) {
          points.push({
            x: lastX + (dx * i) / steps,
            y: lastY + (dy * i) / steps,
            age: 0
          });
        }
        
        // Spawn particles on fast movement
        if (speed > 3 && Math.random() > 0.3) {
          const numParticles = Math.floor(Math.random() * 2) + 1;
          for (let i = 0; i < numParticles; i++) {
            particles.push({
              x: currentX + (Math.random() - 0.5) * 10,
              y: currentY + (Math.random() - 0.5) * 10,
              vx: -dx * 0.05 + (Math.random() - 0.5) * 3, // slightly backwards
              vy: -dy * 0.05 + (Math.random() - 0.5) * 3,
              age: 0,
              life: Math.random() * 40 + 20,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: Math.random() * 3 + 1.5
            });
          }
        }
      }

      lastX = currentX;
      lastY = currentY;

      // Update and draw Ribbon Trail
      points.forEach(p => p.age += 1);
      points = points.filter(p => p.age < 40); // Shorter ribbon

      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const life = 1 - p1.age / 40;
          const easeLife = life * life; // non-linear fade
          
          // Outer Glow
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${easeLife * 0.5})`; // violet-400 with opacity
          ctx.lineWidth = Math.max(1, 12 * easeLife);
          ctx.stroke();
          
          // Inner Core
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${easeLife * 0.8})`;
          ctx.lineWidth = Math.max(1, 3 * easeLife);
          ctx.stroke();
        }
      }

      // Update and draw Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98; // friction
        p.vy *= 0.98;
        p.age += 1;
        p.size *= 0.97; // shrink
      });
      
      particles = particles.filter(p => p.age < p.life && p.size > 0.2);

      particles.forEach(p => {
        const life = 1 - p.age / p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Particle Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = life;
        ctx.fill();
        
        ctx.shadowBlur = 0; // reset
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop, shouldReduceMotion, smoothX, smoothY]);

  if (!isDesktop || shouldReduceMotion) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9997] hidden sm:block mix-blend-screen opacity-90"
        aria-hidden="true"
      />
      
      {/* Outer Ring (Spring physics) */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference hidden sm:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
        aria-hidden="true"
      >
        <div className="w-8 h-8 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all" />
      </motion.div>

      {/* Inner Dot (Instant exact pointer) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden sm:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 }
        }}
        aria-hidden="true"
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
    </>
  );
}

export default React.memo(CursorFollower);
