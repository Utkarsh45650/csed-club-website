import SEO from '../../components/seo/SEO';
import HeroSection from '../../components/sections/HeroSection';
import StatisticsSection from '../../components/sections/StatisticsSection';
import AboutPreviewSection from '../../components/sections/AboutPreviewSection';
import FeaturedProjectsSection from '../../components/sections/FeaturedProjectsSection';
import UpcomingEventsSection from '../../components/sections/UpcomingEventsSection';
import TeamPreviewSection from '../../components/sections/TeamPreviewSection';

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Home" 
        description="The official website of the CSED Club. Innovating, building, and exploring the frontiers of technology." 
      />
      <div className="flex flex-col w-full">
        <HeroSection />
        <StatisticsSection />
        <AboutPreviewSection />
        <FeaturedProjectsSection />
        <UpcomingEventsSection />
        <TeamPreviewSection />
      </div>
    </>
  );
}
