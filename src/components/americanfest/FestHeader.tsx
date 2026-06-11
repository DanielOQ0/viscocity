'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface FestHeaderProps {
  eventDate?: string
}

const navLinks = [
  { label: 'El Festival', href: '#festival' },
  { label: 'Viscocity', href: '#coc' },
  { label: 'JA Social Club', href: '#ja' },
]

export function FestHeader({ eventDate }: FestHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-white/10 bg-af-dark/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="font-milker text-xl tracking-wide text-white">
          AMERICAN<span className="af-text-fire">FEST</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/70 transition-colors hover:text-brand-yellow"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-af-fire px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white sm:inline-block">
            {eventDate || '25 al 29 de Junio'}
          </span>
          <Link
            href="/"
            className="hidden text-xs font-semibold text-white/40 transition-colors hover:text-white/70 lg:inline-block"
          >
            &larr; Viscocity
          </Link>

          {/* Toggle móvil */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-af-dark/95 px-5 py-4 backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-base font-semibold text-white/80 transition-colors hover:text-brand-yellow"
            >
              {link.label}
            </a>
          ))}
          <Link href="/" className="block py-3 text-sm font-semibold text-white/40">
            &larr; Volver a Viscocity
          </Link>
        </nav>
      )}
    </header>
  )
}
