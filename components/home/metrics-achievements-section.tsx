import CertificationBadges from '@/components/home/certification-badges';
import ProminentPhoto from '@/components/home/prominent-photo';

/**
 * Metrics and achievements section displaying key performance indicators,
 * strategic planning photo, and certification badges.
 */
export default function MetricsAchievementsSection() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-light mb-8">Metrics & Achievements</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="text-lg font-medium">15+</div>
            <div className="text-sm text-muted-foreground">Years of Technical Leadership</div>
          </div>
          <div>
            <div className="text-lg font-medium">3</div>
            <div className="text-sm text-muted-foreground">Languages Spoken Fluently</div>
          </div>
          <div>
            <div className="text-lg font-medium">90%</div>
            <div className="text-sm text-muted-foreground">Cost Reduction with AI</div>
          </div>
          <div>
            <div className="text-lg font-medium">$5M+</div>
            <div className="text-sm text-muted-foreground">Digital Transformation Budgets</div>
          </div>
          <div>
            <div className="text-lg font-medium">180%</div>
            <div className="text-sm text-muted-foreground">User Engagement Growth</div>
          </div>
          <div>
            <div className="text-lg font-medium">10K+</div>
            <div className="text-sm text-muted-foreground">Users on AI Products Built</div>
          </div>
        </div>

        {/* Photo Break - Problem Solving Process */}
        <div className="mb-8">
          <ProminentPhoto 
            src="/images/photos/henry_sticky_notes.jpg"
            alt="Henry planning and problem-solving with sticky notes"
            caption="Strategic planning and cross-functional team leadership - turning complex challenges into actionable solutions"
          />
        </div>

        <CertificationBadges />
      </div>
    </section>
  );
}
