import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import CertificationBadges from '@/components/home/certification-badges';
import ProminentPhoto from '@/components/home/prominent-photo';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 overflow-visible">
        <div className="max-w-4xl mx-auto px-4 overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Content - Left Side */}
            <div className="col-span-2">
              <h1 className="text-3xl md:text-4xl font-light mb-4">
                Henry Kobutra
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                CTO & Co-founder at Redii. 15+ years of technical leadership across fintech, AI/ML, and digital transformation.
              </p>
              
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>
                  Full-stack technologist with deep expertise across Python, JavaScript, AWS, AI/ML, and cybersecurity. 
                  Fluent in three languages{' '}
                  <ReactCountryFlag 
                    countryCode="US" 
                    svg 
                    style={{ width: '1em', height: '1em' }}
                    title="United States"
                  />{' '}
                  <ReactCountryFlag 
                    countryCode="TH" 
                    svg 
                    style={{ width: '1em', height: '1em' }}
                    title="Thailand"
                  />{' '}
                  <ReactCountryFlag 
                    countryCode="DE" 
                    svg 
                    style={{ width: '1em', height: '1em' }}
                    title="Germany"
                  />{' '}
                  with proven cross-cultural leadership experience. 
                  Track record of delivering measurable impact: 90% cost reductions, 180% engagement growth, and managing $5M+ transformation budgets.
                </p>
              </div>
            </div>
            
            {/* Image - Right Side */}
            <div className="relative flex justify-center lg:justify-end col-span-1 overflow-visible">
              <div className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-28 top-1/2 -translate-y-1/2 -z-10">
                <Image
                  src="/images/common/h-logo-orange-glass.png"
                  alt="Henry Kobutra Logo"
                  width={1200}
                  height={1200}
                  priority
                  className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[60rem] lg:h-[60rem] object-contain opacity-30 sm:opacity-40 md:opacity-60 lg:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Achievements Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-light mb-8">Metrics & Achievements</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-lg font-medium">15+</div>
              <div className="text-sm text-gray-600">Years of Technical Leadership</div>
            </div>
            <div>
              <div className="text-lg font-medium">3</div>
              <div className="text-sm text-gray-600">Languages Spoken Fluently</div>
            </div>
            <div>
              <div className="text-lg font-medium">90%</div>
              <div className="text-sm text-gray-600">Cost Reduction with AI</div>
            </div>
            <div>
              <div className="text-lg font-medium">$5M+</div>
              <div className="text-sm text-gray-600">Digital Transformation Budgets</div>
            </div>
            <div>
              <div className="text-lg font-medium">180%</div>
              <div className="text-sm text-gray-600">User Engagement Growth</div>
            </div>
            <div>
              <div className="text-lg font-medium">10K+</div>
              <div className="text-sm text-gray-600">Users on AI Products Built</div>
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

      {/* Featured Work Section */}
      <section id="work" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-light mb-8">Featured Work</h2>
          
          {/* Current Focus */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Current Focus</h3>
            <div className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-medium mb-1">Redii - CTO & Co-founder</h4>
              <p className="text-sm text-gray-600 mb-2">Dec 2024 - Present</p>
              <p className="text-sm text-gray-700">Building global retirement benefits solutions for international teams. Focused on scalable fintech infrastructure and cross-border financial services.</p>
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
                <p className="text-sm text-gray-600 mb-2">Jun 2024 - Present</p>
                <p className="text-sm text-gray-700">30% efficiency improvement, 48-hour business continuity recovery enabling $50K revenue recovery, 40% increase in engagement.</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-4">
                <h4 className="font-medium mb-1">Resumo - AI Product Engineer & Designer</h4>
                <p className="text-sm text-gray-600 mb-2">Dec 2023 - Present</p>
                <p className="text-sm text-gray-700">MVP launched in 8 weekends, 90% cost reduction through sophisticated token algorithms, scalable full-stack platform.</p>
              </div>
            </div>
          </div>

          {/* Career Highlights */}
          <div>
            <h3 className="text-lg font-medium mb-3">Career Highlights</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium">Principal Financial Group - SVP Digital Innovation (2020-2022)</h4>
                <p className="text-gray-700">Led $5M enterprise-wide digital transformation, $300K cost reduction, 40% faster time-to-market, built 15-person product team.</p>
              </div>

              <div>
                <h4 className="font-medium">TISCO Financial Group - VP Digital Strategy (2015-2020)</h4>
                <p className="text-gray-700">Launched 3 mobile apps + 10 websites, led 40+ cross-functional members, 180% increase in digital engagement.</p>
              </div>

              <div>
                <h4 className="font-medium">Agoda - Senior Investment Analyst (2011-2012)</h4>
                <p className="text-gray-700">132% ROI through SEM campaigns, 20% conversion improvement, $10M+ monthly budget across 15 APAC markets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-light mb-8">Technical Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-medium mb-2">Frontend</h3>
              <p className="text-gray-700">Next.js 15, React 18+, TypeScript, Tailwind CSS v4, Framer Motion</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Backend & Infrastructure</h3>
              <p className="text-gray-700">Node.js/TypeScript, Supabase, PostgreSQL, AWS, Docker & Kubernetes</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">AI/ML & Data</h3>
              <p className="text-gray-700">Modern LLMs, LangChain, Python, PostHog, Data pipeline architecture</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Security & DevOps</h3>
              <p className="text-gray-700">Penetration testing, Ethical hacking, CI/CD pipelines, Security auditing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Break 3 - YouTube Content Creation */}
      <ProminentPhoto 
        src="/images/photos/henry_making_youtube.jpg"
        alt="Henry creating YouTube content for his 15k+ subscribers"
        caption="Sharing knowledge with 15k+ subscribers and mentoring the next generation of tech professionals"
      />

      {/* About Section */}
      <section id="about" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-light mb-8">About</h2>
          
          <div className="space-y-6 text-sm">
            <div>
              <p className="text-gray-700">
                I'm Henry (Varit) Kobutra - a full-stack problem solver who's spent 15 years turning chaos into solutions across agencies, finance, SaaS, and e-commerce. Currently building the future of international employee benefits at Redii while helping businesses transform through AI and strategic innovation.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Global Perspective</h3>
              <p className="text-gray-700">
                English, German, Thai (fluent) + Japanese (conversational). Remote-first, cross-cultural leadership across North America, Europe, and Southeast Asia.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">When I'm Not Coding</h3>
              <p className="text-gray-700">
                Mentoring tech professionals, breaking (then fixing) personal lab environments, making random radio contacts as AI5OE, certifying my way through imposter syndrome, researching cybersecurity and ethical hacking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-light mb-8">Contact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-700 mb-4">henry@kobutra.com</p>
              <p className="text-gray-700 mb-4">
                <a href="https://linkedin.com/in/henrykobutra" className="hover:underline">LinkedIn</a> • 
                <a href="https://github.com/henrykobutra" className="hover:underline"> GitHub</a>
              </p>
              <p className="text-gray-700">Greater Houston, Texas • AI5OE</p>
            </div>

            <div>
              <p className="text-gray-700">
                Building at Redii. Available for strategic consulting. Always up for technical discussions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
