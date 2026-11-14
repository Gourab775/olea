"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/components/cart-provider"
import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  formatPrice,
} from "@/lib/products"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    promoCode,
    discountAmount,
    shipping,
    total,
    amountToFreeShipping,
    isHydrated,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCart()

  const [codeInput, setCodeInput] = useState("")
  const [promoFeedback, setPromoFeedback] = useState<{
    ok: boolean
    message: string
  } | null>(null)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const result = applyPromoCode(codeInput)
    setPromoFeedback(result)
    if (result.ok) {
      setCodeInput("")
    }
  }

  const shippingProgress = Math.min(
    100,
    ((subtotal - discountAmount) / FREE_SHIPPING_THRESHOLD) * 100
  )

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-28 pb-20 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 text-xs sm:text-sm uppercase tracking-wider font-medium mb-2">
              Shopping Bag
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-800">
              Your Olea Bag
            </h1>
            <p className="text-gray-600 mt-2">
              {!isHydrated
                ? "Loading your bag..."
                : itemCount === 0
                  ? "Your bag is currently empty"
                  : `${itemCount} ${itemCount === 1 ? "item" : "items"} — Total: ${formatPrice(total)}`}
            </p>
          </div>

          {!isHydrated ? (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 text-center border border-teal-100 shadow-sm">
              <p className="text-gray-500">Loading your skincare ritual...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="space-y-16">
              <div className="max-w-xl mx-auto text-center py-16 px-8 bg-white rounded-3xl border border-teal-100 shadow-lg shadow-teal-100/50">
                <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-9 h-9 text-teal-600" />
                </div>
                <h2 className="text-2xl font-light text-gray-800 mb-3">
                  Your bag is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Discover our Australian botanical skincare and hair care essentials to start your ritual.
                </p>
                <Button asChild className="btn-primary h-auto">
                  <Link href="/shop">
                    Explore Collection
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div>
                <h2 className="text-2xl font-light text-gray-800 text-center mb-8">
                  Popular Favorites
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-6 min-w-0">
                {/* Free Shipping Progress */}
                <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
                    <Truck className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    {amountToFreeShipping > 0 ? (
                      <span>
                        Add{" "}
                        <strong className="text-teal-600">
                          {formatPrice(amountToFreeShipping)}
                        </strong>{" "}
                        more to unlock{" "}
                        <strong>FREE Standard Shipping</strong>!
                      </span>
                    ) : (
                      <span className="text-teal-700 font-medium flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        You&apos;ve unlocked FREE Standard Shipping!
                      </span>
                    )}
                  </div>
                  <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, shippingProgress)}%` }}
                    />
                  </div>
                </div>

                {/* Items Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-teal-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-teal-50 pb-4">
                    <h2 className="text-xl font-medium text-gray-800">
                      Bag Items ({itemCount})
                    </h2>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-gray-500 hover:text-red-500 transition-colors underline underline-offset-4"
                    >
                      Clear Bag
                    </button>
                  </div>

                  <div className="divide-y divide-teal-50">
                    {items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center gap-4"
                      >
                        <Link
                          href={`/products/${product.id}`}
                          className="w-24 h-24 rounded-2xl overflow-hidden bg-teal-50 flex-shrink-0"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={160}
                            height={160}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-xs text-teal-600 uppercase tracking-wider font-medium">
                            {product.category}
                          </p>
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium text-gray-800 hover:text-teal-600 transition-colors block truncate"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {product.subtitle} • {product.size}
                          </p>
                          <p className="text-sm font-medium text-gray-700 pt-1">
                            {formatPrice(product.price)} each
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="inline-flex items-center bg-teal-50/70 border border-teal-100 rounded-full p-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-teal-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-sm font-medium text-gray-800">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label={`Increase quantity of ${product.name}`}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-teal-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right min-w-[72px]">
                            <p className="font-semibold text-gray-800">
                              {formatPrice(product.price * quantity)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Button asChild className="btn-secondary h-auto">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-teal-100 shadow-lg shadow-teal-100/40 space-y-6 min-w-0">
                <h2 className="text-xl font-medium text-gray-800">Order Summary</h2>

                {/* Promo Code */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-teal-600" />
                    Promo Code
                  </label>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="Try OLEA10"
                      className="flex-1 min-w-0 w-full px-4 py-2.5 text-sm border border-teal-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <Button
                      type="submit"
                      className="shrink-0 rounded-full bg-teal-500 hover:bg-teal-600 text-white px-5 h-auto py-2.5"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoFeedback && (
                    <p
                      className={`text-xs ${
                        promoFeedback.ok ? "text-teal-600" : "text-red-500"
                      }`}
                    >
                      {promoFeedback.message}
                    </p>
                  )}
                  {promoCode && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs text-teal-700">
                      <span>Code {promoCode} active</span>
                      <button
                        type="button"
                        onClick={() => {
                          removePromoCode()
                          setPromoFeedback(null)
                        }}
                        aria-label="Remove promo code"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </form>

                <div className="space-y-3 text-sm border-t border-teal-100 pt-5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-800">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({promoCode})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-teal-600 font-medium">
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-t border-teal-100 pt-4">
                    <span className="text-base font-medium text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-teal-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Button asChild className="btn-primary w-full h-auto text-center">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                <p className="text-xs text-center text-gray-400">
                  Complimentary eco-friendly packaging included with every order.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
