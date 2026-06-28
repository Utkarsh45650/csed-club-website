import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import { aboutData } from '../../data/aboutData';

export default function AboutPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 via-[#6C63FF]/10 to-transparent rounded-full filter blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Text Content & CTA */}
          <div className="flex flex-col items-start gap-8">
            <SectionHeading 
              eyebrow="Who We Are"
              title="Building the next generation of engineers."
              className="mb-0" // We handle gap via flex parent here
            />

            <motion.div variants={itemVariants}>
              <Link 
                to="/about"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10">Read Our Full Story</span>
                <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1 text-[#00D4FF]" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Mission & Vision Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Mission Card */}
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-[#111827] rounded-2xl p-8 border border-white/5 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:border-[#00D4FF]/50 shadow-[0_0_0px_rgba(0,212,255,0)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500 z-20 pointer-events-none" />
              
              <motion.div 
                variants={{
                  hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="absolute -top-8 -left-8 w-1 h-[calc(100%+4rem)] bg-gradient-to-b from-[#00D4FF] to-transparent opacity-50" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 flex items-center justify-center border border-[#00D4FF]/20">
                    <Target size={24} className="text-[#00D4FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {aboutData.mission}
                </p>
              </motion.div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-[#111827] rounded-2xl p-8 border border-white/5 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:border-[#6C63FF]/50 shadow-[0_0_0px_rgba(0,212,255,0)] group-hover:shadow-[0_0_30px_rgba(108,99,255,0.2)] transition-all duration-500 z-20 pointer-events-none" />
              
              <motion.div 
                variants={{
                  hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                className="relative z-10 flex flex-col h-full"
              >
                <div className="absolute -top-8 -left-8 w-1 h-[calc(100%+4rem)] bg-gradient-to-b from-[#6C63FF] to-transparent opacity-50" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6C63FF]/10 flex items-center justify-center border border-[#6C63FF]/20">
                    <Lightbulb size={24} className="text-[#6C63FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {aboutData.vision}
                </p>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
