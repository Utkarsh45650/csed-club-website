import { motion } from 'framer-motion';
import { Briefcase, MessageCircle, Code2, Mail } from 'lucide-react';
import type { TeamMember, SocialLink } from '../../data/teamData';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';

// ----------------------------------------------------------------------
// Social Icon Mapping
// ----------------------------------------------------------------------
const getSocialIcon = (platform: SocialLink['platform']) => {
  const iconMap: Record<string, React.ElementType> = {
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
  return (
    <motion.div
      whileHover="hover"
      className="group relative flex flex-col bg-[#111827] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
    >
      {/* Glow Border on Hover */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:border-[#00D4FF]/50 shadow-[0_0_0px_rgba(0,212,255,0)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500 z-20 pointer-events-none" />

      <motion.div 
        variants={{
          hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
        }}
        className="flex flex-col h-full"
      >
        {/* Profile Image Wrapper */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0B1020]">
          <ImageWithSkeleton 
            src={member.image} 
            alt={member.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            variants={{
              hover: { scale: 1.05, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
            }}
            imageClassName="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
          />
          {/* Subtle gradient overlay to ensure text readability if overlaid */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/20 to-transparent" />
          
          {/* Social Reveal (Slides up from the bottom of the image on hover) */}
          <motion.div 
            variants={{
              hover: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
            }}
            initial={{ y: 20, opacity: 0 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20"
          >
            {member.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
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
