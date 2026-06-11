'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAssetUrl } from '@/lib/directus/client'
import { CalendarIcon, MapPinIcon, InstagramIcon } from './icons'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FestHeroProps {
  settings: Record<string, unknown> | null
}

export function FestHero({ settings }: FestHeroProps) {
  const root = useRef<HTMLElement>(null)

  const bgUrl = settings ? getAssetUrl(settings.hero_image as string) : null
  const logoUrl = settings ? getAssetUrl(settings.hero_logo as string) : null
  const eventDate = (settings?.event_date as string) || '25 al 29 de Junio'
  const eventLocation = (settings?.event_location as string) || 'Cúcuta, Norte de Santander'
  const tagline = (settings?.tagline as string) || 'La experiencia americana más vibrante'

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-line]', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      })
        .from('[data-hero-meta]', { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
        .from('[data-hero-badge]', { scale: 0.85, opacity: 0, rotate: -6, duration: 0.9 }, '-=0.7')

      // deriva del fondo y desvanecido del contenido al hacer scroll
      gsap.to('[data-hero-bg]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-content]', {
        yPercent: -8,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div data-hero-bg className="absolute inset-0 -z-10 scale-110">
        {bgUrl ? (
          <Image src={bgUrl} alt="" fill priority className="object-cover opacity-25" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-af-blue/30 via-transparent to-af-fire/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-af-dark/70 via-af-dark/40 to-af-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-af-dark/80 to-transparent" />
      </div>

      {/* Estrellas decorativas */}
      <div aria-hidden="true" className="absolute left-10 top-24 text-6xl text-white/10">&#9733;</div>
      <div aria-hidden="true" className="absolute right-16 top-40 rotate-12 text-4xl text-white/10">&#9733;</div>
      <div aria-hidden="true" className="absolute bottom-32 left-1/4 -rotate-6 text-5xl text-white/10">&#9733;</div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.4fr_1fr]">
        <div data-hero-content>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-af-fire" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-af-fire">
              {eventLocation}
            </span>
          </div>

          <h1 className="font-milker text-[14.5vw] leading-[0.85] tracking-tight md:text-[9.5vw] lg:text-[8.5rem]">
            <span data-hero-line className="block overflow-hidden">
              <span className="af-text-fire block">AMERICAN</span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="af-text-outline block">FEST</span>
            </span>
          </h1>

          <p data-hero-meta className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            {tagline}. El evento que reúne a <span className="font-semibold text-brand-yellow">Viscocity</span> y{' '}
            <span className="font-semibold text-emerald-400">JA Social Club</span> en un solo lugar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div data-hero-meta className="flex items-center gap-2 rounded-full border border-white/15 bg-af-card/60 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <CalendarIcon className="h-4 w-4 text-af-fire" />
              {eventDate}
            </div>
            <div data-hero-meta className="flex items-center gap-2 rounded-full border border-white/15 bg-af-card/60 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <MapPinIcon className="h-4 w-4 text-af-fire" />
              {eventLocation}
            </div>
          </div>
        </div>

        <div data-hero-badge className="mx-auto hidden w-full max-w-xs md:block md:max-w-sm">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="American Fest"
              width={700}
              height={700}
              priority
              className="h-auto w-full drop-shadow-[0_20px_60px_rgba(255,77,46,0.35)] rounded-2xl"
            />
          ) : (
            <div className="relative mx-auto h-80 w-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-af-fire/30 to-af-blue/30 blur-3xl" />
              <div className="absolute inset-4 flex items-center justify-center rounded-full border-2 border-white/10">
                <div className="text-center">
                  <div className="font-milker text-8xl leading-none text-white/90">AF</div>
                  <div className="mt-2 text-sm uppercase tracking-[0.3em] text-white/40">2026</div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 animate-float text-3xl text-brand-yellow/60">&#9733;</div>
              <div className="absolute -bottom-2 -left-2 animate-float-delayed text-2xl text-brand-yellow/40">&#9733;</div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <span className="animate-bounce text-xs uppercase tracking-[0.3em] text-white/30">Scroll</span>
      </div>
    </section>
  )
}
