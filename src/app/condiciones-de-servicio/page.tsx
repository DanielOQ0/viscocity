import type { Metadata } from 'next'
import { TermsTemplate } from '@/components/templates/TermsTemplate'

export const metadata: Metadata = {
  title: 'Condiciones del Servicio — Viscocity',
  description:
    'Términos y condiciones del servicio de VISCOCITY S.A.S. Lee nuestras condiciones antes de realizar un pedido.',
  robots: { index: true, follow: true },
}

export default function CondicionesDeServicioPage() {
  return <TermsTemplate />
}
