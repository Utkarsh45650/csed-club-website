import { useState, useEffect, useRef } from 'react';
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

import Container from './Container';
import TextWave from '../effects/TextWave';

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
            <img src="/assets/logo.jpg" alt="CSED Logo" className="h-8 w-auto rounded-sm object-contain shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform duration-300 group-hover:scale-110" />
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

          {/* Removed CTA Button */}

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

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-[80px] right-6 w-56 md:hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] origin-top-right z-50 rounded-2xl"
            >
              {/* Separate background layer to fix Safari/Mobile backdrop-filter bug with Framer Motion transforms */}
              <div 
                className="absolute inset-0 bg-[#0B1020]/80 rounded-2xl border border-white/10"
                style={{ 
                  backdropFilter: 'blur(64px)',
                  WebkitBackdropFilter: 'blur(64px)'
                }}
              />
              
              <div className="flex flex-col p-2 relative z-10">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={cn(
                          "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                          isActive ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span className="text-sm font-medium tracking-tight">
                          {link.label}
                        </span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
