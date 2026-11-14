"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, ShoppingBag, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Product, formatPrice } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    setJustAdded(true)
    toast.success(`${product.name} added to your bag`, {
      description: `${product.subtitle} • ${formatPrice(product.price)}`,
      action: {
        label: "View Bag",
        onClick: () => router.push("/cart"),
      },
    })
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl shadow-teal-200/40 border border-teal-100/70 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-teal-50">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-teal-700 shadow-sm">
            {product.badge}
          </span>
        )}
        {product.isVegan && (
          <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-500/90 text-white">
            Vegan
          </span>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-teal-600 uppercase tracking-wider font-medium">
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Star className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
              {product.rating.toFixed(1)} ({product.reviews})
            </span>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-medium text-lg text-gray-800 group-hover:text-teal-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.subtitle}</p>
          </Link>
        </div>

        <div className="pt-2 border-t border-teal-50 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-gray-800">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            size="sm"
            className="rounded-full bg-teal-500 hover:bg-teal-600 text-white px-4 h-9 shadow-sm shadow-teal-200/50 transition-all"
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 mr-1.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
