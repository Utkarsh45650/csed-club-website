import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Calendar, MapPin, Clock } from 'lucide-react';
import type { Event } from '../../data/eventData';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import ImageWithSkeleton from './ImageWithSkeleton';
import { trackEvent } from '../../utils/analytics';

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
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

  // Track analytics event when a user opens an event
  useEffect(() => {
    trackEvent('View Event', { event_name: event.title });
  }, [event.title]);

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
        <div 
          className="flex-1 min-h-0 overflow-y-auto w-full custom-scrollbar overscroll-contain"
          data-lenis-prevent="true"
        >
          
          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 relative bg-[#050816]">
            <ImageWithSkeleton 
              src={event.banner} 
              alt={event.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent z-20" />
          </div>

          {/* Body Details */}
          <div className="p-8 -mt-20 relative z-30">
            <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {event.title}
            </h2>
            
            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-sm font-medium text-[#00FFC8] bg-[#00FFC8]/10 rounded-md border border-[#00FFC8]/20">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Event Info (Where & When) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-[#6C63FF]/20 text-[#6C63FF]">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Date</p>
                  <p className="text-white font-medium">{event.date}</p>
                </div>
              </div>
              
              {event.time && (
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-[#00D4FF]/20 text-[#00D4FF]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Time</p>
                    <p className="text-white font-medium">{event.time}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B]">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Venue</p>
                  <p className="text-white font-medium">{event.venue}</p>
                </div>
              </div>
            </div>

            {/* Long Description */}
            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-gray-300 text-lg leading-relaxed">
                {event.longDescription || event.description}
              </p>
            </div>

            {/* Footer (Skills & Links) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-white/10 gap-6">
              <div className="flex-1">
                {event.skillsLearned && event.skillsLearned.length > 0 && (
                  <>
                    <h4 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">What you'll learn / Pros</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {event.skillsLearned.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-200 font-medium text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1.5 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {event.imagesLink && (
                  <a 
                    href={event.imagesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6C63FF] hover:bg-[#867FFA] text-white font-medium shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(108,99,255,0.5)] transition-all"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm font-medium">View Images</span>
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
