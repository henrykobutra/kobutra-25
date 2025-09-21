export default function NotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Notes</h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <p className="text-white/80 text-lg mb-4">
              This is a placeholder for the notes section.
            </p>
            <p className="text-white/60">
              Here you can add your thoughts, ideas, and reflections.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}