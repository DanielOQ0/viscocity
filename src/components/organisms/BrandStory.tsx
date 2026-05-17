const stats = [
  { number: '6+',   label: 'Sabores únicos',      gradient: 'from-brand-yellow to-brand-orange' },
  { number: '3',    label: 'Líneas de bebidas',    gradient: 'from-brand-orange to-red-500' },
  { number: '100%', label: 'Identidad urbana',     gradient: 'from-purple-600 to-brand-purple' },
  { number: '∞',    label: 'Flow garantizado',     gradient: 'from-teal-500 to-green-600' },
]

export function BrandStory() {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-7 text-white`}
              >
                <div className="font-milker text-5xl mb-2 leading-none">{s.number}</div>
                <div className="text-sm font-montserrat font-medium opacity-90">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div>
            <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-3">
              Nuestra historia
            </p>
            <h2 className="font-milker text-4xl lg:text-5xl text-brand-purple leading-tight mb-6">
              No vendemos solo granizados…{' '}
              <span className="text-gradient">servimos flow en vaso.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Somos la ciudad donde el sabor se vive en cada esquina y el parche nunca se
              enfría. Entre grafitis, edificios con historia y calles llenas de vibra, nace
              una experiencia que mezcla lo urbano con lo elegante.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nuestros granizados tienen tanta personalidad como la city misma: colores que
              gritan estilo, sabores que explotan frescura, y personajes sacados directo de
              los muros, con actitud callejera y corazón de parche.
            </p>
            <blockquote className="border-l-4 border-brand-orange pl-6 py-1">
              <p className="font-milker text-xl text-brand-purple">
                &ldquo;Bebe, ríe y repite con Viscocity. Únete al parche.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
