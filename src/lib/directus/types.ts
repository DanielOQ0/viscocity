export interface LandingSettings {
  id: string
  brand_name: string
  tagline: string
  whatsapp_number: string
  whatsapp_message: string
  instagram_url: string
  nit: string
  address: string
  copyright_text: string
  logo_white: string | null
  logo_original: string | null
}

export interface LandingHero {
  id: string
  headline: string
  subheadline: string
  tagline: string
  body: string
  pill_text: string
  cta_primary_text: string
  cta_primary_target: string
  cta_secondary_text: string
  cta_secondary_target: string
  character_main: string | null
  character_left: string | null
  character_right: string | null
  background_pattern: string | null
}

export interface LandingAbout {
  id: string
  title: string
  body: string
  quote_text: string
  stats: StatItem[]
}

export interface StatItem {
  number: string
  label: string
  gradient: string
}

export interface LandingNavLink {
  id: string
  label: string
  href: string
  sort: number
  status: string
}

// Tamaño/presentación de un producto (repeater `sizes` en Directus)
export interface ProductSize {
  /** cantidad, p. ej. "10" */
  value: string
  /** unidad, p. ej. "oz" */
  unit: string
  /** precio para este tamaño, p. ej. "$10.000" */
  price: string
}

// Menú unificado: misma colección que usa /americanfest
// (americanfest_viscocity_products)
export interface MenuProduct {
  id: string
  name: string
  description: string
  category: string
  character_image: string | null
  /** hex (#1e1e2e) o gradiente tailwind (from-… to-…) */
  bg_color: string
  /** precio único (legacy); se usa solo si `sizes` está vacío */
  price: string | null
  sizes: ProductSize[] | null
  sort: number
  status: string
}

export interface EventAnnouncement {
  id: number
  enabled: boolean
  text: string
  link: string
}

export interface LandingCharacter {
  id: string
  name: string
  image: string | null
  bg_color: string
  sort: number
}

export interface LandingCta {
  id: string
  headline: string
  subtext: string
  button_text: string
  button_url: string
}

export interface LandingFooter {
  id: string
  tagline: string
  show_navigation: boolean
  show_contact: boolean
  show_social: boolean
  extra_text: string | null
}

export interface DirectusResponse<T> {
  data: T
}
