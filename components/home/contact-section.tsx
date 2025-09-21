/**
 * Contact section displaying contact information, social links, and current availability.
 * Includes email, LinkedIn, GitHub, location, and amateur radio call sign.
 */
export default function ContactSection() {
  return (
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
  );
}
