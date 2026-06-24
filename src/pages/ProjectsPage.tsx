import React, { useState, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import SearchBar from '../components/ui/SearchBar';
import FilterChip from '../components/ui/FilterChip';
import ProjectCard from '../components/cards/ProjectCard';
import ProjectModal from '../components/ui/ProjectModal';
import SEO from '../components/seo/SEO';
import { projects } from '../data/projectData';
import type { Project } from '../data/projectData';
import StaggeredHeadline from '../components/ui/StaggeredHeadline';

// ----------------------------------------------------------------------
// Main Projects Page Component
// ----------------------------------------------------------------------
export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax Setup for Hero
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

  // Extract unique categories (technologies) dynamically
  const categories = useMemo(() => {
    const techs = new Set(projects.flatMap(p => p.technologies));
    return ["All", ...Array.from(techs).sort()];
  }, []);

  // Filter projects based on search query and active filter
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === "All" || project.technologies.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <>
      <SEO 
        title="Projects" 
        description="Explore the cutting-edge open-source projects, applications, and experiments built by the CSED Club." 
        url="/projects"
      />
      <div className="min-h-screen bg-[#050816]">
        
        {/* ---------------- 1. HERO SECTION ---------------- */}
        <section 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/5 pt-20"
        >
          {/* Background Layer: Gradient Orbs & Grid */}
          <motion.div
            animate={shouldReduceMotion ? {} : { x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={shouldReduceMotion ? {} : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.2)_0%,transparent_70%)] rounded-full mix-blend-screen pointer-events-none"
            style={{ willChange: "transform" }}
          />
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

          {/* Content Layer */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
                Our Work
              </span>
            </motion.div>

            <StaggeredHeadline text="Explore Projects." />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mt-8 leading-relaxed mx-auto max-w-2xl"
            >
              Discover the technical achievements and innovative solutions built by our club members across various domains.
            </motion.p>
          </div>
        </section>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24">
          
          {/* 2 & 3. Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <SearchBar 
              placeholder="Search projects by name or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 custom-scrollbar mask-edges">
              {categories.map((category) => (
                <FilterChip 
                  key={category}
                  label={category}
                  active={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                />
              ))}
            </div>
          </div>

          {/* 4. Project Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter + searchQuery} // Triggers exit/enter animation when filters change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => setSelectedProject(project)} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="text-gray-500 text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                  <p className="text-gray-400">Try adjusting your search query or selected filters.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </section>

        {/* ---------------- 5. PROJECT MODAL ---------------- */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
