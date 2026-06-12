"use client"

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageData } from '@/lib/directus/context'
import { getAssetUrl } from '@/lib/directus/client'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Gallery() {
  const { characters } = usePageData()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || characters.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-gallery-head] > *', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
      gsap.from('[data-gallery-card]', {
        y: 32,
        opacity: 0,
        scale: 0.88,
        duration: 0.7,
        ease: 'back.out(1.4)',
        stagger: 0.07,
        scrollTrigger: { trigger: '[data-gallery-grid]', start: 'top 85%' },
      })
    }, el)

    return () => ctx.revert()
  }, [characters.length])

  return (
    <section ref={root} id="galeria" className="py-24" style={{ backgroundColor: '#3a2356' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-gallery-head className="text-center mb-14">
          <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-3">
            La crew
          </p>
          <h2 className="font-milker text-4xl lg:text-5xl leading-tight">
            <span className="text-white">Conoce los </span>
            <span className="text-gradient">Personajes</span>
          </h2>
        </div>

        <div data-gallery-grid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {characters.map((char) => {
            const imgUrl = getAssetUrl(char.image as string)

            return (
              <div
                key={char.id as string}
                data-gallery-card
                className="group rounded-2xl overflow-hidden aspect-square relative hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-brand-orange/40"
                style={{ backgroundColor: (char.bg_color as string) || '#163a16' }}
              >
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={char.name as string}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-sm p-3 text-center">
                    {char.name as string}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
