'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/components/atoms/Logo'
import { Button } from '@/components/atoms/Button'
import { NavLink } from '@/components/molecules/NavLink'
import { navLinks } from '@/lib/data/products'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-purple/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0">
            <Logo variant="white" width={130} height={52} priority />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Button href="https://wa.me/573180165736" external size="sm" className="hidden sm:inline-flex">
              Pedir Ahora
            </Button>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Abrir menú"
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-brand-purple/98 border-t border-white/10 py-5 px-2 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-3 text-white/80 hover:text-brand-yellow font-semibold text-base transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 px-3">
              <Button href="https://wa.me/573180165736" external size="md" className="w-full justify-center">
                Pedir Ahora
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
