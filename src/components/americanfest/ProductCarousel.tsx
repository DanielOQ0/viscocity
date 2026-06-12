'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import type { ProductSize } from '@/lib/directus/types'
import { SizeChips, type SizeChipsTone } from '@/components/atoms/SizeChips'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin)
}

export interface CarouselProduct {
  id: string
  name: string
  category?: string
  description?: string
  /** precio único (legacy); se usa solo si `sizes` está vacío */
  price?: string
  sizes?: ProductSize[]
  image: string | null
  /** gradiente tailwind (from-… to-…) que viene de Directus */
  bgColor?: string
}

export type CarouselTheme = 'viscocity' | 'ja'

interface ProductCarouselProps {
  products: CarouselProduct[]
  theme: CarouselTheme
  align?: 'left' | 'right'
  /** segundos que tarda una vuelta completa */
  speed?: number
}

const themes: Record<
  CarouselTheme,
  { chip: string; accent: string; fallbackGradient: string; sizeTone: SizeChipsTone }
> = {
  viscocity: {
    chip: 'bg-brand-yellow text-brand-purple',
    accent: 'text-brand-yellow',
    fallbackGradient: 'from-brand-orange to-brand-purple-mid',
    sizeTone: 'brand',
  },
  ja: {
    chip: 'bg-emerald-500 text-white',
    accent: 'text-emerald-400',
    fallbackGradient: 'from-emerald-500 to-emerald-900',
    sizeTone: 'ja',
  },
}

/**
 * Carrusel infinito de productos con GSAP. El loop corre solo, se ralentiza
 * al pasar el cursor y se puede arrastrar manualmente (drag con el cursor en
 * desktop, swipe en táctil) gracias a Draggable + Inertia. El producto
 * enfocado se eleva, intensifica su glow y despliega su información.
 * Los filtros de categoría reconstruyen el loop con los productos visibles.
 */
