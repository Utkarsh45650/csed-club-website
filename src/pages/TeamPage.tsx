import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import TeamCard from '../components/cards/TeamCard';
import { teamMembers } from '../data/teamData';

import StaggeredHeadline from '../components/ui/StaggeredHeadline';

// ----------------------------------------------------------------------
// Main Team Page Component
// ----------------------------------------------------------------------
export default function TeamPage() {
  const patrons = teamMembers.filter(m => m.category === 'patron');
  const mentors = teamMembers.filter(m => m.category === 'mentor');
  const council = teamMembers.filter(m => m.category === 'council');

  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Mouse Parallax Setup for Hero (Matching Home Page exactly)
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

  // Parallax Transforms
  const gridX = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);
  const gridY = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);

  return (
    <>
      <SEO 
        title="Our Team"
        description="Meet the passionate engineers, designers, and visionaries driving the CSED Club."
      />
      <div 
        ref={containerRef}
        className="min-h-screen pt-24 pb-12 overflow-hidden relative"
        onMouseMove={handleMouseMove}
      >
        {/* 1. Hero Section */}
        <section className="relative z-10 min-h-[60vh] flex flex-col justify-center">
          {/* Background Layer: Gradient Orb 1 */}
          <motion.div
            animate={shouldReduceMotion ? {} : { x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={shouldReduceMotion ? {} : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.2)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
          style={{ willChange: "transform" }}
        />

        {/* Background Layer: Gradient Orb 2 */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.05, 1] }}
          transition={shouldReduceMotion ? {} : { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
          style={{ willChange: "transform" }}
        />

        {/* Background Layer: Animated Grid */}
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
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFC8] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
              The People
            </span>
          </motion.div>

          <StaggeredHeadline text="Meet the Team." />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mt-8 leading-relaxed mx-auto max-w-2xl"
          >
            A collective of passionate engineers, designers, and visionaries dedicated to pushing the boundaries of collegiate technical innovation.
          </motion.p>
        </div>
      </section>

      {/* ---------------- 2-4. MAIN SECTIONS ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 space-y-32">
        
        {/* Patrons Section */}
        {patrons.length > 0 && (
          <section>
            <SectionHeading 
              eyebrow="Guidance"
              title="Our Patrons"
              description="Eminent leaders providing strategic direction and unwavering support."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {patrons.map(member => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Mentors Section */}
        {mentors.length > 0 && (
          <section>
            <SectionHeading 
              eyebrow="Expertise"
              title="Industry Mentors"
              description="Seasoned professionals bridging the gap between academia and industry."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentors.map(member => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Council Section */}
        {council.length > 0 && (
          <section>
            <SectionHeading 
              eyebrow="Leadership"
              title="Student Council"
              description="The driving force orchestrating events, projects, and club operations."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {council.map(member => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

      </div>
      </div>
    </>
  );
}
