"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/atoms/Button'
import { usePageData } from '@/lib/directus/context'
import { getAssetUrl } from '@/lib/directus/client'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Hero() {
  const [isAtTop, setIsAtTop] = useState(true)
  const { hero } = usePageData()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY <= 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    if (!el || !hero) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-item]', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
      })
        // los personajes solo aparecen con fade: su transform lo controla
        // la animación CSS de flotado
        .from('[data-hero-char]', { opacity: 0, duration: 1.1, stagger: 0.18 }, '-=0.6')

      // deriva del fondo y desvanecido del contenido al hacer scroll
      gsap.to('[data-hero-bg]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-content]', {
        yPercent: -6,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)

    return () => ctx.revert()
  }, [hero])

  const bgUrl = hero ? getAssetUrl(hero.background_pattern as string) : null
  const charMain = hero ? getAssetUrl(hero.character_main as string) : null
  const charLeft = hero ? getAssetUrl(hero.character_left as string) : null
  const charRight = hero ? getAssetUrl(hero.character_right as string) : null

  return (
    <section
      ref={root}
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-brand-purple"
    >
      <div data-hero-bg className="absolute inset-0 z-0 scale-105" aria-hidden="true">
        {bgUrl ? (
          <Image
            src={bgUrl}
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            priority
          />
        ) : (
          <Image
            src="/images/pattern-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-purple/95 to-brand-purple/70" />
      </div>

      <div aria-hidden="true" className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      {hero ? (
        <div data-hero-content className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div data-hero-item className="inline-flex items-center gap-2 bg-white/10 border border-brand-yellow/30 rounded-full px-4 py-2 text-brand-yellow text-sm font-semibold mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse-slow" />
                {hero.pill_text as string}
              </div>

              <h1 data-hero-item className="font-milker text-6xl sm:text-7xl lg:text-8xl text-gradient leading-none mb-4 tracking-tight pb-1">
                {hero.headline as string}
              </h1>

              <p data-hero-item className="text-2xl sm:text-3xl text-white font-semibold mb-3 leading-snug">
                {hero.subheadline as string}
              </p>

              <p data-hero-item className="text-white/50 text-lg mb-8 font-light tracking-widest uppercase text-sm">
                {hero.tagline as string}
              </p>

              <div
                data-hero-item
                className="text-white/65 text-base mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: hero.body as string }}
              />

              <div data-hero-item className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href={hero.cta_primary_target as string} size="lg">
                  {hero.cta_primary_text as string}
                </Button>
                <Button href={hero.cta_secondary_target as string} external variant="outline" size="lg">
                  {hero.cta_secondary_text as string}
                </Button>
              </div>
            </div>

            <div className="relative h-[500px] hidden lg:block">
              {charMain && (
                <div data-hero-char className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float z-10">
                  <Image
                    src={charMain}
                    alt=""
                    width={320}
                    height={480}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              )}
              {charLeft && (
                <div data-hero-char className="absolute top-1/4 left-0 animate-float-delayed z-20">
                  <Image
                    src={charLeft}
                    alt=""
                    width={160}
                    height={240}
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              )}
              {charRight && (
                <div data-hero-char className="absolute bottom-1/4 right-0 animate-float-slow z-20">
                  <Image
                    src={charRight}
                    alt=""
                    width={180}
                    height={270}
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="animate-pulse space-y-6 max-w-xl">
            <div className="h-6 w-48 bg-white/10 rounded-full" />
            <div className="h-16 w-96 bg-white/10 rounded-lg" />
            <div className="h-8 w-72 bg-white/10 rounded-lg" />
            <div className="h-4 w-56 bg-white/10 rounded-lg" />
            <div className="h-20 w-full bg-white/10 rounded-lg" />
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-white/10 rounded-full" />
              <div className="h-12 w-44 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      )}

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce transition-opacity duration-200 ${
          isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="text-xs font-montserrat tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
