import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../effects/Reveal';
import Container from '../layout/Container';

export default function DescriptionCardSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-12 md:py-20 bg-[#050816] overflow-hidden">
      <Container>
        <Reveal delay={0.1}>
          <div className="relative w-full bg-[#111827] rounded-[2rem] border border-white/10 p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden group">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00D4FF]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6C63FF]/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Animated Grid overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                maskImage: 'radial-gradient(circle at 100% 0%, black 10%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 100% 0%, black 10%, transparent 70%)',
              }}
            />

            {/* Top Right Floating Image (Hidden on very small screens to save space, or scaled down) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute -top-12 -right-12 sm:top-8 sm:right-8 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 z-20 pointer-events-none opacity-30 sm:opacity-100"
            >
              <div className="w-full h-full relative">
                {/* Techy ring around image */}
                <motion.div 
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-15%] rounded-full border border-dashed border-[#00D4FF]/30"
                />
                <motion.div 
                  animate={shouldReduceMotion ? {} : { rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-25%] rounded-full border border-dotted border-[#6C63FF]/30"
                />
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                  alt="Tech Core"
                  className="w-full h-full object-cover rounded-full shadow-[0_0_40px_rgba(0,212,255,0.4)] border-2 border-[#00D4FF]/50 relative z-10"
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-30 w-full sm:w-2/3 lg:w-1/2 pr-4 md:pr-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00FFC8]/20 bg-[#00FFC8]/5 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00FFC8] animate-pulse" />
                <span className="text-xs font-semibold tracking-widest text-[#00FFC8] uppercase">
                  Our Mission
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]">Digital Frontier</span>
              </h2>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl drop-shadow-md">
                We are a collective of developers, designers, and innovators pushing the boundaries of what's possible. From artificial intelligence to decentralized systems, we turn bold ideas into robust, production-ready software.
              </p>

              <div className="grid grid-cols-2 gap-6 max-w-sm">
                <div className="flex flex-col gap-2 border-l-2 border-[#00D4FF]/50 pl-4 bg-white/5 p-3 rounded-r-lg">
                  <span className="text-white font-bold text-2xl">50+</span>
                  <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Projects Built</span>
                </div>
                <div className="flex flex-col gap-2 border-l-2 border-[#6C63FF]/50 pl-4 bg-white/5 p-3 rounded-r-lg">
                  <span className="text-white font-bold text-2xl">10k+</span>
                  <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Lines of Code</span>
                </div>
              </div>
            </div>
            
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
