import { Marquee } from '@/components/shared/animated'

interface MarqueeStripProps {
  eventName?: string
  eventDate?: string
  eventLocation?: string
}

export function MarqueeStrip({ eventName, eventDate, eventLocation }: MarqueeStripProps) {
  const items = [
    (eventName || 'American Fest').toUpperCase(),
    (eventDate || '25 al 29 de Junio').toUpperCase(),
    (eventLocation || 'Cúcuta').toUpperCase(),
    'VISCOCITY',
    'JA SOCIAL CLUB',
  ]

  return (
    <div className="border-y border-white/10 bg-gradient-to-r from-af-fire via-brand-orange to-af-fire py-4 text-white">
      <Marquee speed={28}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-6 font-milker text-2xl uppercase tracking-wide md:text-3xl">{item}</span>
            <span className="text-2xl md:text-3xl">&#9733;</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
