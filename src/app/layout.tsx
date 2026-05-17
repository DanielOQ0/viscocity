import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Viscocity — Granizados, Sodas & Smoothies con Actitud',
  description:
    'En Viscocity servimos flow en vaso. Granizados, sodas y smoothies con sabor urbano. Únete al parche.',
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
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-montserrat antialiased">{children}</body>
    </html>
  )
}
