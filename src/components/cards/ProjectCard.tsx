import { motion } from 'framer-motion';
import type { Project } from '../../data/projectData';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover="hover"
      onClick={onClick}
      className="group relative flex flex-col cursor-pointer bg-[#111827] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)] h-full"
    >
      {/* Glow Border on Hover */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:border-[#00D4FF]/50 shadow-[0_0_0px_rgba(0,212,255,0)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500 z-20 pointer-events-none" />

      {/* Lift effect wrapper */}
      <motion.div 
        variants={{
          hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
        }}
        className="flex flex-col h-full"
      >
        {/* Thumbnail */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden bg-[#050816]">
          <ImageWithSkeleton
            src={project.thumbnail} 
            alt={project.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            variants={{
              hover: { scale: 1.05, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
            }}
            imageClassName="opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 z-10 bg-[#111827]">
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 text-xs font-medium text-[#00D4FF] bg-[#00D4FF]/10 rounded-md border border-[#00D4FF]/20">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-md border border-white/10">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
