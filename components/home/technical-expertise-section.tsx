/**
 * Technical expertise section displaying categorized technical skills and technologies.
 * Organized into Frontend, Backend & Infrastructure, AI/ML & Data, and Security & DevOps categories.
 */
export default function TechnicalExpertiseSection() {
  return (
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
  );
}
