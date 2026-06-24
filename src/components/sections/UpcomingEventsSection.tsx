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
        
        <SectionHeading 
          eyebrow="Get Involved"
          title="Upcoming Events"
          description="Join us for hackathons, workshops, and exclusive talks from industry leaders."
        />

        <div className="flex flex-col gap-6 max-w-4xl">
          {activeEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

      </div>
    </section>
  );
}
