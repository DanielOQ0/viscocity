'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  getSettings, getHero, getAbout, getCta, getFooter,
  getNavLinks, getProducts, getCharacters, getAnnouncement,
} from './client'

interface PageData {
  settings: Record<string, unknown> | null
  hero: Record<string, unknown> | null
  about: Record<string, unknown> | null
  cta: Record<string, unknown> | null
  footer: Record<string, unknown> | null
  announcement: Record<string, unknown> | null
  navLinks: Array<Record<string, unknown>>
  categories: Array<Record<string, unknown>>
  products: Array<Record<string, unknown>>
  characters: Array<Record<string, unknown>>
  loading: boolean
  error: string | null
}

const DataContext = createContext<PageData | null>(null)

// Las categorías se derivan de los productos (campo de texto `category`),
// manteniendo el orden de aparición según `sort`
function deriveCategories(products: Array<Record<string, unknown>>) {
  const names = Array.from(
    new Set(products.map((p) => p.category as string).filter(Boolean)),
  )
  return names.map((name) => ({ name, slug: name.toLowerCase() }))
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PageData>({
    settings: null, hero: null, about: null, cta: null, footer: null,
    announcement: null,
    navLinks: [], categories: [], products: [], characters: [],
    loading: true, error: null,
  })

  useEffect(() => {
    let cancelled = false
    async function loadAll() {
      try {
        const [settings, hero, about, cta, footer, navLinks, products, characters, announcement] =
          await Promise.all([
            getSettings(), getHero(), getAbout(), getCta(), getFooter(),
            getNavLinks(), getProducts(), getCharacters(),
            getAnnouncement().catch(() => null),
          ])
        if (!cancelled) {
          const productList = products as Array<Record<string, unknown>>
          setData({
            settings, hero, about, cta, footer, announcement,
            navLinks: navLinks as Array<Record<string, unknown>>,
            categories: deriveCategories(productList),
            products: productList,
            characters: characters as Array<Record<string, unknown>>,
            loading: false, error: null,
          })
        }
      } catch (e) {
        if (!cancelled) {
          setData(prev => ({ ...prev, loading: false, error: (e as Error).message }))
        }
      }
    }
    loadAll()
    return () => { cancelled = true }
  }, [])

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export function usePageData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('usePageData must be used within <DataProvider>')
  return ctx
}
