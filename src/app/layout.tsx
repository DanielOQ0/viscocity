import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'VISCOCITY S.A.S',
  legalName: 'VISCOCITY S.A.S',
  taxID: '902022383-2',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Calle contigua a CC Jardín Plaza, lado sur oriental, entre anillo vial oriental CL 11',
    addressLocality: 'Cúcuta',
    addressRegion: 'Norte de Santander',
    addressCountry: 'CO',
  },
}

export const metadata: Metadata = {
  title: 'Viscocity — Granizados, Sodas & Smoothies con Actitud',
  description:
    'En Viscocity servimos flow en vaso. Granizados, sodas y smoothies con sabor urbano. Únete al parche.',
  applicationName: 'VISCOCITY S.A.S',
  icons: {
    icon: '/images/logos/fondoetiquetacoc.png',
    shortcut: '/images/logos/fondoetiquetacoc.png',
    apple: '/images/logos/fondoetiquetacoc.png',
  },
  keywords: ['viscocity', 'granizados', 'sodas', 'smoothies', 'bebidas', 'colombia'],
  openGraph: {
    title: 'Viscocity — Granizados, Sodas & Smoothies con Actitud',
    description: 'Servimos flow en vaso. Únete al parche.',
    type: 'website',
    siteName: 'VISCOCITY S.A.S',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-montserrat antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
