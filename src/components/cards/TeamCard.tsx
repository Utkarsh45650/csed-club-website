import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MessageCircle, Code2, Mail } from 'lucide-react';
import type { TeamMember, SocialLink } from '../../data/teamData';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';

// ----------------------------------------------------------------------
// Social Icon Mapping
// ----------------------------------------------------------------------
const getSocialIcon = (platform: SocialLink['platform']) => {
  const iconMap: Record<string, any> = {
    linkedin: Briefcase,
    twitter: MessageCircle,
    github: Code2,
    email: Mail,
    website: Mail,
  };
  const Icon = iconMap[platform] || Mail;
  return <Icon size={18} />;
};

export default function TeamCard({ member }: { member: TeamMember }) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const showDetails = isActive || isHovered;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      className="group relative flex flex-col bg-[#111827] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)] cursor-pointer"
    >
      {/* Glow Border on Hover / Active */}
      <div 
        className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-500 z-20 pointer-events-none ${
          showDetails 
            ? 'opacity-100 border-[#00D4FF]/50 shadow-[0_0_30px_rgba(0,212,255,0.2)]' 
            : 'opacity-0 shadow-[0_0_0px_rgba(0,212,255,0)]'
        }`} 
      />

      <motion.div 
        animate={showDetails ? { y: -8 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex flex-col h-full"
      >
        {/* Profile Image Wrapper */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0B1020]">
          <ImageWithSkeleton 
            src={member.image} 
            alt={member.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            imageClassName={`w-full h-full object-cover transition-all duration-500 ${
              showDetails 
                ? 'opacity-100 filter-none grayscale-0 scale-105' 
                : 'opacity-80 filter grayscale scale-100'
            }`}
          />
          {/* Subtle gradient overlay to ensure text readability if overlaid */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/20 to-transparent" />
          
          {/* Social Reveal (Slides up from the bottom of the image on hover / active) */}
          <motion.div 
            animate={showDetails ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20"
          >
            {member.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking social link
                className="p-2.5 bg-black/50 hover:bg-[#00D4FF] hover:text-black rounded-full text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center p-6 bg-[#111827] relative z-10">
          <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-sm font-medium text-[#00D4FF]">{member.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
