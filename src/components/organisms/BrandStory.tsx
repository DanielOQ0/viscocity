"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageData } from '@/lib/directus/context'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function BrandStory() {
  const { about } = usePageData()
  const root = useRef<HTMLElement>(null)

  const stats = (about?.stats as Array<{ number: string; label: string; gradient: string }>) || []

  useLayoutEffect(() => {
    const el = root.current
    if (!el || !about) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-stat]', {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })
      gsap.from('[data-story] > *', {
        x: 48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })
    }, el)

    return () => ctx.revert()
  }, [about])

  return (
    <section ref={root} id="nosotros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {about ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  data-stat
                  className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-7 text-white`}
                >
                  <div className="font-milker text-5xl mb-2 leading-none">{s.number}</div>
                  <div className="text-sm font-montserrat font-medium opacity-90">{s.label}</div>
                </div>
              ))}
            </div>
            <div data-story>
              <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-3">
                {about.title as string}
              </p>
              <h2 className="font-milker text-4xl lg:text-5xl text-brand-purple leading-tight mb-6">
                No vendemos solo granizados…{' '}
                <span className="text-gradient">servimos flow en vaso.</span>
              </h2>
              <div
                className="text-gray-600 text-lg leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: about.body as string }}
              />
              {(about.quote_text as string) && (
                <blockquote className="border-l-4 border-brand-orange pl-6 py-1">
                  <p className="font-milker text-xl text-brand-purple">
                    &ldquo;{((about.quote_text as string) || '').replace(/"/g, '')}&rdquo;
                  </p>
                </blockquote>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-20 w-full bg-gray-200 rounded-lg" />
              <div className="h-20 w-full bg-gray-200 rounded-lg" />
              <div className="h-12 w-1/2 bg-gray-200 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
