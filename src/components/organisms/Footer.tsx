"use client"

import { Logo } from '@/components/atoms/Logo'
import { SocialLinks } from '@/components/atoms/SocialIcons'
import { usePageData } from '@/lib/directus/context'

export function Footer() {
  const { settings, navLinks, footer } = usePageData()

  const whatsapp = (settings?.whatsapp_number as string) || '+573180165736'
  const instagram = (settings?.instagram_url as string) || 'https://www.instagram.com/viiscocity'
  const copyright = (settings?.copyright_text as string) || '© {year} VISCOCITY S.A.S. Todos los derechos reservados.'
  const nit = (settings?.nit as string) || '902022383-2'
  const address = (settings?.address as string) || 'Cúcuta, Norte de Santander, Colombia'

  return (
    <footer className="bg-brand-purple border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo variant="white" width={130} height={52} className="mb-4" />
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              {(footer?.tagline as string) || 'La ciudad donde el sabor se vive en cada esquina y el parche nunca se enfría.'}
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href as string}>
                  <a
                    href={l.href as string}
                    className="text-white/45 hover:text-brand-yellow text-sm transition-colors duration-200"
                  >
                    {l.label as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">
              Contáctanos
            </h3>
            <div className="space-y-2 mb-5">
              <p className="text-white/45 text-sm">Colombia</p>
              <a
                href={`https://wa.me/${whatsapp}`}
                className="text-brand-yellow hover:text-brand-orange text-sm transition-colors duration-200 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {whatsapp.replace('+', '+ ').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
              </a>
            </div>
            <SocialLinks instagramUrl={instagram} whatsappUrl={`https://wa.me/${whatsapp}`} />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-white/30 text-sm">
              {copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
            <p className="text-white/20 text-xs">
              NIT: {nit} &nbsp;·&nbsp; {address}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              <a
                href="/politica-de-privacidad"
                className="text-white/20 text-xs hover:text-brand-yellow transition-colors duration-200"
              >
                Política de Privacidad
              </a>
              <span className="text-white/10 text-xs">·</span>
              <a
                href="/condiciones-de-servicio"
                className="text-white/20 text-xs hover:text-brand-yellow transition-colors duration-200"
              >
                Condiciones del Servicio
              </a>
            </div>
          </div>
          <p className="text-white/20 text-xs">
            Bebe, ríe y repite.
          </p>
        </div>
      </div>
    </footer>
  )
}
