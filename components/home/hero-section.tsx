import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

/**
 * Hero section component displaying Henry's introduction, profile, and main background image.
 * Features responsive layout with content on the left and decorative logo on the right.
 */
export default function HeroSection() {
  return (
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
  );
}
