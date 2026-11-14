"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  ShoppingBag,
  Sparkles,
  Wallet,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartItem, useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"

interface PlacedOrder {
  orderNumber: string
  customerName: string
  email: string
  address: string
  city: string
  postcode: string
  country: string
  paymentMethod: string
  items: CartItem[]
  subtotal: number
  discountAmount: number
  shipping: number
  total: number
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    promoCode,
    discountAmount,
    shipping,
    total,
    isHydrated,
    clearCart,
  } = useCart()

  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "express">("card")
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    postcode: "",
    country: "AU",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    const orderNumber = `OLEA-${Math.floor(100000 + Math.random() * 900000)}`
    setPlacedOrder({
      orderNumber,
      customerName: form.fullName,
      email: form.email,
      address: form.address1,
      city: form.city,
      postcode: form.postcode,
      country: form.country,
      paymentMethod:
        paymentMethod === "card"
          ? "Credit / Debit Card"
          : paymentMethod === "paypal"
            ? "PayPal"
            : "Apple Pay / Google Pay",
      items: [...items],
      subtotal,
      discountAmount,
      shipping,
      total,
    })
    clearCart()
    toast.success("Order placed successfully!", {
      description: `Order #${orderNumber} has been confirmed.`,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-28 pb-20 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="container mx-auto px-6">
          {placedOrder ? (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-10 md:p-12 text-center shadow-primary-lg mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-white/80 text-xs uppercase tracking-widest mb-2">
                  Order Confirmed
                </p>
                <h1 className="text-3xl md:text-4xl font-light mb-3">
                  Thank you, {placedOrder.customerName}!
                </h1>
                <p className="text-white/90 text-base mb-6">
                  We&apos;ve sent an order confirmation to{" "}
                  <span className="font-medium">{placedOrder.email}</span>.
                </p>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 inline-block text-left">
                  <p className="text-sm font-medium">
                    Order #{placedOrder.orderNumber}
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    Estimated delivery: 3–5 business days • {placedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-teal-100 shadow-sm space-y-6">
                <h2 className="text-xl font-medium text-gray-800">
                  Order Details
                </h2>
                <div className="divide-y divide-teal-50">
                  {placedOrder.items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="py-3 flex items-center justify-between gap-4 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-teal-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping to</span>
                    <span className="text-gray-800 text-right">
                      {placedOrder.address}, {placedOrder.city} {placedOrder.postcode}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <span>
                      {placedOrder.shipping === 0
                        ? "FREE"
                        : formatPrice(placedOrder.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-teal-600 pt-2 border-t border-teal-50">
                    <span>Total Paid</span>
                    <span>{formatPrice(placedOrder.total)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="btn-primary flex-1 h-auto">
                    <Link href="/shop">
                      Continue Shopping
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild className="btn-secondary flex-1 h-auto">
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : !isHydrated ? (
            <div className="max-w-xl mx-auto text-center py-20 text-gray-500">
              Loading checkout...
            </div>
          ) : items.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-16 px-8 bg-white rounded-3xl border border-teal-100 shadow-lg shadow-teal-100/40">
              <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-teal-600" />
              </div>
              <h1 className="text-3xl font-light text-gray-800 mb-3">
                Your bag is empty
              </h1>
              <p className="text-gray-600 mb-8">
                Add your favorite botanical skincare items before checking out.
              </p>
              <Button asChild className="btn-primary h-auto">
                <Link href="/shop">
                  Browse Shop
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="mb-10">
                <p className="text-teal-600 text-xs uppercase tracking-wider font-medium mb-2">
                  Secure Checkout
                </p>
                <h1 className="text-3xl md:text-4xl font-light text-gray-800">
                  Complete Your Order
                </h1>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Billing & Payment Form */}
                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-3 min-w-0 bg-white rounded-3xl p-6 md:p-8 border border-teal-100 shadow-sm space-y-8"
                >
                  <div className="space-y-5">
                    <h2 className="text-xl font-medium text-gray-800">
                      1. Shipping &amp; Billing Details
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                          placeholder="Sarah Mitchell"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                          placeholder="sarah@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="+61 412 345 678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address1"
                        value={form.address1}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                        placeholder="123 Botany Street"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                          placeholder="Sydney"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Postcode
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          value={form.postcode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                          placeholder="2000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Country
                        </label>
                        <select
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                          required
                        >
                          <option value="AU">Australia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4 border-t border-teal-50 pt-6">
                    <h2 className="text-xl font-medium text-gray-800">
                      2. Payment Method
                    </h2>

                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { id: "card" as const, label: "Card", icon: CreditCard },
                        { id: "paypal" as const, label: "PayPal", icon: Wallet },
                        { id: "express" as const, label: "Apple / GPay", icon: Sparkles },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border text-sm font-medium transition-all ${
                            paymentMethod === opt.id
                              ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm"
                              : "border-gray-200 text-gray-600 hover:border-teal-300"
                          }`}
                        >
                          <opt.icon className="w-4 h-4" />
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-2 bg-teal-50/40 p-5 rounded-2xl border border-teal-100">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Card Number (Demo)
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={form.cardNumber}
                            onChange={handleChange}
                            required
                            placeholder="4242 •••• •••• 4242"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              value={form.expiry}
                              onChange={handleChange}
                              required
                              placeholder="MM/YY"
                              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              CVC
                            </label>
                            <input
                              type="text"
                              name="cvc"
                              value={form.cvc}
                              onChange={handleChange}
                              required
                              placeholder="123"
                              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="btn-primary w-full h-auto text-base">
                    <Lock className="mr-2 w-4 h-4" />
                    Place Order — {formatPrice(total)}
                  </Button>
                </form>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-2 min-w-0 bg-white rounded-3xl p-6 md:p-8 border border-teal-100 shadow-lg shadow-teal-100/40 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium text-gray-800">
                      Order Summary
                    </h2>
                    <Link
                      href="/cart"
                      className="text-xs text-teal-600 hover:underline"
                    >
                      Edit Bag
                    </Link>
                  </div>

                  <div className="divide-y divide-teal-50 max-h-80 overflow-y-auto pr-1">
                    {items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="py-3 flex items-center gap-3 text-sm"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty {quantity} × {formatPrice(product.price)}
                          </p>
                        </div>
                        <span className="font-medium text-gray-800">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm border-t border-teal-100 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
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

                  <p className="text-xs text-gray-400 text-center">
                    Encrypted 128-bit SSL demo checkout. No real payment is charged.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