export function ProductCarousel({ products, theme, align = 'left', speed }: ProductCarouselProps) {
  const [filter, setFilter] = useState<string>('all')
  const t = themes[theme]

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))) as string[],
    [products],
  )

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  )

  if (products.length === 0) {
    return <p className="italic text-white/40">Próximamente...</p>
  }

  return (
    <div>
      {/* filtros por categoría */}
      {categories.length > 1 && (
        <div className={`flex flex-wrap gap-3 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
          {['all', ...categories].map((cat) => {
            const active = filter === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? `${t.chip} scale-105 shadow-lg`
                    : 'border border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat}
              </button>
            )
          })}
        </div>
      )}

      {/* key reconstruye el loop al cambiar el filtro */}
      <CarouselTrack key={filter} products={visible} theme={theme} speed={speed} />
    </div>
  )
}

interface CarouselTrackProps {
  products: CarouselProduct[]
  theme: CarouselTheme
  speed?: number
}

function CarouselTrack({ products, theme, speed }: CarouselTrackProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const draggableRef = useRef<Draggable | null>(null)
  const draggingRef = useRef(false)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const t = themes[theme]

  // duplicamos las tarjetas (en número par) para que el loop del 50% sea continuo
  const copies = products.length >= 5 ? 2 : 4
  const loopItems = Array.from({ length: copies }, (_, c) =>
    products.map((p) => ({ product: p, key: `${c}-${p.id}` })),
  ).flat()

  const duration = speed ?? Math.max(18, products.length * 5)

  useLayoutEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport || products.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration,
        ease: 'none',
      })
      tweenRef.current = tween

      // proxy invisible: el arrastre se traduce en progreso del loop
      const proxy = document.createElement('div')
      let startProgress = 0
      const resume = () => {
        gsap.to(tween, { timeScale: 1, duration: 0.8, overwrite: true })
        // se limpia después de que dispare el click posterior al drag
        window.setTimeout(() => {
          draggingRef.current = false
        }, 120)
      }

      function applyDrag(this: Draggable) {
        const half = track!.scrollWidth / 2
        const progress = startProgress - this.x / half
        if (half > 0 && isFinite(progress)) {
          tween.progress(gsap.utils.wrap(0, 1, progress))
        }
      }

      draggableRef.current = Draggable.create(proxy, {
        trigger: viewport,
        type: 'x',
        inertia: true,
        allowNativeTouchScrolling: true,
        onPressInit() {
          gsap.set(proxy, { x: 0 })
          startProgress = tween.progress()
          gsap.to(tween, { timeScale: 0, duration: 0.2, overwrite: true })
        },
        onDragStart() {
          draggingRef.current = true
        },
        onDrag: applyDrag,
        onThrowUpdate: applyDrag,
        onThrowComplete: resume,
        // reanuda siempre al soltar: si hay inercia, el throw sigue marcando
        // el progreso por encima y onThrowComplete vuelve a confirmar
        onRelease: resume,
      })[0]

      // Draggable marca el viewport con touch-action "manipulation" inline
      // porque su target es el proxy sin dimensiones (lo considera
      // no-scrolleable), y eso le cede el swipe horizontal al navegador en
      // táctil: el drag nunca arranca. Restauramos "pan-y": el scroll
      // vertical de la página sigue siendo nativo y el horizontal queda
      // para el Draggable.
      viewport.style.touchAction = 'pan-y'
    }, viewport)

    return () => {
      draggableRef.current?.kill()
      draggableRef.current = null
      tweenRef.current = null
      ctx.revert()
    }
  }, [duration, products.length])

  const slowDown = () => {
    if (tweenRef.current && !draggingRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.12, duration: 0.6, overwrite: true })
    }
  }
  const speedUp = () => {
    if (tweenRef.current && !draggingRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, overwrite: true })
    }
  }

  if (products.length === 0) {
    return <p className="mt-8 italic text-white/40">No hay productos en esta categoría.</p>
  }

  return (
    <div
      ref={viewportRef}
      className="relative -mx-5 cursor-grab touch-pan-y overflow-hidden pb-32 pt-6 active:cursor-grabbing md:pb-36 md:pt-8"
      onMouseEnter={slowDown}
      onMouseLeave={() => {
        speedUp()
        setActiveKey(null)
      }}
    >
      {/* degradados laterales para fundir el loop con el fondo */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-af-dark to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-af-dark to-transparent md:w-24" />

      <div ref={trackRef} className="flex w-max transform-gpu select-none items-start will-change-transform">
        {loopItems.map(({ product, key }) => {
          const active = activeKey === key
          return (
            <article
              key={key}
              onMouseEnter={() => setActiveKey(key)}
              onMouseLeave={() => setActiveKey(null)}
              onClick={() => {
                if (!draggingRef.current) setActiveKey(active ? null : key)
              }}
              className="w-60 shrink-0 px-4 md:w-80"
            >
              <div className="relative flex flex-col items-center">
                {/* glow con el color del producto */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-8 h-44 w-44 rounded-full bg-gradient-to-br blur-3xl transition-opacity duration-500 md:h-64 md:w-64 ${
                    product.bgColor || t.fallbackGradient
                  } ${active ? 'opacity-60' : 'opacity-25'}`}
                />

                {/* producto protagonista, sin tarjeta */}
                <div
                  className={`relative h-60 w-full transition-transform duration-500 md:h-80 ${
                    active ? '-translate-y-3 scale-110' : ''
                  }`}
                >
                  {product.image ? (
                    <Image
                      src={`${product.image}?width=640&format=auto`}
                      alt={product.name}
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 320px, 240px"
                      className="pointer-events-none select-none object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.55)]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-milker text-[9rem] leading-none text-white/20">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* nombre + precio; la descripción se despliega sin mover el layout */}
                <div className="relative mt-5 w-full text-center">
                  <h4 className="font-milker text-xl leading-tight text-white">{product.name}</h4>
                  {product.sizes && product.sizes.length > 0 ? (
                    <SizeChips sizes={product.sizes} tone={t.sizeTone} className="mt-2 justify-center" />
                  ) : (
                    product.price && (
                      <span className={`mt-1 block font-milker text-lg ${t.accent}`}>{product.price}</span>
                    )
                  )}
                  <div
                    className={`absolute left-1/2 top-full z-30 w-64 -translate-x-1/2 pt-2 transition-all duration-500 ${
                      active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
                  >
                    {product.description && (
                      <p className="text-sm leading-relaxed text-white/70">{product.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
