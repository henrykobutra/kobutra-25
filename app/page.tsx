import HeroSection from '@/components/home/hero-section';
import MetricsAchievementsSection from '@/components/home/metrics-achievements-section';
import FeaturedWorkSection from '@/components/home/featured-work-section';
import TechnicalExpertiseSection from '@/components/home/technical-expertise-section';
import AboutSection from '@/components/home/about-section';
import ContactSection from '@/components/home/contact-section';
import ProminentPhoto from '@/components/home/prominent-photo';

/**
 * Home page component serving as the main landing page for Henry Kobutra's portfolio.
 * Composed of modular sections showcasing professional experience, technical expertise, and contact information.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MetricsAchievementsSection />
      <FeaturedWorkSection />
      <TechnicalExpertiseSection />
      
      {/* Photo Break - YouTube Content Creation */}
      <ProminentPhoto 
        src="/images/photos/henry_making_youtube.jpg"
        alt="Henry creating YouTube content for his 15k+ subscribers"
        caption="Sharing knowledge with 15k+ subscribers and mentoring the next generation of tech professionals"
      />
      
      <AboutSection />
      <ContactSection />
    </div>
  );
}
