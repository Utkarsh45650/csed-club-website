import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../cards/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { projects } from '../../data/projectData';
import type { Project } from '../../data/projectData';

export default function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="relative w-full py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading 
            eyebrow="Our Work"
            title="Featured Projects"
            description="Explore the latest innovations and technical achievements built by our members. Click any project to learn more."
            className="mb-0"
          />
          
          <Link 
            to="/projects"
            className="group flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors pb-2"
          >
            View All Projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
