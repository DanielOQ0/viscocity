import type { Metadata } from 'next'
import { DataDeletionTemplate } from '@/components/templates/DataDeletionTemplate'

export const metadata: Metadata = {
  title: 'Eliminación de Datos — Viscocity',
  description:
    'Solicita la eliminación de tus datos personales de VISCOCITY S.A.S. Instrucciones claras y proceso en 15 días hábiles.',
  robots: { index: true, follow: true },
}

export default function EliminacionDeDatosPage() {
  return <DataDeletionTemplate />
}
