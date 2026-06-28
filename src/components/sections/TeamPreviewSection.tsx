import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import { teamMembers } from '../../data/teamData';
import TeamCard from '../cards/TeamCard';


// ----------------------------------------------------------------------
// Main Section Component
// ----------------------------------------------------------------------
export default function TeamPreviewSection() {
  // Extract one of each category for the preview
  const chiefPatronPreview = teamMembers.find(m => m.category === 'chief-patron');
  const patronPreview = teamMembers.find(m => m.category === 'patron');
  const mentorPreview = teamMembers.find(m => m.category === 'mentor');
  const councilPreview = teamMembers.filter(m => m.category === 'council').slice(0, 1);

  // Combine them into a single array for rendering
  const previewMembers = [
    ...(chiefPatronPreview ? [chiefPatronPreview] : []),
    ...(patronPreview ? [patronPreview] : []),
    ...(mentorPreview ? [mentorPreview] : []),
    ...councilPreview
  ];

  return (
    <section className="relative w-full py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading 
            eyebrow="Leadership"
            title="Meet the Team"
            description="Driven by passion and guided by experience. Discover the minds behind the club's success."
            className="mb-0" // Remove default margin since we handle it here
          />
          
          <Link 
            to="/team"
            className="group flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors"
          >
            View Full Team
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {previewMembers.map((member) => (
            <div key={member.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
              <TeamCard member={member} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
