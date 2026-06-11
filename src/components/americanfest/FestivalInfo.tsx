import { Reveal } from './animated'
import {
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  FlameIcon,
  UtensilsIcon,
  MusicIcon,
  UsersIcon,
} from './icons'

interface FestivalInfoProps {
  settings: Record<string, unknown> | null
}

const features = [
  {
    icon: FlameIcon,
    title: 'Energía Total',
    text: 'Cinco días de adrenalina, shows y experiencias que encienden la ciudad.',
  },
  {
    icon: UtensilsIcon,
    title: 'Sabor Americano',
    text: 'Lo mejor de la gastronomía y las bebidas de Viscocity y JA Social Club.',
  },
  {
    icon: MusicIcon,
    title: 'Cultura en Vivo',
    text: 'Música, ambiente y el espíritu del festival más esperado de Cúcuta.',
  },
  {
    icon: UsersIcon,
    title: 'Para Todos',
    text: 'Un punto de encuentro para familias, amigos y amantes de la buena vibra.',
  },
]

export function FestivalInfo({ settings }: FestivalInfoProps) {
  const description = settings?.description as string | undefined
  const eventDate = (settings?.event_date as string) || '25 al 29 de Junio'
  const eventLocation = (settings?.event_location as string) || 'Cúcuta, Norte de Santander'

  const infoBoxes = [
    { icon: CalendarIcon, label: 'Fechas', value: eventDate },
    { icon: MapPinIcon, label: 'Ubicación', value: eventLocation },
    { icon: TicketIcon, label: 'Entrada', value: 'Participantes oficiales' },
  ]

  return (
    <section id="festival" className="af-noise-grid relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-af-fire">El Festival</span>
          <h2 className="mt-4 font-milker text-4xl leading-tight text-white md:text-6xl">
            Bienvenido a la experiencia <span className="af-text-fire">American Fest</span>
          </h2>
          {description ? (
            <div
              className="mt-6 space-y-4 text-base leading-relaxed text-white/60 [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="mt-6 text-base leading-relaxed text-white/60">
              Cúcuta se transforma en el escenario del festival más esperado del año, presentado junto a
              nuestras marcas <span className="font-semibold text-brand-yellow">Viscocity</span> y{' '}
              <span className="font-semibold text-emerald-400">JA Social Club</span>.
            </p>
          )}
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Datos clave del evento */}
          <Reveal stagger className="flex flex-col gap-4">
            {infoBoxes.map((box) => (
              <div
                key={box.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-af-card/60 p-5 transition-colors hover:border-af-fire/60"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-af-fire/15 text-af-fire">
                  <box.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">{box.label}</p>
                  <p className="mt-0.5 text-lg font-semibold text-white">{box.value}</p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Lo que vive el festival */}
          <Reveal stagger className="grid content-start gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-af-card/60 p-6 transition-colors hover:border-af-fire/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-af-fire/15 text-af-fire">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-milker text-xl tracking-wide text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{feature.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
