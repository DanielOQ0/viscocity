'use client'

import type { ProductSize } from '@/lib/directus/types'

export type SizeChipsTone = 'brand' | 'ja'

const tones: Record<SizeChipsTone, { chip: string; tooltip: string; arrow: string }> = {
  brand: {
    chip: 'hover:border-brand-yellow/60 focus-visible:border-brand-yellow/60',
    tooltip: 'bg-brand-yellow text-brand-purple',
    arrow: 'border-t-brand-yellow',
  },
  ja: {
    chip: 'hover:border-emerald-400/60 focus-visible:border-emerald-400/60',
    tooltip: 'bg-emerald-500 text-white',
    arrow: 'border-t-emerald-500',
  },
}

interface SizeChipsProps {
  sizes: ProductSize[]
  tone?: SizeChipsTone
  className?: string
}

/**
 * Chips con los tamaños de un producto (solo la medida, p. ej. "10 oz").
 * El precio de cada tamaño se revela en un tooltip al pasar el cursor
 * o al enfocar/tocar el chip.
 */
export function SizeChips({ sizes, tone = 'brand', className = '' }: SizeChipsProps) {
  const t = tones[tone]
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {sizes.map((size, i) => {
        const label = [size.value, size.unit].filter(Boolean).join(' ') || 'Único'
        return (
          <button
            key={`${label}-${i}`}
            type="button"
            aria-label={size.price ? `${label}: ${size.price}` : label}
            className={`group/size relative rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none ${t.chip}`}
          >
            {label}
            {size.price && (
              <span
                role="tooltip"
                className={`pointer-events-none absolute -top-9 left-1/2 z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg px-2.5 py-1 font-milker text-sm opacity-0 shadow-lg transition-all duration-200 group-hover/size:translate-y-0 group-hover/size:opacity-100 group-focus-visible/size:translate-y-0 group-focus-visible/size:opacity-100 ${t.tooltip}`}
              >
                {size.price}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent ${t.arrow}`}
                />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
