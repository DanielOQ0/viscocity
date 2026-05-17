import { type Category, categoryLabels } from '@/lib/data/products'

const colors: Record<Category, string> = {
  granizados:
    'bg-brand-orange/20 text-brand-orange border border-brand-orange/40',
  sodas:
    'bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40',
  smoothies:
    'bg-green-500/20 text-green-400 border border-green-500/40',
}

export function Badge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${colors[category]}`}
    >
      {categoryLabels[category]}
    </span>
  )
}
