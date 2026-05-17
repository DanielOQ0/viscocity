import { CharacterGrid } from '@/components/molecules/CharacterGrid'

export function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-brand-purple-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-3">
            La crew
          </p>
          <h2 className="font-milker text-4xl lg:text-5xl text-white mb-4">
            Conoce los <span className="text-gradient">Personajes</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto">
            Sacados directo de los muros, con actitud callejera y corazón de parche.
          </p>
        </div>

        <CharacterGrid />
      </div>
    </section>
  )
}
