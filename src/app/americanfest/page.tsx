'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAmericanFestSettings, getAmericanFestViscocityProducts, getAmericanFestJAProducts, getAssetUrl } from '@/lib/directus/client'

interface FestData {
  settings: Record<string, unknown> | null
  viscocityProducts: Array<Record<string, unknown>>
  jaProducts: Array<Record<string, unknown>>
  loading: boolean
}

export default function AmericanFestPage() {
  const [data, setData] = useState<FestData>({ settings: null, viscocityProducts: [], jaProducts: [], loading: true })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [settings, viscocityProducts, jaProducts] = await Promise.all([
          getAmericanFestSettings(),
          getAmericanFestViscocityProducts(),
          getAmericanFestJAProducts(),
        ])
        if (!cancelled) setData({ settings, viscocityProducts: viscocityProducts as Array<Record<string, unknown>>, jaProducts: jaProducts as Array<Record<string, unknown>>, loading: false })
      } catch { if (!cancelled) setData(prev => ({ ...prev, loading: false })) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const { settings, viscocityProducts, jaProducts, loading } = data

  const bgUrl = settings ? getAssetUrl(settings.hero_image as string) : null
  const logoUrl = settings ? getAssetUrl(settings.hero_logo as string) : null
  const festDesc = settings?.description as string | undefined
  const festInsta = settings?.instagram_url as string | undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-red-800">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {bgUrl ? (
            <Image src={bgUrl} alt="" fill className="object-cover opacity-20" priority />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-red-500/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-blue-900/30" />
        </div>

        {/* Stars decoration */}
        <div aria-hidden="true" className="absolute top-20 left-10 text-6xl opacity-10 text-white">&#9733;</div>
        <div aria-hidden="true" className="absolute top-40 right-20 text-4xl opacity-10 text-white rotate-12">&#9733;</div>
        <div aria-hidden="true" className="absolute bottom-32 left-1/4 text-5xl opacity-10 text-white -rotate-6">&#9733;</div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {logoUrl && (
                <div className="mb-6">
                  <Image src={logoUrl} alt="American Fest" width={200} height={80} className="object-contain" priority />
                </div>
              )}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-semibold mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                {settings?.event_date as string || '25 al 29 de Junio, 2026'}
              </div>
              <h1 className="font-milker text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-4">
                {settings?.event_name as string || 'American Fest'}
              </h1>
              <p className="text-2xl sm:text-3xl text-blue-200 font-semibold mb-3">
                {settings?.tagline as string || 'La experiencia americana más vibrante'}
              </p>
              <p className="text-blue-300/80 mb-3 font-light tracking-wider flex items-center justify-center lg:justify-start gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {settings?.event_location as string || 'Cúcuta, Norte de Santander'}
              </p>
              {festDesc && (
                <div className="text-blue-100/70 text-base mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: festDesc }} />
              )}
              {festInsta && (
                <a
                  href={festInsta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  {settings?.cta_text as string || 'Seguir en Instagram'}
                </a>
              )}
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute inset-4 border-2 border-white/10 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl font-milker text-white/90 leading-none">AF</div>
                    <div className="text-white/40 text-sm tracking-[0.3em] uppercase mt-2">2026</div>
                  </div>
                </div>
                {/* Floating stars */}
                <div className="absolute -top-4 -right-4 text-3xl text-yellow-300/60 animate-float">&#9733;</div>
                <div className="absolute -bottom-2 -left-2 text-2xl text-yellow-300/40 animate-float-delayed">&#9733;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-milker text-gray-900 mb-4">Nuestros Participantes</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Dos marcas, una experiencia inolvidable. Conoce lo que tenemos preparado para ti.</p>
          </div>

          {/* Viscocity Section */}
          <div className="mb-24 last:mb-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-brand-purple to-brand-orange rounded-full" />
              <div>
                <h3 className="text-2xl font-milker text-brand-purple">Viscocity</h3>
                <p className="text-gray-400 text-sm">Servimos flow en vaso</p>
              </div>
            </div>
            {viscocityProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {viscocityProducts.map((product) => {
                  const imgUrl = getAssetUrl(product.character_image as string)
                  return (
                    <div key={product.id as string} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                      {imgUrl && (
                        <div className="relative h-48 bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 flex items-center justify-center p-6">
                          <Image src={imgUrl} alt={product.name as string} width={160} height={200} className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="inline-block px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-semibold rounded-full mb-2">
                          {product.category as string}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{product.name as string}</h4>
                        {(product.description as string) && <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description as string}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-400 italic">Próximamente...</p>
            )}
          </div>

          {/* JA Social Club Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
              <div>
                <h3 className="text-2xl font-milker text-emerald-600">JA Social Club</h3>
                <p className="text-gray-400 text-sm">Sabor y actitud</p>
              </div>
            </div>
            {jaProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jaProducts.map((product) => {
                  const imgUrl = getAssetUrl(product.image as string)
                  return (
                    <div key={product.id as string} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                      {imgUrl && (
                        <div className="relative h-48 bg-gradient-to-br from-emerald-500/10 to-green-600/10 flex items-center justify-center p-6">
                          <Image src={imgUrl} alt={product.name as string} width={160} height={200} className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-semibold rounded-full">
                            {product.category as string}
                          </span>
                          {(product.price as string) && (
                            <span className="text-lg font-bold text-emerald-600">${product.price as string}</span>
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{product.name as string}</h4>
                        {(product.description as string) && <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description as string}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-400 italic">Próximamente...</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-red-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-milker mb-4">No te lo pierdas</h2>
          <p className="text-blue-200 mb-8">Sigue todas las novedades del American Fest Cúcuta 2026 en Instagram y entérate de todo.</p>
              {festInsta && (
                <a
                  href={festInsta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  {settings?.cta_text as string || 'Seguir en Instagram'}
                </a>
              )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 mb-4">
            <span className="font-milker text-brand-yellow text-lg">Viscocity</span>
            <span className="text-white/30">+</span>
            <span className="font-milker text-emerald-400 text-lg">JA Social Club</span>
          </div>
          <p className="text-gray-500 text-sm">{settings?.event_name as string || 'American Fest'} &mdash; {settings?.event_date as string || '2026'}</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block transition-colors">&larr; Volver a Viscocity</Link>
        </div>
      </footer>
    </main>
  )
}
