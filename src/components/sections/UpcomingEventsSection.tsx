import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { events } from '../../data/eventData';
import EventCard from '../cards/EventCard';

// ----------------------------------------------------------------------
// Main Section Component
// ----------------------------------------------------------------------
export default function UpcomingEventsSection() {
  const activeEvents = events.filter(e => e.status !== 'completed');

  return (
    <section className="relative w-full py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading 
            eyebrow="Get Involved"
            title="Upcoming Events"
            description="Join us for hackathons, workshops, and exclusive talks from industry leaders."
            className="mb-0"
          />
          
          <Link 
            to="/events"
            className="group flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors pb-2"
          >
            View All Events
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl">
          {activeEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

      </div>
    </section>
  );
}
