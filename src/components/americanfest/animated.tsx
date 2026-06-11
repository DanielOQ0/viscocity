'use client'

import { useRef, useLayoutEffect, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Direction = 'up' | 'down' | 'left' | 'right'

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
}

interface RevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** anima los hijos directos en cascada en lugar del contenedor */
  stagger?: boolean
  direction?: Direction
  delay?: number
  start?: string
}

/**
 * Reveal disparado por scroll: anima el elemento (o sus hijos con `stagger`)
 * desde un estado desplazado/transparente hasta su posición.
 */
export function Reveal({
  children,
  className,
  as,
  stagger = false,
  direction = 'up',
  delay = 0,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = (as ?? 'div') as ElementType

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el
      const from = offsets[direction]

      gsap.from(targets, {
        opacity: 0,
        x: from.x ?? 0,
        y: from.y ?? 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, direction, delay, start])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** positivo se mueve más lento (hacia arriba); negativo lo contrario */
  speed?: number
}

/** Parallax vertical ligado a la posición del scroll. */
export function Parallax({ children, className, speed = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed >= 0 ? -Math.abs(speed) / 8 : Math.abs(speed) / 8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface MarqueeProps {
  children: ReactNode
  className?: string
  /** segundos por vuelta completa */
  speed?: number
  reverse?: boolean
  /** ralentiza el loop cuando el cursor está encima */
  slowOnHover?: boolean
}

/** Marquee horizontal infinito con GSAP. */
export function Marquee({
  children,
  className,
  speed = 22,
  reverse = false,
  slowOnHover = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(track, { xPercent: reverse ? -50 : 0 })
      tweenRef.current = gsap.to(track, {
        xPercent: reverse ? 0 : -50,
        repeat: -1,
        duration: speed,
        ease: 'none',
      })
    }, track)

    return () => {
      tweenRef.current = null
      ctx.revert()
    }
  }, [speed, reverse])

  const handleEnter = () => {
    if (slowOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.5, overwrite: true })
    }
  }
  const handleLeave = () => {
    if (slowOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, overwrite: true })
    }
  }

  return (
    <div
      className={`overflow-hidden ${className ?? ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={trackRef} className="flex w-max">
        {children}
        {children}
      </div>
    </div>
  )
}
