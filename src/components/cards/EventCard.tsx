import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Event } from '../../data/eventData';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function EventCard({ event }: { event: Event }) {
  const isOngoing = event.status === 'ongoing';
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover="hover"
      className="group relative flex flex-col md:flex-row bg-[#111827] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.25)] h-full"
    >
      {/* 
        Animated Border on Hover 
      */}
      <div className="absolute inset-[-50%] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div 
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={shouldReduceMotion ? {} : { duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_340deg,#00D4FF_360deg)]"
        />
      </div>

      {/* Inner Card Content */}
      <motion.div 
        variants={{
          hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
        }}
        className="relative z-10 flex flex-col md:flex-row w-full h-full m-[1px] bg-[#0B1020] rounded-[15px] overflow-hidden"
      >
        {/* Banner Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-[#050816]">
          <ImageWithSkeleton
            src={event.banner} 
            alt={event.title}
            sizes="(max-width: 768px) 100vw, 33vw"
            variants={{
              hover: { scale: 1.05, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
            }}
            imageClassName="opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] md:bg-gradient-to-l md:from-[#0B1020] via-transparent to-transparent" />
          
          {/* Live Pulse Badge */}
          {isOngoing && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFC8] shadow-[0_0_10px_#00FFC8]"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Live Now</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-[#00D4FF] transition-colors">
              {event.title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={16} className="text-[#6C63FF]" />
                <span className="font-medium">{event.date}</span>
              </div>
              {/* Venue */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} className="text-[#6C63FF]" />
                <span className="font-medium">{event.venue}</span>
              </div>
            </div>

            {/* Action Button */}
            <a 
              href={event.registrationUrl}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                isOngoing 
                  ? "bg-[#00FFC8]/10 text-[#00FFC8] border border-[#00FFC8]/20 hover:bg-[#00FFC8] hover:text-black shadow-[0_0_15px_rgba(0,255,200,0.2)]"
                  : "bg-white/5 text-white border border-white/10 hover:bg-[#00D4FF] hover:text-black hover:border-[#00D4FF] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
              )}
            >
              {isOngoing ? "Join Now" : "Register"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
