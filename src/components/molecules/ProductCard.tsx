import Image from 'next/image'
import { type Product } from '@/lib/data/products'
import { Badge } from '@/components/atoms/Badge'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-brand-orange/20"
      style={{ backgroundColor: product.bgColor }}
    >
      {/* Character illustration */}
      <div className="relative h-52 flex items-end justify-center pt-4 overflow-hidden">
        <Image
          src={product.character}
          alt={product.name}
          width={180}
          height={200}
          className="object-contain object-bottom group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
        />
      </div>

      {/* Card body */}
      <div className="p-5 bg-brand-purple/75 backdrop-blur-sm border-t border-white/10">
        <Badge category={product.category} />
        <h3 className="font-milker text-xl text-white mt-3 mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">{product.description}</p>
      </div>
    </article>
  )
}
