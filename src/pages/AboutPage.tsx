import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Users, Code2, Trophy, Mic, Target, Lightbulb, Globe, Rocket, Terminal, BookOpen, HeartHandshake } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import StatCard from '../components/cards/StatCard';
import { aboutData } from '../data/aboutData';
import SEO from '../components/seo/SEO';
import FadedMemoriesBackground from '../components/sections/FadedMemoriesBackground';

import StaggeredHeadline from '../components/ui/StaggeredHeadline';

// ----------------------------------------------------------------------
// Icon Mapper
// ----------------------------------------------------------------------
const getIcon = (name: string) => {
  switch (name) {
    case 'Users': return Users;
    case 'Code2': return Code2;
    case 'Trophy': return Trophy;
    case 'Mic': return Mic;
    default: return Terminal;
  }
};

const valueIcons = [BookOpen, HeartHandshake, Target, Globe];

// ----------------------------------------------------------------------
// Main About Page Component
// ----------------------------------------------------------------------
export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax Setup for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return;
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
        title="About Us"
        description="Learn about the CSED Club's mission, vision, and core principles."
      />
      <FadedMemoriesBackground />
      <div 
        ref={containerRef}
        className="min-h-screen pt-24 pb-12 overflow-hidden relative z-10"
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

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFC8] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
              Our Story
            </span>
          </motion.div>

          <StaggeredHeadline text="Who We Are." />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mt-8 leading-relaxed mx-auto max-w-2xl"
          >
            Building the foundation of tomorrow's technical leaders through community, innovation, and production-ready engineering.
          </motion.p>
        </div>
      </section>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 space-y-32">

        {/* 2 & 3. Mission & Vision */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              className="p-10 rounded-2xl bg-[#111827]/40 backdrop-blur-md border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-semibold tracking-widest text-[#00D4FF] uppercase mb-4">Our Mission</h3>
                <p className="text-2xl font-medium text-white leading-relaxed">
                  {aboutData.mission}
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-2xl bg-[#111827]/40 backdrop-blur-md border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Lightbulb size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-semibold tracking-widest text-[#6C63FF] uppercase mb-4">Our Vision</h3>
                <p className="text-2xl font-medium text-white leading-relaxed">
                  {aboutData.vision}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. Achievements (Placed before timeline for visual balance) */}
        <section>
          <SectionHeading 
            eyebrow="By The Numbers"
            title="Our Achievements"
            description="A quick look at our scale and impact across the community."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {aboutData.achievements.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={getIcon(stat.icon)}
                value={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                suffix={stat.value.includes('+') ? '+' : ''}
                label={stat.label}
              />
            ))}
          </div>
        </section>

        {/* 4. Journey Timeline */}
        <section>
          <SectionHeading 
            eyebrow="The Journey"
            title="Our History"
            description="How we started and where we are heading."
          />
          <div className="max-w-4xl pt-8">
            <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 md:ml-6 space-y-16">
              {aboutData.timeline.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="relative group"
                >
                  <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 rounded-full bg-[#050816] border-2 border-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.5)] z-20 group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute -left-[30px] md:-left-[46px] top-6 bottom-[-64px] w-[1px] bg-gradient-to-b from-[#00D4FF]/30 to-transparent z-10" />

                  <div>
                    <span className="text-[#00D4FF] font-bold tracking-wider text-sm mb-2 block">{item.year}</span>
                    <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Core Values */}
        <section>
          <SectionHeading 
            eyebrow="Principles"
            title="Core Values"
            description="The fundamental beliefs that guide our technical and cultural decisions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.coreValues.map((value, idx) => {
              const Icon = valueIcons[idx % valueIcons.length];
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-[#111827]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="text-[#00D4FF] w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* 7. Future Goals */}
        <section>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            className="p-10 md:p-16 bg-gradient-to-br from-[#111827]/60 to-[#0B1020]/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#6C63FF] opacity-10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/30 flex items-center justify-center mx-auto mb-8">
                <Rocket className="text-[#6C63FF] w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">Looking Forward</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {aboutData.futureGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-[#00FFC8] shadow-[0_0_10px_#00FFC8]" />
                    <p className="text-gray-300 font-medium">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

      </div>
      </div>
    </>
  );
}
