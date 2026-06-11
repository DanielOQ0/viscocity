"use client"

import { useState, useEffect } from 'react'
import { Logo } from '@/components/atoms/Logo'
import { NavLink } from '@/components/molecules/NavLink'
import { usePageData } from '@/lib/directus/context'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { settings, navLinks } = usePageData()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsapp = (settings?.whatsapp_number as string) || '+573180165736'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-purple/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#inicio" className="flex-shrink-0">
            <Logo variant="white" width={130} height={52} />
          </a>

          <div className="hidden sm:flex items-center justify-center flex-1 gap-8">
            {navLinks.map((l) => (
              <NavLink key={l.href as string} href={l.href as string}>
                {l.label as string}
              </NavLink>
            ))}
          </div>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-purple font-bold px-6 py-2.5 rounded-full text-sm hover:shadow-lg hover:shadow-brand-yellow/30 transition-all duration-200"
          >
            Pedir Ahora
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden bg-brand-purple border-t border-white/10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href as string}
              href={l.href as string}
              onClick={() => setOpen(false)}
              className="text-white text-2xl font-semibold hover:text-brand-yellow transition-colors"
            >
              {l.label as string}
            </a>
          ))}
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-purple font-bold px-8 py-3 rounded-full text-lg"
          >
            Pedir Ahora
          </a>
        </div>
      )}
    </nav>
  )
}
