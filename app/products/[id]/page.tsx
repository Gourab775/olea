"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { useCart } from "@/components/cart-provider"
import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  formatPrice,
  getProductById,
} from "@/lib/products"
import { Button } from "@/components/ui/button"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-6">
          <div className="text-center max-w-md space-y-5 bg-teal-50/50 border border-teal-100 rounded-3xl p-10">
            <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-light text-gray-800">Product not found</h1>
            <p className="text-gray-600 text-sm">
              We couldn&apos;t find the skincare item you were looking for. Explore our full botanical range instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button asChild className="btn-primary h-auto">
                <Link href="/shop">Browse Shop</Link>
              </Button>
              <Button asChild className="btn-secondary h-auto">
                <Link href="/">Back Home</Link>
              </Button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAddToBag = () => {
    addItem(product, quantity)
    setJustAdded(true)
    toast.success(`Added ${quantity} × ${product.name} to your bag`, {
      description: `Subtotal: ${formatPrice(product.price * quantity)}`,
      action: {
        label: "View Bag",
        onClick: () => router.push("/cart"),
      },
    })
    setTimeout(() => setJustAdded(false), 1500)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteHeader />

      {/* Product Header */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-teal-300/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-8 flex-wrap"
          >
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-teal-600 transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-teal-600 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-primary-lg bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={650}
                  height={650}
                  priority
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {product.badge && (
                <span className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/95 text-teal-700 shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-teal-600 text-sm uppercase tracking-wider font-medium mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-5xl font-light text-gray-800 leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-teal-600 text-base font-medium">{product.subtitle}</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "fill-teal-400 text-teal-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviews} verified reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-semibold text-gray-800">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <>
                    <p className="text-base line-through text-gray-400">
                      {formatPrice(product.originalPrice)}
                    </p>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              <div className="flex flex-wrap items-center gap-2">
                {product.isVegan && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full font-medium">
                    <Leaf className="w-3.5 h-3.5" />
                    100% Vegan
                  </span>
                )}
                {product.isCrueltyFree && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Cruelty-Free
                  </span>
                )}
                <span className="px-3 py-1 bg-white/80 border border-teal-200 text-gray-700 text-xs rounded-full font-medium">
                  Size: {product.size}
                </span>
              </div>

              {/* Quantity & Add to Bag */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="inline-flex items-center justify-between bg-white border border-teal-200 rounded-full px-2 py-1.5 sm:w-36">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-gray-800 px-3" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddToBag}
                    className="btn-primary flex-1 h-auto py-4 text-sm font-medium tracking-wide"
                  >
                    {justAdded ? (
                      <>
                        <Check className="mr-2 w-4 h-4" />
                        ADDED TO BAG
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 w-4 h-4" />
                        ADD TO BAG — {formatPrice(product.price * quantity)}
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn-secondary w-full h-auto py-3.5 text-sm font-medium"
                >
                  Buy Now &amp; Express Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-600">
                <div className="flex items-center gap-2 bg-white/70 rounded-2xl px-4 py-3 border border-teal-100">
                  <Truck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>Free shipping on orders over £{FREE_SHIPPING_THRESHOLD}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 rounded-2xl px-4 py-3 border border-teal-100">
                  <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>30-day satisfaction guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light text-gray-800 mb-6">Key Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.keyBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-teal-50/70 hover:bg-teal-50 rounded-2xl border border-teal-100 transition-all"
                  >
                    <div className="w-10 h-10 mb-3 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-gray-800">{benefit}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-gray-800 mb-6">Product Details</h2>
              <div className="space-y-6 bg-gray-50/70 rounded-3xl p-8 border border-gray-100">
                <div>
                  <p className="text-teal-600 text-xs uppercase tracking-wider font-medium mb-2">
                    Key Botanical Ingredients
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {product.ingredients.join(" • ")}
                  </p>
                </div>

                <div className="border-t border-gray-200/70 pt-5">
                  <p className="text-teal-600 text-xs uppercase tracking-wider font-medium mb-2">
                    How to Use
                  </p>
                  <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
                </div>

                <div className="border-t border-gray-200/70 pt-5">
                  <p className="text-teal-600 text-xs uppercase tracking-wider font-medium mb-2">
                    Suitable For
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.skinTypes.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-white border border-teal-100 text-gray-700 text-xs rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">You Might Also Like</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pair your ritual with more of our botanical collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Stay in the glow
            </h2>
            <p className="text-white/90 text-lg">
              Subscribe to our newsletter for skincare tips, exclusive offers, and new product launches.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
