"use client"

import { useState } from 'react'
import Image from 'next/image'
import { usePageData } from '@/lib/directus/context'
import { getAssetUrl } from '@/lib/directus/client'
import { Badge } from '@/components/atoms/Badge'

type Filter = 'all' | string

export function ProductMenu() {
  const { products, categories } = usePageData()
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all'
    ? products
    : products.filter((p) => (p.category as Record<string, unknown>)?.slug === active)

  return (
    <section id="menu" className="py-24 bg-brand-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.slug as string}
              className="group rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/40 hover:shadow-2xl transition-all duration-300"
              style={{ backgroundColor: (product.bg_color as string) || '#1e1e2e' }}
            >
              <div className="relative aspect-square">
                <Image
                  src={getAssetUrl(product.character_image as string) || `/images/characters/character-${(product.slug as string).replace(/^(granizado|soda|smoothie)-/, '')}.png`}
                  alt={product.name as string}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <Badge category={(product.category as Record<string, unknown>)?.slug as string} />
                <h3 className="font-milker text-xl text-white mt-2">{product.name as string}</h3>
                <p className="text-white/60 text-sm mt-1 leading-relaxed">
                  {product.description as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
