import Image from 'next/image';

interface CertificationBadge {
  name: string;
  image: string;
  alt: string;
}

const certifications: CertificationBadge[] = [
  {
    name: 'AWS Cloud Practitioner',
    image: '/images/certifications/aws-cloud-practitioner.png',
    alt: 'AWS Cloud Practitioner Certification'
  },
  {
    name: 'Hack The Box CPTS',
    image: '/images/certifications/cpts-badge.png',
    alt: 'Hack The Box Certified Penetration Testing Specialist'
  },
  {
    name: 'EC-Council CEH',
    image: '/images/certifications/ceh-badge.jpeg',
    alt: 'EC-Council Certified Ethical Hacker'
  },
  {
    name: 'TCM Security PNPT',
    image: '/images/certifications/pnpt-badge.png',
    alt: 'TCM Security Practical Network Penetration Tester'
  },
  {
    name: 'ISC² CC',
    image: '/images/certifications/isc2-cc-badge.png',
    alt: 'ISC² Certified in Cybersecurity'
  },
  {
    name: 'Forrester CX Pro',
    image: '/images/certifications/forrester-cx-badge.png',
    alt: 'Forrester Customer Experience Professional'
  },
  {
    name: 'Scrum.org PSM',
    image: '/images/certifications/psm-badge.png',
    alt: 'Scrum.org Professional Scrum Master'
  },
  {
    name: 'FCC Extra Class (AI5OE)',
    image: '/images/certifications/fcc-extra-badge.png', // Note: This image doesn't exist yet
    alt: 'FCC Amateur Radio Extra Class License'
  }
];

export default function CertificationBadges() {
  return (
    <div>
      <h3 className="text-lg font-light mb-4">Some Certifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Badge Image Container */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center">
              {cert.name !== 'FCC Extra Class (AI5OE)' ? (
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                // Fallback for FCC badge (text-based until image is available)
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  FCC
                </div>
              )}
            </div>
            
            {/* Badge Name */}
            <div className="text-xs text-center text-gray-700 leading-tight">
              {cert.name}
            </div>
            
            {/* Hover tooltip */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {cert.alt}
            </div>
          </div>
        ))}
      </div>

      {/* Subtle snarky text */}
      <p className="text-xs text-gray-500 mt-4 italic">
        I also have other certs like CompTIA A+, Network+, Linux Essentials... but who's counting?
      </p>
    </div>
  );
}
