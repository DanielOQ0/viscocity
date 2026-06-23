import type { Metadata } from 'next'
import { PrivacyTemplate } from '@/components/templates/PrivacyTemplate'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Viscocity',
  description:
    'Conoce cómo VISCOCITY S.A.S recopila, usa y protege tus datos personales. Incluye información sobre el uso del Píxel de Meta y cómo ejercer tus derechos.',
  robots: { index: true, follow: true },
}

export default function PoliticaDePrivacidadPage() {
  return <PrivacyTemplate />
}
