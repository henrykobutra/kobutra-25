/**
 * About section providing personal background, global perspective, and interests.
 * Highlights Henry's multilingual capabilities and diverse professional activities.
 */
export default function AboutSection() {
  return (
    <section id="about" className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-light mb-8">About</h2>
        
        <div className="space-y-6 text-sm">
          <div>
            <p className="text-muted-foreground">
              I&apos;m Henry (Varit) Kobutra - a full-stack problem solver who&apos;s spent 15 years turning chaos into solutions across agencies, finance, SaaS, and e-commerce. Currently building the future of international employee benefits at Redii while helping businesses transform through AI and strategic innovation.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Global Perspective</h3>
            <p className="text-muted-foreground">
              English, German, Thai (fluent) + Japanese (conversational). Remote-first, cross-cultural leadership across North America, Europe, and Southeast Asia.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">When I&apos;m Not Coding</h3>
            <p className="text-muted-foreground">
              Mentoring tech professionals, breaking (then fixing) personal lab environments, making random radio contacts as AI5OE, certifying my way through imposter syndrome, researching cybersecurity and ethical hacking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
