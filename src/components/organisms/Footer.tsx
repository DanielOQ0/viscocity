import { Logo } from '@/components/atoms/Logo'
import { SocialLinks } from '@/components/atoms/SocialIcons'
import { navLinks } from '@/lib/data/products'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-purple border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Logo variant="white" width={130} height={52} className="mb-4" />
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              La ciudad donde el sabor se vive en cada esquina y el parche nunca se enfría.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/45 hover:text-brand-yellow text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">
              Contáctanos
            </h3>
            <div className="space-y-2 mb-5">
              <p className="text-white/45 text-sm">Colombia</p>
              <a
                href="https://wa.me/573180165736"
                className="text-brand-yellow hover:text-brand-orange text-sm transition-colors duration-200 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +57 318 016 5736
              </a>
            </div>
            <SocialLinks />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-white/30 text-sm">
              © {year} VISCOCITY S.A.S. Todos los derechos reservados.
            </p>
            <p className="text-white/20 text-xs">
              NIT: 902022383-2 &nbsp;·&nbsp; Cúcuta, Norte de Santander, Colombia
            </p>
          </div>
          <p className="text-white/20 text-xs">
            Bebe, ríe y repite.
          </p>
        </div>
      </div>
    </footer>
  )
}
