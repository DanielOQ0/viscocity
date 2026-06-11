import type { ReactNode } from 'react'
import { Reveal } from './animated'
import { ProductCarousel, type CarouselProduct, type CarouselTheme } from './ProductCarousel'

interface BrandSectionProps {
  id: string
  eyebrow: string
  name: string
  tagline: string
  description: string
  products: CarouselProduct[]
  theme: CarouselTheme
  align?: 'left' | 'right'
  children?: ReactNode
}

const themes: Record<CarouselTheme, { accent: string; gradient: string; glow: string }> = {
  viscocity: {
    accent: 'text-brand-yellow',
    gradient: 'text-gradient',
    glow: 'bg-[radial-gradient(60%_50%_at_20%_0%,rgba(231,151,28,0.18),transparent)]',
  },
  ja: {
    accent: 'text-emerald-400',
    gradient: 'af-text-gold',
    glow: 'bg-[radial-gradient(60%_50%_at_80%_0%,rgba(16,185,129,0.16),transparent)]',
  },
}

export function BrandSection({
  id,
  eyebrow,
  name,
  tagline,
  description,
  products,
  theme,
  align = 'left',
  children,
}: BrandSectionProps) {
  const t = themes[theme]

  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className={`pointer-events-none absolute inset-0 -z-10 opacity-80 ${t.glow}`} />

      <div className="mx-auto max-w-7xl px-5">
        <Reveal
          className={`flex flex-col gap-4 ${align === 'right' ? 'items-end text-right' : 'items-start'}`}
        >
          <span className={`text-xs font-bold uppercase tracking-[0.3em] ${t.accent}`}>{eyebrow}</span>
          <h2 className={`font-milker text-5xl md:text-7xl ${t.gradient}`}>{name}</h2>
          <p className="font-milker text-xl tracking-wide text-white md:text-2xl">{tagline}</p>
          <p className="max-w-xl leading-relaxed text-white/60">{description}</p>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-10 max-w-7xl px-5" start="top 90%">
        <ProductCarousel products={products} theme={theme} align={align} />
      </Reveal>

      {children}
    </section>
  )
}
