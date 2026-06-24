import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';

// Utility for tailwind classes (can be extracted to lib/utils.ts later)
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
// Container (Inline for completeness, normally in src/components/layout)
// ----------------------------------------------------------------------
const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("max-w-7xl mx-auto px-6 md:px-8", className)}>
    {children}
  </div>
);

// ----------------------------------------------------------------------
// TextWave (Inline for completeness, normally in src/components/effects)
// ----------------------------------------------------------------------
const TextWave = ({ text }: { text: string }) => {
  return (
    <span className="relative flex overflow-hidden group">
      <span className="flex transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:-translate-y-full">
        {text.split('').map((char, i) => (
          <span key={i} className="inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </span>
      <span className="absolute flex transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] translate-y-full group-hover:translate-y-0">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
};

// ----------------------------------------------------------------------
// Button (Inline for completeness, normally in src/components/ui)
// ----------------------------------------------------------------------
import type { HTMLMotionProps } from 'framer-motion';

const Button = ({ children, className, ...props }: HTMLMotionProps<"button">) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200",
        "bg-[#00D4FF] text-[#050816] hover:bg-[#00FFC8] shadow-[0_0_20px_rgba(0,212,255,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// Main Navbar Component
// ----------------------------------------------------------------------
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Team', path: '/team' },
  { label: 'Projects', path: '/projects' },
  { label: 'Events', path: '/events' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, isMobileMenuOpen);

  // Handle Scroll to trigger glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and pause Lenis when mobile menu is open
  useScrollLock(isMobileMenuOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-4 bg-[#0B1020]/80 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        <Container className="flex items-center justify-between">
          
          {/* Logo - Left */}
          <Link to="/" className="relative z-50 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[#00D4FF] to-[#6C63FF] shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold tracking-tight text-white">
              CSED<span className="text-[#00D4FF]">.</span>
            </span>
          </Link>

          {/* Navigation - Center (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-1 py-2 text-sm font-medium transition-colors"
                >
                  <span className={cn("relative z-10", isActive ? "text-white" : "text-gray-300 hover:text-white")}>
                    <TextWave text={link.label} />
                  </span>
                  
                  {/* Active Indicator / Gradient Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D4FF] to-[#00FFC8] rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button - Right (Desktop) */}
          <div className="hidden md:block">
            <Button>Apply Now</Button>
          </div>

          {/* Hamburger - Mobile */}
          <button
            className="md:hidden relative z-50 p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </Container>
      </motion.nav>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#050816] flex flex-col pt-24 px-6 md:hidden"
          >
            {/* Background Orb for Drawer */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.2)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center justify-between border-b border-white/5 pb-4"
                    >
                      <span className={cn(
                        "text-3xl font-semibold tracking-tight",
                        isActive ? "text-white" : "text-gray-400"
                      )}>
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto pb-12 relative z-10"
            >
              <Button className="w-full py-4 text-lg">Apply Now</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
