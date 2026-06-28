import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import EventCard from '../components/cards/EventCard';
import { events, type Event } from '../data/eventData';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EventModal from '../components/ui/EventModal';

import StaggeredHeadline from '../components/ui/StaggeredHeadline';

// ----------------------------------------------------------------------
// Main Events Page Component
// ----------------------------------------------------------------------
export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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

  const gridX = useTransform(smoothMouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);
  const gridY = useTransform(smoothMouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);

  // Filter Events
  const ongoingEvents = events.filter(e => e.status === 'ongoing');
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const completedEvents = events.filter(e => e.status === 'completed');

  return (
    <>
      <SEO 
        title="Events" 
        description="Join our upcoming hackathons, workshops, and tech talks. Stay updated with CSED Club's event calendar." 
        url="/events"
      />
      <div className="min-h-screen bg-[#050816]">
      
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/5 pt-20"
      >
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

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
              Get Involved
            </span>
          </motion.div>

          <StaggeredHeadline text="Discover Events." />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 mt-8 leading-relaxed mx-auto max-w-2xl"
          >
            Join our hackathons, technical workshops, and exclusive talks. Connect, learn, and build with the brightest minds.
          </motion.p>
        </div>
      </section>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 space-y-32">

        {/* 2. Ongoing Events */}
        {ongoingEvents.length > 0 && (
          <section>
            <SectionHeading 
              eyebrow="Happening Now"
              title="Live Events"
              description="Join these events currently in progress."
            />
            <div className="flex flex-col gap-6 max-w-4xl">
              {ongoingEvents.map(event => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section>
            <SectionHeading 
              eyebrow="Mark Your Calendar"
              title="Upcoming Events"
              description="Register now to secure your spot in our future sessions."
            />
            <div className="flex flex-col gap-6 max-w-4xl">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Completed Events (Timeline Layout) */}
        {completedEvents.length > 0 && (
          <section>
            <SectionHeading 
              eyebrow="Our History"
              title="Past Events"
              description="Explore our archive of successful hackathons and workshops."
            />
            <div className="max-w-4xl pt-8">
              <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 md:ml-6 space-y-12">
                {completedEvents.map(event => (
                  <motion.div 
                    key={event.id} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="relative"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[37px] md:-left-[53px] top-8 w-4 h-4 rounded-full bg-[#050816] border-2 border-[#6C63FF] shadow-[0_0_10px_rgba(108,99,255,0.5)] z-20" />
                    
                    {/* Timeline Connector Line Glow */}
                    <div className="absolute -left-[30px] md:-left-[46px] top-12 bottom-[-48px] w-[1px] bg-gradient-to-b from-[#6C63FF]/30 to-transparent z-10" />

                    <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
