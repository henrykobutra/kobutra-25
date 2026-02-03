import ProminentPhoto from '@/components/home/prominent-photo';

/**
 * Featured work section showcasing current focus, recent projects, and career highlights.
 * Includes a prominent photo from the Launch Accelerator cohort experience.
 */
export default function FeaturedWorkSection() {
  return (
    <section id="work" className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-light mb-8">Featured Work</h2>
        
        {/* Current Focus */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Current Focus</h3>
          <div className="border-l-2 border-gray-200 pl-4">
            <h4 className="font-medium mb-1">Redii - CTO & Co-founder</h4>
            <p className="text-sm text-muted-foreground mb-2">Dec 2024 - Present</p>
            <p className="text-sm text-muted-foreground">Building global retirement benefits solutions for international teams. Focused on scalable fintech infrastructure and cross-border financial services.</p>
          </div>
          
          {/* Photo Break - Launch Accelerator Cohort */}
          <div className="mt-6">
            <ProminentPhoto 
              src="/images/photos/la35_cohort.jpeg"
              alt="Henry with the 35th Launch Accelerator cohort by Jason Calacanis"
              caption="With the LA35 cohort in Austin - Redii's journey through Jason Calacanis's Launch Accelerator program"
            />
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Recent Projects</h3>
          
          <div className="space-y-4">
            <div className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-medium mb-1">BackgroundCraft - Principal Consultant</h4>
              <p className="text-sm text-muted-foreground mb-2">Jun 2024 - Present</p>
              <p className="text-sm text-muted-foreground">30% efficiency improvement, 48-hour business continuity recovery enabling $50K revenue recovery, 40% increase in engagement.</p>
            </div>

            <div className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-medium mb-1">Resumo - AI Product Engineer & Designer</h4>
              <p className="text-sm text-muted-foreground mb-2">Dec 2023 - Present</p>
              <p className="text-sm text-muted-foreground">MVP launched in 8 weekends, 90% cost reduction through sophisticated token algorithms, scalable full-stack platform.</p>
            </div>
          </div>
        </div>

        {/* Career Highlights */}
        <div>
          <h3 className="text-lg font-medium mb-3">Career Highlights</h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium">Principal Financial Group - SVP Digital Innovation (2020-2022)</h4>
              <p className="text-muted-foreground">Led $5M enterprise-wide digital transformation, $300K cost reduction, 40% faster time-to-market, built 15-person product team.</p>
            </div>

            <div>
              <h4 className="font-medium">TISCO Financial Group - VP Digital Strategy (2015-2020)</h4>
              <p className="text-muted-foreground">Launched 3 mobile apps + 10 websites, led 40+ cross-functional members, 180% increase in digital engagement.</p>
            </div>

            <div>
              <h4 className="font-medium">Agoda - Senior Investment Analyst (2011-2012)</h4>
              <p className="text-muted-foreground">132% ROI through SEM campaigns, 20% conversion improvement, $10M+ monthly budget across 15 APAC markets.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
