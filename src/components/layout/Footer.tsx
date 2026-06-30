import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from './Container';
import TextWave from '../effects/TextWave';
import Button from '../ui/Button';
import Reveal from '../effects/Reveal';

const Github = (
  props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Instagram = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Twitter = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const Youtube = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const SOCIAL_LINKS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'X (Twitter)' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Team', path: '/team' },
  { label: 'Projects', path: '/projects' },
  { label: 'Events', path: '/events' },
  { label: 'About', path: '/about' },
];

const RESOURCE_LINKS = [
  { label: 'Join Club', path: '/coming-soon' },
  { label: 'Gallery', path: '#' },
  { label: 'Achievements', path: '#' },
  { label: 'Contact', path: '#' },
  { label: 'FAQ', path: '#' },
];

const CONTACT_INFO = [
  { label: 'Email', value: 'hello@csedclub.com' },
  { label: 'Phone', value: '+1 (555) 123-4567' },
  { label: 'College', value: 'University of Technology' },
  { label: 'Location', value: 'Innovation Lab, Building 4' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050816] pt-24 pb-8 overflow-hidden">
      {/* Subtle Top Glow separating footer from content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] max-w-xl h-[400px] bg-[#00D4FF]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Continuation Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 lg:gap-8 mb-16">

          {/* Column 1: Brand */}
          <Reveal delay={0.1} className="col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Link to="/" className="flex items-center gap-2 group mb-6">
                {/* <img src="/assets/logo.jpg" alt="CSED Logo" className="h-8 w-auto rounded-sm object-contain shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-transform duration-300 group-hover:scale-110" /> */}
                <span className="text-xl font-bold tracking-tight text-white">
                  CSED Club<span className="text-[#00D4FF]">.</span>
                </span>
              </Link>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 max-w-xs">
                Empowering students to build the future. We turn bold ideas into production-ready software.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="relative p-2 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                      whileHover={{ scale: 1.08, rotate: -5, y: -2 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    >
                      <Icon className="w-[18px] h-[18px] relative z-10" />
                      <div className="absolute inset-0 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/20 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all duration-300" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Column 2: Navigation */}
          <Reveal delay={0.2} className="col-span-1">
            <div className="flex flex-col items-start">
              <h3 className="text-xs font-semibold tracking-widest text-[#00D4FF] uppercase mb-6">
                Navigation
              </h3>
              <ul className="flex flex-col gap-3 text-left">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center text-[#9CA3AF] hover:text-white transition-colors duration-300 text-sm py-1 outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
                    >
                      <span className="relative overflow-hidden">
                        <TextWave text={link.label} />
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#00D4FF] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column 3: Resources */}
          <Reveal delay={0.3} className="col-span-1">
            <div className="flex flex-col items-start">
              <h3 className="text-xs font-semibold tracking-widest text-[#00D4FF] uppercase mb-6">
                Resources
              </h3>
              <ul className="flex flex-col gap-3 text-left">
                {RESOURCE_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {link.path.startsWith('http') ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="group flex items-center text-[#9CA3AF] hover:text-white transition-colors duration-300 text-sm py-1 outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm">
                        <span className="relative overflow-hidden">
                          <TextWave text={link.label} />
                          <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#00D4FF] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="group flex items-center text-[#9CA3AF] hover:text-white transition-colors duration-300 text-sm py-1 outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-sm"
                      >
                        <span className="relative overflow-hidden">
                          <TextWave text={link.label} />
                          <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#00D4FF] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
                        </span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Column 4: Stay Connected */}
          <Reveal delay={0.4} className="col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center md:items-start w-full">
              <h3 className="text-xs font-semibold tracking-widest text-[#00D4FF] uppercase mb-6">
                Stay Connected
              </h3>

              <div className="w-full max-w-xs mb-8">
                <form className="relative flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 to-[#6C63FF]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      aria-label="Email Address"
                      className="relative w-full bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full justify-center">
                    Subscribe
                  </Button>
                </form>
                <p className="text-[#9CA3AF] text-xs mt-3 text-center md:text-left">
                  We care about your data. Read our <Link to="#" className="text-white hover:text-[#00D4FF] underline decoration-white/30 hover:decoration-[#00D4FF] transition-colors">Privacy Policy</Link>.
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs text-center md:text-left">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="flex flex-col md:flex-row md:items-center justify-between text-xs">
                    <span className="text-[#9CA3AF] font-medium">{info.label}</span>
                    <span className="text-gray-300">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

        {/* Bottom Section */}
        <Reveal delay={0.6}>
          <div className="pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
            <p>© {currentYear} CSED Tech Club. All rights reserved.</p>

            <p className="flex items-center gap-1">
              Built with <span className="text-red-500 animate-pulse">❤️</span> by Tech Club
            </p>

            <div className="flex items-center gap-6">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <Github size={14} /> Repository
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
