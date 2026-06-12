"use client"

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageData } from '@/lib/directus/context'
import { getAssetUrl } from '@/lib/directus/client'
import { Badge } from '@/components/atoms/Badge'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Filter = 'all' | string

export function ProductMenu() {
  const { products, categories } = usePageData()
  const [active, setActive] = useState<Filter>('all')
  const root = useRef<HTMLElement>(null)

  const filtered = active === 'all'
    ? products
    : products.filter((p) => ((p.category as string) || '').toLowerCase() === active)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || products.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-menu-head] > *', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
    }, el)

    return () => ctx.revert()
  }, [products.length])

  // las tarjetas se re-animan en cascada cada vez que cambia el filtro
  useLayoutEffect(() => {
    const el = root.current
    if (!el || filtered.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-menu-card]', {
        y: 32,
        opacity: 0,
        scale: 0.96,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-menu-grid]', start: 'top 88%' },
      })
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, filtered.length])

  return (
    <section ref={root} id="menu" className="py-24 bg-brand-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-menu-head className="text-center mb-14">
          <p className="text-brand-yellow font-bold text-xs uppercase tracking-[0.2em] mb-3">
            Nuestro Menú
          </p>
          <h2 className="font-milker text-4xl lg:text-5xl text-white leading-tight mb-8">
            Bebidas con <span className="text-gradient">Flow</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActive('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                active === 'all'
                  ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-purple'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug as string}
                onClick={() => setActive(cat.slug as string)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  active === cat.slug
                    ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-purple'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat.name as string}
              </button>
            ))}
          </div>
        </div>

        <div data-menu-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const bgColor = (product.bg_color as string) || ''
            const isGradient = bgColor.includes('from-')
            const imgUrl = getAssetUrl(product.character_image as string)

            return (
              <div
                key={product.id as string}
                data-menu-card
                className={`group rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/40 hover:shadow-2xl transition-all duration-300 ${
                  isGradient ? `bg-gradient-to-br ${bgColor}` : ''
                }`}
                style={!isGradient ? { backgroundColor: bgColor || '#1e1e2e' } : undefined}
              >
                <div className="relative aspect-square">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={product.name as string}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-milker text-8xl text-white/20">
                        {((product.name as string) || '?').charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 bg-black/30">
                  <div className="flex items-center justify-between gap-2">
                    <Badge category={((product.category as string) || '').toLowerCase()} />
                    {(product.price as string) && (
                      <span className="font-milker text-lg text-brand-yellow">
                        {product.price as string}
                      </span>
                    )}
                  </div>
                  <h3 className="font-milker text-xl text-white mt-2">{product.name as string}</h3>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">
                    {product.description as string}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
