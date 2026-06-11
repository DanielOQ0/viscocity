const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus.viscocity.com.co'

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
}

async function fetchItems<T>(collection: string, params?: string): Promise<T> {
  const url = `${DIRECTUS_URL}/items/${collection}${params ? `?${params}` : ''}`
  const res = await fetch(url, { headers, next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Directus ${collection}: ${res.statusText}`)
  const json = await res.json()
  return json.data as T
}

export function getAssetUrl(fileId: string | null): string | null {
  if (!fileId) return null
  return `${DIRECTUS_URL}/assets/${fileId}`
}

export async function getSettings() {
  return fetchItems<Record<string, unknown>>('landing_settings')
}

export async function getHero() {
  return fetchItems<Record<string, unknown>>('landing_hero')
}

export async function getAbout() {
  return fetchItems<Record<string, unknown>>('landing_about')
}

export async function getCta() {
  return fetchItems<Record<string, unknown>>('landing_cta')
}

export async function getFooter() {
  return fetchItems<Record<string, unknown>>('landing_footer')
}

export async function getNavLinks() {
  return fetchItems<Array<Record<string, unknown>>>('landing_nav_links', 'sort=sort&filter[status][_eq]=published')
}

export async function getCategories() {
  return fetchItems<Array<Record<string, unknown>>>('landing_categories', 'sort=sort&filter[status][_eq]=published')
}

export async function getProducts() {
  return fetchItems<Array<Record<string, unknown>>>('landing_products', 'sort=sort&filter[status][_eq]=published&fields=*,category.id,category.name,category.slug')
}

export async function getCharacters() {
  return fetchItems<Array<Record<string, unknown>>>('landing_characters', 'sort=sort&filter[status][_eq]=published')
}

// American Fest
export async function getAmericanFestSettings() {
  return fetchItems<Record<string, unknown>>('americanfest_settings')
}

export async function getAmericanFestViscocityProducts() {
  return fetchItems<Array<Record<string, unknown>>>('americanfest_viscocity_products', 'sort=sort&filter[status][_eq]=published')
}

export async function getAmericanFestJAProducts() {
  return fetchItems<Array<Record<string, unknown>>>('americanfest_ja_products', 'sort=sort&filter[status][_eq]=published')
}
