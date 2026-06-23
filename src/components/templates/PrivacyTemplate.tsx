'use client'

import { DataProvider, usePageData } from '@/lib/directus/context'
import { Navbar } from '@/components/organisms/Navbar'
import { Footer } from '@/components/organisms/Footer'
import { ScrollRefresher } from '@/components/shared/ScrollRefresher'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
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

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="bg-brand-yellow/20 text-brand-yellow font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </span>
      <span>{children}</span>
    </li>
  )
}

function ContactCard({
  href,
  icon,
  label,
  value,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 text-brand-yellow">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-brand-yellow text-sm group-hover:text-brand-orange transition-colors">{value}</p>
      </div>
    </a>
  )
}

function PrivacyContent() {
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
            Política de{' '}
            <span className="text-gradient">Privacidad</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            En <strong className="text-white">{brandName}</strong> la privacidad de nuestra gente
            importa. Aquí te explicamos qué datos recopilamos, para qué los usamos y cómo puedes
            controlarlos — sin letra pequeña.
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

      {/* ── Policy body ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-14">

          {/* 1 */}
          <Section title="Responsable del tratamiento">
            <p>
              El responsable del tratamiento de tus datos personales es{' '}
              <strong className="text-white">{brandName}</strong>, sociedad legalmente constituida
              en Colombia bajo el NIT <strong className="text-white">{nit}</strong>, con domicilio
              en {address}.
            </p>
            <p>
              Puedes contactarnos directamente por WhatsApp al{' '}
              <a
                href={`https://wa.me/${whatsapp}`}
                className="text-brand-yellow hover:text-brand-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {whatsapp}
              </a>{' '}
              para cualquier inquietud sobre tus datos.
            </p>
          </Section>

          {/* 2 */}
          <Section title="Datos que recopilamos">
            <p>Recopilamos información según cómo interactúas con nosotros:</p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                <strong className="text-white/80">Datos de contacto:</strong> nombre y número de
                teléfono que nos compartes al escribirnos por WhatsApp o a través de cualquier
                formulario.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Datos de navegación:</strong> dirección IP, tipo
                de dispositivo, navegador, sistema operativo, páginas visitadas y tiempo de
                permanencia en el sitio.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Datos de interacción con anuncios:</strong>{' '}
                información recopilada a través del Píxel de Meta (Facebook Pixel) sobre acciones
                que realizas en nuestro sitio después de ver o clicar uno de nuestros anuncios en
                Facebook o Instagram.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Cookies y tecnologías similares:</strong>{' '}
                identificadores únicos almacenados en tu dispositivo para mejorar tu experiencia y
                mostrarte contenido relevante.
              </Bullet>
            </ul>
          </Section>

          {/* 3 */}
          <Section title="Para qué usamos tu información">
            <ul className="space-y-2">
              <Bullet>Atender tus consultas, pedidos y solicitudes de información.</Bullet>
              <Bullet>
                Gestionar la relación comercial y mantenerte informado sobre nuestros productos.
              </Bullet>
              <Bullet>Mejorar y personalizar tu experiencia en el sitio web.</Bullet>
              <Bullet>
                Realizar análisis estadísticos de uso para optimizar nuestras páginas y contenidos.
              </Bullet>
              <Bullet>
                Mostrarte publicidad personalizada en Facebook e Instagram mediante la plataforma de
                Meta.
              </Bullet>
              <Bullet>Cumplir con las obligaciones legales aplicables en Colombia.</Bullet>
            </ul>
          </Section>

          {/* 4 */}
          <Section title="Píxel de Meta y publicidad digital">
            <p>
              Nuestro sitio utiliza el{' '}
              <strong className="text-white">Píxel de Meta</strong> (Facebook Pixel), una
              herramienta de análisis proporcionada por Meta Platforms, Inc., que nos permite:
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>Medir la efectividad de nuestros anuncios en Facebook e Instagram.</Bullet>
              <Bullet>
                Crear audiencias personalizadas para mostrar anuncios a personas que ya han visitado
                nuestro sitio.
              </Bullet>
              <Bullet>
                Optimizar campañas para llegar a personas con intereses similares a los de nuestros
                clientes.
              </Bullet>
            </ul>
            <p className="mt-4">
              El Píxel puede recopilar tu dirección IP, identificadores de cookies y acciones en el
              sitio (visitas, clics). Esta información es enviada a los servidores de Meta. Consulta
              la{' '}
              <a
                href="https://www.facebook.com/privacy/policy/"
                className="text-brand-yellow hover:text-brand-orange transition-colors underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de Meta
              </a>{' '}
              para más detalle. Puedes controlar el uso de tus datos en{' '}
              <a
                href="https://www.facebook.com/ads/preferences"
                className="text-brand-yellow hover:text-brand-orange transition-colors underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Configuración de anuncios de Facebook
              </a>
              .
            </p>
          </Section>

          {/* 5 — WhatsApp Business API: dedicated section required for approval */}
          <div
            id="whatsapp-business"
            className="rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="bg-white/5 px-6 sm:px-8 py-5 flex items-center gap-4 border-b border-white/10">
              <svg
                className="w-5 h-5 text-brand-yellow shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.145.566 4.154 1.553 5.888L0 24l6.303-1.533C8.011 23.445 9.962 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.96 0-3.78-.538-5.337-1.47l-.383-.227-3.743.91.949-3.658-.25-.397C2.212 15.406 1.636 13.76 1.636 12 1.636 6.539 6.539 1.636 12 1.636S22.364 6.539 22.364 12 17.461 21.818 12 21.818z" />
              </svg>
              <h2 className="text-white font-bold text-lg sm:text-xl leading-snug">
                Comunicaciones por WhatsApp Business
              </h2>
            </div>
            <div className="px-6 sm:px-8 py-7 space-y-5 text-white/60 text-sm sm:text-base leading-relaxed">
              <p>
                Utilizamos la <strong className="text-white">API de WhatsApp Business</strong>{' '}
                (proporcionada por Meta Platforms, Inc.) como canal principal de atención al cliente,
                gestión de pedidos e información sobre productos. Esta sección describe cómo
                gestionamos los datos dentro de este canal.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-white/80 font-semibold mb-2">Datos que recopilamos vía WhatsApp</p>
                  <ul className="space-y-1.5">
                    <Bullet>Número de teléfono móvil.</Bullet>
                    <Bullet>Nombre de perfil de WhatsApp (si está disponible).</Bullet>
                    <Bullet>Contenido de los mensajes que nos envías (consultas, pedidos, solicitudes).</Bullet>
                    <Bullet>Fecha y hora de las conversaciones.</Bullet>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 font-semibold mb-2">Para qué usamos estos datos</p>
                  <ul className="space-y-1.5">
                    <Bullet>Responder a tus consultas sobre nuestra carta y productos.</Bullet>
                    <Bullet>Confirmar y gestionar tus pedidos.</Bullet>
                    <Bullet>Enviarte información que hayas solicitado expresamente.</Bullet>
                    <Bullet>Mejorar la calidad de nuestra atención al cliente.</Bullet>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 font-semibold mb-2">Consentimiento y mensajes</p>
                  <p>
                    Solo enviamos mensajes a usuarios que han iniciado contacto con nosotros de forma
                    voluntaria o que han dado su consentimiento expreso para recibir comunicaciones.
                    No enviamos mensajes promocionales masivos sin autorización previa.
                  </p>
                </div>

                <div>
                  <p className="text-white/80 font-semibold mb-2">Cómo dejar de recibir mensajes</p>
                  <p>
                    Puedes detener las comunicaciones por WhatsApp en cualquier momento respondiendo{' '}
                    <strong className="text-white">STOP</strong> o{' '}
                    <strong className="text-white">&ldquo;No quiero recibir más mensajes&rdquo;</strong> en
                    nuestra conversación. También puedes bloquearnos desde la aplicación de WhatsApp.
                    Procesaremos tu solicitud de inmediato y no volveremos a contactarte salvo que
                    lo solicites nuevamente.
                  </p>
                </div>

                <p className="text-white/40 text-xs pt-2 border-t border-white/10">
                  El uso de WhatsApp está sujeto además a los{' '}
                  <a
                    href="https://www.whatsapp.com/legal/privacy-policy"
                    className="text-brand-yellow hover:text-brand-orange transition-colors underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Términos y Política de Privacidad de WhatsApp
                  </a>
                  . Los mensajes pueden estar cifrados de extremo a extremo conforme a las
                  especificaciones técnicas de la plataforma.
                </p>
              </div>
            </div>
          </div>

          {/* 6 */}
          <Section title="Cookies">
            <p>Utilizamos tres categorías de cookies:</p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                <strong className="text-white/80">Técnicas:</strong> necesarias para el
                funcionamiento básico del sitio (sesión, navegación).
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Analíticas:</strong> nos permiten entender cómo
                interactúas con el contenido y mejorarlo.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Publicitarias (Píxel de Meta):</strong> usadas
                para mostrarte anuncios relevantes en Facebook e Instagram.
              </Bullet>
            </ul>
            <p className="mt-4">
              Puedes configurar tu navegador para rechazar cookies o recibir avisos al recibirlas.
              Algunas funciones del sitio pueden no estar disponibles si las deshabilitas.
            </p>
          </Section>

          {/* 6 */}
          <Section title="Compartición de datos con terceros">
            <p>
              No vendemos ni alquilamos tus datos. Sí los compartimos con estos proveedores de
              servicios:
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                <strong className="text-white/80">Meta Platforms, Inc.:</strong> datos de
                comportamiento en el sitio para la entrega de publicidad personalizada, medición de
                anuncios y creación de audiencias en Facebook e Instagram.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">WhatsApp Business API (Meta):</strong> los
                mensajes que intercambiamos son procesados a través de la infraestructura de Meta
                Platforms, Inc. El contenido de las conversaciones queda sujeto a los{' '}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  className="text-brand-yellow hover:text-brand-orange transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Términos de Privacidad de WhatsApp
                </a>. No compartimos el contenido de tus mensajes con terceros ajenos a la
                prestación del servicio.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Autoridades legales:</strong> únicamente cuando
                sea requerido por ley o por orden judicial.
              </Bullet>
            </ul>
          </Section>

          {/* 7 */}
          <Section title="Tus derechos — Habeas Data">
            <p>
              Conforme a la Ley 1581 de 2012 y sus decretos reglamentarios, tienes derecho a:
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>
                <strong className="text-white/80">Acceder</strong> a los datos que tenemos sobre ti
                y conocer cómo los usamos.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Rectificar</strong> datos inexactos o
                incompletos.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Suprimir</strong> tus datos cuando ya no sean
                necesarios para la finalidad original.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Portabilidad:</strong> recibir tus datos en un
                formato estructurado y de uso común.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Oponerte</strong> al tratamiento para finalidades
                de marketing y publicidad.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Revocar el consentimiento</strong> en cualquier
                momento sin que esto afecte la licitud del tratamiento previo.
              </Bullet>
            </ul>
          </Section>

          {/* 8 — Data deletion: the key Meta requirement, visually highlighted */}
          <div
            id="eliminacion-de-datos"
            className="rounded-2xl overflow-hidden border border-brand-yellow/30"
          >
            {/* Yellow gradient header strip */}
            <div className="bg-gradient-to-r from-brand-yellow to-brand-orange px-6 sm:px-8 py-5 flex items-center gap-4">
              <svg
                className="w-5 h-5 text-brand-purple shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <h2 className="text-brand-purple font-bold text-lg sm:text-xl leading-snug">
                Eliminación de datos
              </h2>
            </div>

            {/* Body */}
            <div className="bg-brand-yellow/5 px-6 sm:px-8 py-7 space-y-5 text-white/60 text-sm sm:text-base leading-relaxed">
              <p>
                Puedes solicitar la eliminación de tus datos personales de nuestros sistemas en
                cualquier momento. El proceso es sencillo:
              </p>
              <ol className="space-y-4">
                <Step n={1}>
                  Escríbenos por WhatsApp al{' '}
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    className="text-brand-yellow hover:text-brand-orange transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {whatsapp}
                  </a>{' '}
                  o a nuestras redes sociales con el mensaje:{' '}
                  <strong className="text-white">&ldquo;Solicitud de eliminación de datos personales&rdquo;</strong>.
                </Step>
                <Step n={2}>
                  Incluye tu nombre, información de contacto y una descripción de los datos que
                  deseas eliminar.
                </Step>
                <Step n={3}>
                  Procesaremos tu solicitud dentro de los{' '}
                  <strong className="text-white">15 días hábiles</strong> siguientes, conforme a la
                  legislación colombiana de protección de datos.
                </Step>
              </ol>
              <p className="text-white/50 text-xs pt-2 border-t border-white/10">
                Si interactuaste con nuestros anuncios en Facebook o Instagram, también puedes
                gestionar tus datos directamente desde la{' '}
                <a
                  href="https://www.facebook.com/help/contact/1112256092077902"
                  className="text-brand-yellow hover:text-brand-orange transition-colors underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  herramienta de eliminación de datos de Meta
                </a>
                . También puedes visitar nuestra{' '}
                <a
                  href="/eliminacion-de-datos"
                  className="text-brand-yellow hover:text-brand-orange transition-colors underline underline-offset-2"
                >
                  página de eliminación de datos
                </a>
                .
              </p>
            </div>
          </div>

          {/* 9 */}
          <Section title="Retención de datos">
            <ul className="space-y-2">
              <Bullet>
                <strong className="text-white/80">Datos de contacto y pedidos:</strong> hasta 5
                años desde el último contacto, según la legislación colombiana.
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Datos de navegación y cookies:</strong> según la
                duración configurada para cada cookie (sesión hasta 13 meses).
              </Bullet>
              <Bullet>
                <strong className="text-white/80">Datos de Píxel de Meta:</strong> conforme a las
                políticas de retención de Meta Platforms, Inc.
              </Bullet>
            </ul>
          </Section>

          {/* 10 */}
          <Section title="Seguridad">
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso
              no autorizado, pérdida o divulgación:
            </p>
            <ul className="space-y-2 mt-3">
              <Bullet>Transmisión cifrada mediante HTTPS (SSL/TLS).</Bullet>
              <Bullet>Acceso restringido al personal autorizado.</Bullet>
              <Bullet>Revisión periódica de prácticas de seguridad.</Bullet>
            </ul>
          </Section>

          {/* 11 */}
          <Section title="Cambios a esta política">
            <p>
              Podemos actualizar esta política periódicamente para reflejar cambios en nuestras
              prácticas de datos o en la legislación aplicable. Cuando lo hagamos, actualizaremos
              la fecha de &ldquo;última actualización&rdquo; visible en la parte superior de esta página. Te
              recomendamos revisarla de vez en cuando.
            </p>
          </Section>

          {/* 12 — Contact */}
          <Section title="Contáctanos">
            <p className="mb-5">
              ¿Preguntas sobre esta política o quieres ejercer tus derechos? Escríbenos por
              cualquiera de estos canales:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <ContactCard
                href={`https://wa.me/${whatsapp}`}
                label="WhatsApp"
                value={whatsapp}
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
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                }
              />
            </div>
          </Section>

          {/* Back to home */}
          <div className="pt-4 border-t border-white/10">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-white/30 hover:text-brand-yellow text-sm transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
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

export function PrivacyTemplate() {
  return (
    <DataProvider>
      <ScrollRefresher />
      <Navbar />
      <PrivacyContent />
      <Footer />
    </DataProvider>
  )
}
