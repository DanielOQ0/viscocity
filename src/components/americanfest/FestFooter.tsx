import Link from 'next/link'
import { Reveal } from '@/components/shared/animated'
import { CalendarIcon, MapPinIcon, InstagramIcon } from './icons'

interface FestFooterProps {
  settings: Record<string, unknown> | null
}

export function FestFooter({ settings }: FestFooterProps) {
  const eventName = (settings?.event_name as string) || 'American Fest'
  const eventDate = (settings?.event_date as string) || '25 al 29 de Junio'
  const eventLocation = (settings?.event_location as string) || 'Cúcuta, Norte de Santander'
  const instagramUrl = settings?.instagram_url as string | undefined
  const ctaText = (settings?.cta_text as string) || 'Quiero ir'

  return (
    <footer className="border-t border-white/10 bg-af-card/40 py-20">
      <Reveal className="mx-auto max-w-5xl px-5 text-center">
        <h2 className="font-milker leading-none">
          <span className="af-text-fire block text-6xl md:text-[8rem]">AMERICAN</span>
          <span className="af-text-outline block text-6xl md:text-[8rem]">FEST</span>
        </h2>
        <p className="mt-6 text-white/60">
          Nos vemos del {eventDate.toLowerCase()} en {eventLocation}.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-af-dark/60 px-4 py-2 text-sm text-white/80">
            <CalendarIcon className="h-4 w-4 text-af-fire" />
            {eventDate}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-af-dark/60 px-4 py-2 text-sm text-white/80">
            <MapPinIcon className="h-4 w-4 text-af-fire" />
            {eventLocation}
          </span>
        </div>

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-af-fire to-brand-orange px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <InstagramIcon className="h-5 w-5" />
            {ctaText}
          </a>
        )}
      </Reveal>

      <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 px-5 pt-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-6">
          <a href="#coc" className="font-milker text-lg text-brand-yellow transition-opacity hover:opacity-80">
            Viscocity
          </a>
          <span className="text-white/30">&#9733;</span>
          <a href="#ja" className="font-milker text-lg text-emerald-400 transition-opacity hover:opacity-80">
            JA Social Club
          </a>
        </div>
        <p className="text-xs text-white/40">
          {eventName} &mdash; {eventDate}
        </p>
        <Link
          href="/"
          className="mt-3 inline-block text-sm text-brand-yellow transition-colors hover:text-brand-orange"
        >
          &larr; Volver a Viscocity
        </Link>
      </div>
    </footer>
  )
}
