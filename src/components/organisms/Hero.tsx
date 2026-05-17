"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/atoms/Button'

export function Hero() {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY <= 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-brand-purple"
    >
      {/* Background pattern with low opacity */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/pattern-bg.jpeg"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-purple/95 to-brand-purple/70" />
      </div>

      {/* Ambient glow blobs */}
      <div aria-hidden="true" className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Text content ──────────────────────────────── */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-brand-yellow/30 rounded-full px-4 py-2 text-brand-yellow text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse-slow" />
              La ciudad donde el sabor se vive
            </div>

            {/* Brand name */}
            <h1 className="font-milker text-6xl sm:text-7xl lg:text-8xl text-gradient leading-none mb-4 tracking-tight pb-1">
              VISCOCITY
            </h1>

            <p className="text-2xl sm:text-3xl text-white font-semibold mb-3 leading-snug">
              Servimos <span className="text-gradient">flow</span> en vaso.
            </p>

            <p className="text-white/50 text-lg mb-8 font-light tracking-widest uppercase text-sm">
              Granizados · Sodas · Smoothies
            </p>

            <p className="text-white/65 text-base mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Entre grafitis, edificios con historia y calles llenas de vibra, nace
              una experiencia que mezcla lo urbano con lo elegante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button href="#menu" size="lg">
                Ver el Menú
              </Button>
              <Button href="https://wa.me/573180165736" external variant="outline" size="lg">
                Únete al Parche →
              </Button>
            </div>
          </div>

          {/* ── Character showcase ────────────────────────── */}
          <div className="hidden lg:flex items-center justify-center relative" aria-hidden="true">
            <div className="relative w-72 h-80">
              {/* Main character */}
              <Image
                src="/images/characters/character-golden-removebg.png"
                alt="Personaje Golden Mango"
                width={260}
                height={300}
                className="object-contain drop-shadow-[0_20px_60px_rgba(231,151,28,0.4)] animate-float"
                priority
              />
              {/* Left floating character */}
              <Image
                src="/images/characters/character-mojito-removebg.png"
                alt=""
                width={130}
                height={150}
                className="absolute -left-20 top-12 object-contain opacity-70 rotate-[-12deg] animate-float-delayed"
              />
              {/* Right floating character */}
              <Image
                src="/images/characters/character-candy-removebg.png"
                alt=""
                width={130}
                height={150}
                className="absolute -right-20 top-8 object-contain opacity-70 rotate-[10deg] animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
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
