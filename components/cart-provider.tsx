"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  FREE_SHIPPING_THRESHOLD,
  Product,
  STANDARD_SHIPPING_COST,
  getProductById,
} from "@/lib/products"

export interface CartItem {
  product: Product
  quantity: number
}

interface StoredCart {
  items: { id: string; quantity: number }[]
  promoCode: string | null
}

const PROMO_CODES: Record<string, number> = {
  OLEA10: 0.1,
  GLOW15: 0.15,
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  promoCode: string | null
  discountAmount: number
  shipping: number
  total: number
  amountToFreeShipping: number
  isHydrated: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyPromoCode: (code: string) => { ok: boolean; message: string }
  removePromoCode: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "olea_cart_v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as StoredCart
        if (Array.isArray(parsed.items)) {
          const restored: CartItem[] = []
          for (const entry of parsed.items) {
            const product = getProductById(entry.id)
            if (product && entry.quantity > 0) {
              restored.push({ product, quantity: entry.quantity })
            }
          }
          setItems(restored)
        }
        if (parsed.promoCode && PROMO_CODES[parsed.promoCode]) {
          setPromoCode(parsed.promoCode)
        }
      }
    } catch {
      // Ignore malformed localStorage data
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    try {
      const payload: StoredCart = {
        items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
        promoCode,
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // Ignore storage errors
    }
  }, [items, promoCode, isHydrated])

  const addItem = (product: Product, quantity = 1) => {
    if (quantity <= 0) return
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setPromoCode(null)
  }

  const applyPromoCode = (rawCode: string) => {
    const normalized = rawCode.trim().toUpperCase()
    if (!normalized) {
      return { ok: false, message: "Please enter a promo code." }
    }
    if (!PROMO_CODES[normalized]) {
      return {
        ok: false,
        message: "Invalid code. Try OLEA10 (10% off) or GLOW15 (15% off).",
      }
    }
    setPromoCode(normalized)
    const pct = Math.round(PROMO_CODES[normalized] * 100)
    return { ok: true, message: `${normalized} applied (${pct}% off)!` }
  }

  const removePromoCode = () => {
    setPromoCode(null)
  }

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    const discountRate = promoCode ? PROMO_CODES[promoCode] ?? 0 : 0
    const discountAmount = subtotal * discountRate
    const discountedSubtotal = Math.max(0, subtotal - discountAmount)
    const shipping =
      items.length === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING_COST
    const total = discountedSubtotal + shipping
    const amountToFreeShipping = Math.max(
      0,
      FREE_SHIPPING_THRESHOLD - discountedSubtotal
    )

    return {
      itemCount,
      subtotal,
      discountAmount,
      shipping,
      total,
      amountToFreeShipping,
    }
  }, [items, promoCode])

  return (
    <CartContext.Provider
      value={{
        items,
        ...totals,
        promoCode,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return ctx
}
