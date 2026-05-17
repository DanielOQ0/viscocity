import Image from 'next/image'

type Variant = 'original' | 'white' | 'black' | 'orange' | 'yellow'

const src: Record<Variant, string> = {
  original: '/images/logos/logo-original.png',
  white:    '/images/logos/logo-white.png',
  black:    '/images/logos/logo-black.png',
  orange:   '/images/logos/logo-orange.png',
  yellow:   '/images/logos/logo-yellow.png',
}

interface LogoProps {
  variant?: Variant
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({
  variant = 'original',
  width = 180,
  height = 72,
  className = '',
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={src[variant]}
      alt="Viscocity"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority={priority}
    />
  )
}
