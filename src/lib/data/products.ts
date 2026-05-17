export type Category = 'granizados' | 'sodas' | 'smoothies'

export interface Product {
  id: string
  name: string
  description: string
  category: Category
  character: string
  bgColor: string
}

export const products: Product[] = [
  // ── Granizados ──────────────────────────────────────────────
  {
    id: 'granizado-mojito',
    name: 'Mojito Blast',
    description: 'Granizado de menta y limón con actitud callejera. Refresca el alma.',
    category: 'granizados',
    character: '/images/characters/character-mojito.png',
    bgColor: '#163a16',
  },
  {
    id: 'granizado-apple',
    name: 'Apple Core',
    description: 'Granizado de manzana verde que lleva el parche al siguiente nivel.',
    category: 'granizados',
    character: '/images/characters/character-apple.png',
    bgColor: '#1e4a1e',
  },
  {
    id: 'granizado-candy',
    name: 'Candy Cherry',
    description: 'Cerezas dulces con toque diabólico. El favorito de la city.',
    category: 'granizados',
    character: '/images/characters/character-candy.png',
    bgColor: '#3d1040',
  },
  {
    id: 'granizado-golden',
    name: 'Golden Mango',
    description: 'Mango con actitud tropical y flow urbano. Puro oro en vaso.',
    category: 'granizados',
    character: '/images/characters/character-golden.png',
    bgColor: '#3a2800',
  },
  {
    id: 'granizado-mora',
    name: 'Mora Power',
    description: 'Frambuesas y mora juntas en el parche más épico de la ciudad.',
    category: 'granizados',
    character: '/images/characters/character-mora.png',
    bgColor: '#42102e',
  },
  {
    id: 'granizado-purple',
    name: 'Purple Haze',
    description: 'Mora azul con lengua afuera. El más raro y sabroso de la crew.',
    category: 'granizados',
    character: '/images/characters/character-purple.png',
    bgColor: '#0f2a38',
  },
  // ── Sodas ────────────────────────────────────────────────────
  {
    id: 'soda-city',
    name: 'City Soda',
    description: 'Soda artesanal con esencia de cítricos. Efervescente como las calles.',
    category: 'sodas',
    character: '/images/characters/character-golden.png',
    bgColor: '#3a2800',
  },
  {
    id: 'soda-urban',
    name: 'Urban Fizz',
    description: 'Soda de frutas tropicales. La vibra de la ciudad en cada burbuja.',
    category: 'sodas',
    character: '/images/characters/character-candy.png',
    bgColor: '#3d1040',
  },
  {
    id: 'soda-berry',
    name: 'Street Berry',
    description: 'Soda de frutos rojos. Directo del muro a tu vaso.',
    category: 'sodas',
    character: '/images/characters/character-mora.png',
    bgColor: '#42102e',
  },
  // ── Smoothies ────────────────────────────────────────────────
  {
    id: 'smoothie-verde',
    name: 'Parche Verde',
    description: 'Smoothie de manzana, menta y jengibre. El boost del parche.',
    category: 'smoothies',
    character: '/images/characters/character-apple.png',
    bgColor: '#1e4a1e',
  },
  {
    id: 'smoothie-tropical',
    name: 'Flow Tropical',
    description: 'Mango, piña y maracuyá. El sabor que te lleva a otro nivel.',
    category: 'smoothies',
    character: '/images/characters/character-golden.png',
    bgColor: '#3a2800',
  },
  {
    id: 'smoothie-berry',
    name: 'Berry Street',
    description: 'Mezcla de berries con base de mora azul. Antioxidante con flow.',
    category: 'smoothies',
    character: '/images/characters/character-purple.png',
    bgColor: '#0f2a38',
  },
]

export const categoryLabels: Record<Category, string> = {
  granizados: 'Granizados',
  sodas: 'Sodas',
  smoothies: 'Smoothies',
}

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Menú', href: '#menu' },
  { label: 'Galería', href: '#galeria' },
]
