import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-purple font-bold shadow-lg hover:shadow-brand-orange/40 hover:scale-[1.03] active:scale-100',
  outline:
    'border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-purple',
  dark: 'bg-brand-purple text-white font-bold shadow-lg hover:bg-brand-purple/80 hover:scale-[1.03] active:scale-100',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-full',
  md: 'px-6 py-3 text-base rounded-full',
  lg: 'px-8 py-4 text-lg rounded-full',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none'
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
