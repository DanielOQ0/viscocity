interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className = '' }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`font-semibold text-sm text-white/75 hover:text-brand-yellow tracking-wide transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  )
}
