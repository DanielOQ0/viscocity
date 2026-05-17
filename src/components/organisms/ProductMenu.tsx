'use client'

import { useState } from 'react'
import { products, type Category } from '@/lib/data/products'
import { ProductCard } from '@/components/molecules/ProductCard'

type Filter = Category | 'all'

const filters: { id: Filter; label: string }[] = [
  { id: 'all',        label: 'Todos'       },
  { id: 'granizados', label: 'Granizados'  },
  { id: 'sodas',      label: 'Sodas'       },
  { id: 'smoothies',  label: 'Smoothies'   },
]

export function ProductMenu() {
  const [active, setActive] = useState<Filter>('all')

  const visible =
    active === 'all' ? products : products.filter((p) => p.category === active)

  return (
    <section id="menu" className="py-24 bg-brand-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-3">
            Lo que servimos
          </p>
          <h2 className="font-milker text-4xl lg:text-5xl text-white mb-4">
            El <span className="text-gradient">Menú</span> del Parche
          </h2>
          <p className="text-white/55 max-w-xl mx-auto">
            Cada bebida tiene su propio personaje, su propia actitud. ¿Cuál es la tuya?
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                active === f.id
                  ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-purple shadow-lg shadow-brand-orange/30'
                  : 'bg-white/10 text-white/65 hover:bg-white/20 hover:text-white border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
