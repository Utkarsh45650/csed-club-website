import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Users, Calendar, Trophy } from 'lucide-react';

import StatCard from '../cards/StatCard';

// ----------------------------------------------------------------------
// Main Statistics Section
// ----------------------------------------------------------------------
const statsData = [
  {
    icon: Code2,
    value: 45,
    suffix: "+",
    label: "Projects Completed"
  },
  {
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Active Members"
  },
  {
    icon: Calendar,
    value: 80,
    suffix: "",
    label: "Tech Events Hosted"
  },
  {
    icon: Trophy,
    value: 12,
    suffix: "",
    label: "Awards Won"
  }
];

export default function StatisticsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-100px" });

  return (
    <section className="relative w-full py-24 bg-[#050816]">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Stagger Container */}
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
        >
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
