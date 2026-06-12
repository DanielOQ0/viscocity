'use client'

import { useEffect, useState } from 'react'
import {
  getAmericanFestSettings,
  getAmericanFestViscocityProducts,
  getAmericanFestJAProducts,
  getAssetUrl,
} from '@/lib/directus/client'
import { FestHeader } from '@/components/americanfest/FestHeader'
import { FestHero } from '@/components/americanfest/FestHero'
import { MarqueeStrip } from '@/components/americanfest/MarqueeStrip'
import { FestivalInfo } from '@/components/americanfest/FestivalInfo'
import { BrandSection } from '@/components/americanfest/BrandSection'
import { FestFooter } from '@/components/americanfest/FestFooter'
import type { CarouselProduct } from '@/components/americanfest/ProductCarousel'
import type { ProductSize } from '@/lib/directus/types'

interface FestData {
  settings: Record<string, unknown> | null
  viscocityProducts: Array<Record<string, unknown>>
  jaProducts: Array<Record<string, unknown>>
  loading: boolean
}

function toCarouselProducts(
  items: Array<Record<string, unknown>>,
  imageField: 'character_image' | 'image',
): CarouselProduct[] {
  return items.map((item) => ({
    id: item.id as string,
    name: item.name as string,
    category: item.category as string | undefined,
    description: item.description as string | undefined,
    price: item.price as string | undefined,
    sizes: (item.sizes as ProductSize[] | null) ?? undefined,
    image: getAssetUrl(item[imageField] as string | null),
    bgColor: item.bg_color as string | undefined,
  }))
}

export default function AmericanFestPage() {
  const [data, setData] = useState<FestData>({
    settings: null,
    viscocityProducts: [],
    jaProducts: [],
    loading: true,
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [settings, viscocityProducts, jaProducts] = await Promise.all([
          getAmericanFestSettings(),
          getAmericanFestViscocityProducts(),
          getAmericanFestJAProducts(),
        ])
        if (!cancelled) {
          setData({
            settings,
            viscocityProducts: viscocityProducts as Array<Record<string, unknown>>,
            jaProducts: jaProducts as Array<Record<string, unknown>>,
            loading: false,
          })
        }
      } catch {
        if (!cancelled) setData((prev) => ({ ...prev, loading: false }))
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const { settings, viscocityProducts, jaProducts, loading } = data

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-af-dark">
        <h1 className="animate-pulse font-milker text-3xl text-white/60">
          AMERICAN<span className="af-text-fire">FEST</span>
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-af-dark font-montserrat text-white">
      <FestHeader eventDate={settings?.event_date as string | undefined} />

      <FestHero settings={settings} />

      <MarqueeStrip
        eventName={settings?.event_name as string | undefined}
        eventDate={settings?.event_date as string | undefined}
        eventLocation={settings?.event_location as string | undefined}
      />

      <FestivalInfo settings={settings} />

      <BrandSection
        id="coc"
        eyebrow="Bebidas"
        name="VISCOCITY"
        tagline="Servimos flow en vaso"
        description="Los granizados, sodas y smoothies oficiales del American Fest. Sabor audaz, frescura real y la chispa que mantiene el festival en movimiento de principio a fin."
        products={toCarouselProducts(viscocityProducts, 'character_image')}
        theme="viscocity"
      />

      <div className="mx-auto h-px max-w-7xl bg-white/10" />

      <BrandSection
        id="ja"
        eyebrow="Comida"
        name="JA SOCIAL CLUB"
        tagline="Sabor que reúne"
        description="La experiencia gastronómica premium del festival. Comidas y bebidas preparadas con los mejores ingredientes para acompañar cada momento del American Fest."
        products={toCarouselProducts(jaProducts, 'image')}
        theme="ja"
        align="right"
      >
      </BrandSection>

      <FestFooter settings={settings} />
    </main>
  )
}
