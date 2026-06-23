'use client'

import { DataProvider, usePageData } from '@/lib/directus/context'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { ScrollRefresher } from '@/components/shared/ScrollRefresher'

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center text-brand-purple font-bold text-sm">
          {n}
        </div>
        {n < 3 && <div className="w-px flex-1 bg-brand-yellow/20 mt-3" />}
      </div>
      <div className="pb-10">
        <p className="text-white font-semibold mb-1">{title}</p>
        <p className="text-white/60 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function ContactCard({
  href,
  icon,
  label,
  value,
  description,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  description: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all duration-200 group"
    >
      <div className="w-11 h-11 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 text-brand-yellow mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-brand-yellow group-hover:text-brand-orange transition-colors font-medium mb-1">{value}</p>
        <p className="text-white/40 text-xs">{description}</p>
      </div>
    </a>
  )
}

function DataDeletionContent() {
  const { settings } = usePageData()

  const brandName = (settings?.brand_name as string) || 'VISCOCITY S.A.S'
  const nit = (settings?.nit as string) || '902022383-2'
  const whatsapp = (settings?.whatsapp_number as string) || '+573180165736'
  const instagram = (settings?.instagram_url as string) || 'https://www.instagram.com/viiscocity'
  const instagramHandle = '@' + (instagram.split('/').filter(Boolean).pop() || 'viiscocity')

  return (
    <main className="bg-brand-purple min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-brand-yellow text-xs font-bold uppercase tracking-[0.3em] mb-5 bg-brand-yellow/10 px-3 py-1.5 rounded-full">
            Privacidad
          </span>
          <h1 className="font-milker text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6">
            Eliminación de{' '}
            <span className="text-gradient">Datos</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            Tienes derecho a solicitar que eliminemos tus datos personales de nuestros sistemas.
            El proceso es simple y lo resolvemos en máximo{' '}
            <strong className="text-white">15 días hábiles</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/30">
            <span>{brandName}</span>
            <span className="text-white/15">·</span>
            <span>NIT: {nit}</span>
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-white/40 text-xs font-bold uppercase tracking-[0.25em] mb-10">
            Cómo solicitar la eliminación
          </h2>

          <div>
            <Step n={1} title="Contáctanos directamente">
              Escríbenos por WhatsApp al{' '}
              <a
                href={`https://wa.me/${whatsapp}`}
                className="text-brand-yellow hover:text-brand-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {whatsapp}
              </a>{' '}
              o por Instagram a{' '}
              <a
                href={instagram}
                className="text-brand-yellow hover:text-brand-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {instagramHandle}
              </a>
              . Usa el asunto:{' '}
              <strong className="text-white">&ldquo;Solicitud de eliminación de datos personales&rdquo;</strong>.
            </Step>

            <Step n={2} title="Danos esta información">
              Incluye en tu mensaje: tu nombre completo, número de teléfono o correo asociado a
              tu cuenta, y una descripción de los datos que deseas que eliminemos (conversaciones de
              WhatsApp, datos de publicidad, datos de navegación, etc.).
            </Step>

            <Step n={3} title="Confirmamos y eliminamos">
              Procesamos tu solicitud dentro de los <strong className="text-white">15 días hábiles</strong>{' '}
              siguientes a recibirla, de acuerdo con la Ley 1581 de 2012 (Habeas Data) de Colombia.
              Te confirmaremos por el mismo canal cuando los datos hayan sido eliminados.
            </Step>
          </div>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <ContactCard
              href={`https://wa.me/${whatsapp}?text=Solicitud%20de%20eliminaci%C3%B3n%20de%20datos%20personales`}
              label="WhatsApp"
              value={whatsapp}
              description="Toca para abrir el chat con el mensaje prellenado"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.145.566 4.154 1.553 5.888L0 24l6.303-1.533C8.011 23.445 9.962 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.96 0-3.78-.538-5.337-1.47l-.383-.227-3.743.91.949-3.658-.25-.397C2.212 15.406 1.636 13.76 1.636 12 1.636 6.539 6.539 1.636 12 1.636S22.364 6.539 22.364 12 17.461 21.818 12 21.818z" />
                </svg>
              }
            />
            <ContactCard
              href={instagram}
              label="Instagram"
              value={instagramHandle}
              description="Envíanos un DM con tu solicitud"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              }
            />
          </div>

          {/* Divider + Meta direct link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm mb-4">
              Si tus datos están relacionados con anuncios de Facebook o Instagram, también puedes
              gestionarlos directamente desde Meta:
            </p>
            <a
              href="https://www.facebook.com/help/contact/1112256092077902"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-yellow hover:text-brand-orange text-sm transition-colors duration-200 underline underline-offset-4"
            >
              Herramienta oficial de eliminación de datos de Meta
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Back links */}
          <div className="mt-10 flex flex-wrap gap-6">
            <a
              href="/politica-de-privacidad"
              className="inline-flex items-center gap-2 text-white/30 hover:text-brand-yellow text-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Política de privacidad completa
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-white/30 hover:text-brand-yellow text-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </a>
          </div>

        </div>
      </section>
    </main>
  )
}

export function DataDeletionTemplate() {
  return (
    <DataProvider>
      <ScrollRefresher />
      <Navbar />
      <DataDeletionContent />
      <Footer />
    </DataProvider>
  )
}
