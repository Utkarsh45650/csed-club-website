import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '../../data/projectData';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import ImageWithSkeleton from './ImageWithSkeleton';
import { trackEvent } from '../../utils/analytics';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, true);
  
  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll and pause Lenis when modal is open
  useScrollLock(true);

  // Track analytics event when a user opens a project
  useEffect(() => {
    trackEvent('View Project', { project_name: project.title });
  }, [project.title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#050816]/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal Content */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#111827] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#00D4FF] hover:text-black rounded-full text-white backdrop-blur-sm transition-all duration-200"
        >
          <X size={20} />
        </button>

        {/* Scrollable Area */}
        <div className="overflow-y-auto w-full h-full custom-scrollbar">
          
          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 relative bg-[#050816]">
            <ImageWithSkeleton 
              src={project.thumbnail} 
              alt={project.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent z-20" />
          </div>

          {/* Body Details */}
          <div className="p-8 -mt-20 relative z-30">
            <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {project.title}
            </h2>
            
            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-1.5 text-sm font-medium text-[#00D4FF] bg-[#00D4FF]/10 rounded-md border border-[#00D4FF]/20">
                  {tech}
                </span>
              ))}
            </div>

            {/* Long Description */}
            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Footer (Team & Links) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-white/10 gap-6">
              <div>
                <h4 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-2">Team</h4>
                <p className="text-white font-medium">{project.team.join(", ")}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    <Code2 size={18} />
                    <span className="text-sm font-medium">Source Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D4FF] hover:bg-[#00FFC8] text-[#050816] font-medium shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,200,0.5)] transition-all"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
