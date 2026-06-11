'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  getSettings, getHero, getAbout, getCta, getFooter,
  getNavLinks, getCategories, getProducts, getCharacters,
} from './client'

interface PageData {
  settings: Record<string, unknown> | null
  hero: Record<string, unknown> | null
  about: Record<string, unknown> | null
  cta: Record<string, unknown> | null
  footer: Record<string, unknown> | null
  navLinks: Array<Record<string, unknown>>
  categories: Array<Record<string, unknown>>
  products: Array<Record<string, unknown>>
  characters: Array<Record<string, unknown>>
  loading: boolean
  error: string | null
}

const DataContext = createContext<PageData | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PageData>({
    settings: null, hero: null, about: null, cta: null, footer: null,
    navLinks: [], categories: [], products: [], characters: [],
    loading: true, error: null,
  })

  useEffect(() => {
    let cancelled = false
    async function loadAll() {
      try {
        const [settings, hero, about, cta, footer, navLinks, categories, products, characters] =
          await Promise.all([
            getSettings(), getHero(), getAbout(), getCta(), getFooter(),
            getNavLinks(), getCategories(), getProducts(), getCharacters(),
          ])
        if (!cancelled) {
          setData({
            settings, hero, about, cta, footer,
            navLinks: navLinks as Array<Record<string, unknown>>,
            categories: categories as Array<Record<string, unknown>>,
            products: products as Array<Record<string, unknown>>,
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
