import Image from 'next/image'

const characters = [
  { src: '/images/characters/character-mojito-removebg.png',       alt: 'Mojito Blast — Granizado de menta',     bg: '#163a16' },
  { src: '/images/characters/character-apple-removebg.png',         alt: 'Apple Core — Granizado de manzana',     bg: '#1e4a1e' },
  { src: '/images/characters/character-candy-removebg.png',         alt: 'Candy Cherry — Granizado de cerezas',   bg: '#3d1040' },
  { src: '/images/characters/character-golden-removebg.png',        alt: 'Golden Mango — Granizado de mango',     bg: '#3a2800' },
  { src: '/images/characters/character-mora-removebg-preview.png',  alt: 'Mora Power — Granizado de frambuesas',  bg: '#42102e' },
  { src: '/images/characters/character-purple-removebg.png',        alt: 'Purple Haze — Granizado de mora azul',  bg: '#0f2a38' },
]

export function CharacterGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {characters.map((char) => (
        <div
          key={char.src}
          className="group rounded-2xl overflow-hidden aspect-square relative hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-brand-orange/40"
          style={{ backgroundColor: char.bg }}
        >
          <Image
            src={char.src}
            alt={char.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  )
}
