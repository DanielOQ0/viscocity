'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageData } from '@/lib/directus/context'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * El contenido llega de Directus después del primer render y las imágenes
 * cargan más tarde aún, así que las posiciones que ScrollTrigger midió al
 * crearse quedan desfasadas. Este componente recalcula los triggers cuando
 * los datos terminan de cargar y cuando todas las imágenes pendientes
 * terminan de descargarse.
 */
export function ScrollRefresher() {
  const { loading } = usePageData()

  useEffect(() => {
    if (loading) return

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    const pendingImages = Array.from(document.images).filter((img) => !img.complete)
    let pending = pendingImages.length
    const onImageDone = () => {
      pending -= 1
      if (pending === 0) ScrollTrigger.refresh()
    }
    pendingImages.forEach((img) => {
      img.addEventListener('load', onImageDone, { once: true })
      img.addEventListener('error', onImageDone, { once: true })
    })

    return () => {
      cancelAnimationFrame(raf)
      pendingImages.forEach((img) => {
        img.removeEventListener('load', onImageDone)
        img.removeEventListener('error', onImageDone)
      })
    }
  }, [loading])

  return null
}
