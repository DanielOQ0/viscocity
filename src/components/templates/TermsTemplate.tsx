'use client'

import { DataProvider, usePageData } from '@/lib/directus/context'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { ScrollRefresher } from '@/components/shared/ScrollRefresher'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-brand-yellow/40 pl-6 sm:pl-8">
      <h2 className="text-white font-bold text-lg sm:text-xl mb-4 leading-snug">{title}</h2>
      <div className="space-y-3 text-white/60 text-sm sm:text-base leading-relaxed">{children}</div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-brand-yellow mt-[3px] shrink-0 text-base leading-none">›</span>
      <span>{children}</span>
    </li>
  )
}

function TermsContent() {
  const { settings } = usePageData()

  const brandName = (settings?.brand_name as string) || 'VISCOCITY S.A.S'
  const nit = (settings?.nit as string) || '902022383-2'
  const address = (settings?.address as string) || 'Cúcuta, Norte de Santander, Colombia'
  const whatsapp = (settings?.whatsapp_number as string) || '+573180165736'
  const instagram = (settings?.instagram_url as string) || 'https://www.instagram.com/viiscocity'
  const instagramHandle = '@' + (instagram.split('/').filter(Boolean).pop() || 'viiscocity')

  return (
    <main className="bg-brand-purple min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-brand-yellow text-xs font-bold uppercase tracking-[0.3em] mb-5 bg-brand-yellow/10 px-3 py-1.5 rounded-full">
            Legal
          </span>
          <h1 className="font-milker text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6">
            Condiciones del{' '}
            <span className="text-gradient">Servicio</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Al realizar un pedido o usar nuestros canales de atención, aceptas estas condiciones.
            Léelas — son cortas y están escritas en español real.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/30">
            <span>Última actualización: junio de 2026</span>
            <span className="text-white/15">·</span>
            <span>NIT: {nit}</span>
            <span className="text-white/15">·</span>
            <span>{address}</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-14">

          <Section title="Quiénes somos">
            <p>
              <strong className="text-white">{brandName}</strong> (NIT {nit}) es una empresa
              colombiana domiciliada en {address}, dedicada a la preparación y venta de granizados,
              sodas, smoothies y bebidas de autor. Operamos a través de nuestro punto de venta
              físico, nuestro sitio web <strong className="text-white">viscocity.com.co</strong> y
              nuestros canales digitales (WhatsApp e Instagram).
            </p>
          </Section>

          <Section title="Aceptación de las condiciones">
            <p>
              Al hacer un pedido, enviar un mensaje a través de WhatsApp o Instagram, navegar por
              nuestro sitio web o interactuar con nuestras plataformas digitales, confirmas que has
              leído, entendido y aceptado estas Condiciones del Servicio en su totalidad.
            </p>
            <p>
              Si no estás de acuerdo con alguna de estas condiciones, te pedimos que no uses
              nuestros servicios.
            </p>
          </Section>

          <Section title="Nuestros productos y servicios">
            <p>
              Ofrecemos productos de temporada y disponibilidad variable. La carta publicada en
              nuestro sitio web es orientativa — los productos, precios y presentaciones pueden
              cambiar sin previo aviso según disponibilidad de ingredientes y temporada.
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                <strong className="text-white/80">Pedidos presenciales:</strong> en nuestro punto
                de venta físico en {address}.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Pedidos por WhatsApp:</strong> al número{' '}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  className="text-brand-yellow hover:text-brand-orange transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {whatsapp}
                </a>
                . Los pedidos se confirman una vez recibido el mensaje de confirmación de nuestra parte.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Disponibilidad:</strong> los productos están
                sujetos a existencias. En caso de no poder cumplir un pedido, te contactaremos para
                ofrecerte una alternativa o gestionar el reembolso.
              </Bullet>
            </ul>
          </Section>

          <Section title="Precios y pagos">
            <p>
              Todos los precios publicados están expresados en pesos colombianos (COP) e incluyen
              los impuestos aplicables. Nos reservamos el derecho de actualizar precios en cualquier
              momento; el precio vigente al momento de confirmar el pedido es el que aplica.
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                Aceptamos los métodos de pago disponibles en nuestro punto físico (efectivo,
                transferencia, Nequi, Daviplata) o los acordados al momento del pedido por WhatsApp.
              </Bullet>
              <Bullet>
                No almacenamos información de tarjetas de crédito ni débito.
              </Bullet>
              <Bullet>
                Los pedidos por WhatsApp deben pagarse según las instrucciones proporcionadas en la
                conversación de confirmación.
              </Bullet>
            </ul>
          </Section>

          <Section title="Entrega y recogida">
            <p>
              Actualmente atendemos principalmente de forma presencial. Si ofrecemos servicio a
              domicilio en determinadas zonas, lo informaremos expresamente en la conversación de
              pedido. Los tiempos de preparación son estimativos y pueden variar según la demanda.
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                El cliente es responsable de proporcionar una dirección de entrega correcta cuando
                aplique el servicio a domicilio.
              </Bullet>
              <Bullet>
                <strong className="text-white">{brandName}</strong> no se hace responsable de
                retrasos causados por circunstancias fuera de su control (condiciones climáticas,
                tráfico, fuerza mayor).
              </Bullet>
            </ul>
          </Section>

          <Section title="Devoluciones y reclamaciones">
            <p>
              Dado que nuestros productos son perecederos y de consumo inmediato, no aceptamos
              devoluciones una vez entregado el pedido. Sin embargo, si tienes una queja sobre la
              calidad o presentación de un producto, contáctanos dentro de las{' '}
              <strong className="text-white">2 horas siguientes</strong> a la entrega a través de
              nuestros canales:
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                WhatsApp:{' '}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  className="text-brand-yellow hover:text-brand-orange transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {whatsapp}
                </a>
              </Bullet>
              <Bullet>Instagram: {instagramHandle}</Bullet>
            </ul>
            <p className="mt-3">
              Evaluaremos cada caso individualmente y podremos ofrecer un reemplazo o crédito según
              corresponda.
            </p>
          </Section>

          <Section title="Uso de nuestros canales digitales">
            <p>
              Al usar nuestro sitio web, WhatsApp o Instagram, te comprometes a:
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>No usar los canales para fines ilícitos o contrarios a estas condiciones.</Bullet>
              <Bullet>
                No enviar mensajes masivos, spam o contenido que pueda perjudicar el funcionamiento
                de nuestros canales de atención.
              </Bullet>
              <Bullet>
                Proporcionar información veraz al realizar un pedido (nombre, dirección, método de
                pago).
              </Bullet>
              <Bullet>
                No intentar interferir con la seguridad o el funcionamiento de nuestro sitio web.
              </Bullet>
            </ul>
          </Section>

          <Section title="Propiedad intelectual">
            <p>
              Todo el contenido de <strong className="text-white">viscocity.com.co</strong> —
              incluyendo textos, imágenes, logotipos, ilustraciones de personajes, diseño gráfico
              y marca — es propiedad de <strong className="text-white">{brandName}</strong> o de
              sus licenciantes y está protegido por las leyes colombianas e internacionales de
              propiedad intelectual.
            </p>
            <p>
              Queda prohibida su reproducción, distribución o uso comercial sin autorización expresa
              y por escrito de <strong className="text-white">{brandName}</strong>.
            </p>
          </Section>

          <Section title="Limitación de responsabilidad">
            <p>
              <strong className="text-white">{brandName}</strong> no será responsable por daños
              indirectos, incidentales o consecuentes derivados del uso de nuestros servicios.
              Nuestra responsabilidad máxima ante cualquier reclamación se limita al valor del
              pedido objeto de la reclamación.
            </p>
            <p>
              No garantizamos la disponibilidad ininterrumpida del sitio web ni de los canales
              digitales. El sitio puede estar temporalmente inaccesible por mantenimiento o causas
              técnicas fuera de nuestro control.
            </p>
          </Section>

          <Section title="Modificaciones">
            <p>
              Podemos actualizar estas Condiciones del Servicio en cualquier momento. La versión
              vigente siempre estará disponible en{' '}
              <a
                href="/condiciones-de-servicio"
                className="text-brand-yellow hover:text-brand-orange transition-colors"
              >
                viscocity.com.co/condiciones-de-servicio
              </a>
              . El uso continuado de nuestros servicios tras una actualización implica la aceptación
              de las nuevas condiciones.
            </p>
          </Section>

          <Section title="Ley aplicable y jurisdicción">
            <p>
              Estas condiciones se rigen por las leyes de la República de Colombia. Para cualquier
              controversia derivada de estas condiciones, las partes se someten a la jurisdicción
              de los jueces y tribunales competentes de la ciudad de Cúcuta, Norte de Santander,
              Colombia, salvo que la ley disponga un fuero diferente.
            </p>
          </Section>

          <Section title="Contacto">
            <p>Para preguntas sobre estas condiciones, escríbenos:</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 text-brand-yellow">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.145.566 4.154 1.553 5.888L0 24l6.303-1.533C8.011 23.445 9.962 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.96 0-3.78-.538-5.337-1.47l-.383-.227-3.743.91.949-3.658-.25-.397C2.212 15.406 1.636 13.76 1.636 12 1.636 6.539 6.539 1.636 12 1.636S22.364 6.539 22.364 12 17.461 21.818 12 21.818z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="text-brand-yellow text-sm group-hover:text-brand-orange transition-colors">{whatsapp}</p>
                </div>
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 text-brand-yellow">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-0.5">Instagram</p>
                  <p className="text-brand-yellow text-sm group-hover:text-brand-orange transition-colors">{instagramHandle}</p>
                </div>
              </a>
            </div>
          </Section>

          {/* Back links */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6">
            <a
              href="/politica-de-privacidad"
              className="inline-flex items-center gap-2 text-white/30 hover:text-brand-yellow text-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Política de Privacidad
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-white/30 hover:text-brand-yellow text-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </a>
          </div>

        </div>
      </section>
    </main>
  )
}

export function TermsTemplate() {
  return (
    <DataProvider>
      <ScrollRefresher />
      <Navbar />
      <TermsContent />
      <Footer />
    </DataProvider>
  )
}
