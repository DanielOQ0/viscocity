import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'American Fest Cúcuta 2026 | Viscocity & JA Social Club',
  description:
    'Del 25 al 29 de junio, Cúcuta vive el American Fest. Conoce los menús de Viscocity y JA Social Club: granizados, sodas, smoothies, comida americana y más.',
  openGraph: {
    title: 'American Fest Cúcuta 2026',
    description:
      'Viscocity y JA Social Club presentes en el festival más esperado del año. 25 al 29 de junio, Cúcuta.',
    type: 'website',
  },
}

export default function AmericanFestLayout({ children }: { children: ReactNode }) {
  return children
}
