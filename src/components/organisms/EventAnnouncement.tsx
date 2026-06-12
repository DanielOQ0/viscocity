'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePageData } from '@/lib/directus/context'

/**
 * Anuncio flotante reutilizable para eventos. Su contenido vive en la
 * colección `event_announcement` de Directus: texto, link de destino y
 * el switch `enabled` para mostrarlo u ocultarlo.
 */
export function EventAnnouncement() {
  const { announcement } = usePageData()
  const root = useRef<HTMLDivElement>(null)

  const enabled = Boolean(announcement?.enabled && announcement?.text)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || !enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from(el, {
        y: 90,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.6)',
        delay: 1.4,
      }).to(el, {
        y: -7,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, el)

    return () => ctx.revert()
  }, [enabled])

  if (!enabled) return null

  const text = announcement?.text as string
  const link = (announcement?.link as string) || '/americanfest'

  return (
    <div ref={root} className="fixed bottom-6 right-4 z-50 sm:right-6">
      <a
        href={link}
        className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-af-fire to-brand-orange py-3 pl-4 pr-5 shadow-[0_12px_40px_rgba(255,77,46,0.45)] transition-transform duration-300 hover:scale-105"
      >
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <span className="font-milker text-sm uppercase tracking-wider text-white sm:text-base">
          {text}
        </span>
        <svg
          className="h-4 w-4 flex-shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
        </svg>
      </a>
    </div>
  )
}
