"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Leaf, SlidersHorizontal, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { NewsletterForm } from "@/components/newsletter-form"
import {
  CATEGORIES,
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  ProductCategory,
} from "@/lib/products"
import { Button } from "@/components/ui/button"

type SortOption = "featured" | "price-asc" | "price-desc" | "rating"

function ShopCatalog() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialQuery = searchParams.get("q") ?? ""

  const [selectedCategory, setSelectedCategory] = useState<"All" | ProductCategory>(
    CATEGORIES.includes(initialCategory as "All" | ProductCategory)
      ? (initialCategory as "All" | ProductCategory)
      : "All"
  )
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [veganOnly, setVeganOnly] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("featured")

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat && CATEGORIES.includes(cat as "All" | ProductCategory)) {
      setSelectedCategory(cat as "All" | ProductCategory)
    } else if (!cat) {
      setSelectedCategory("All")
    }
    const q = searchParams.get("q")
    if (q !== null) {
      setSearchQuery(q)
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false
      }
      if (veganOnly && !product.isVegan) {
        return false
      }
      if (q) {
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.ingredients.some((i) => i.toLowerCase().includes(q))
        if (!matches) return false
      }
      return true
    })

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.price - b.price)
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.price - a.price)
    }
    if (sortBy === "rating") {
      return [...list].sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [selectedCategory, veganOnly, searchQuery, sortBy])

  const resetFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
    setVeganOnly(false)
    setSortBy("featured")
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="pt-28 pb-14 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-teal-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-5 right-10 w-56 h-56 bg-cyan-300/30 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <p className="text-teal-600 text-xs sm:text-sm uppercase tracking-wider font-medium mb-3">
            Australian Botanical Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Shop Natural Skincare
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Formulated with wild-harvested Kakadu Plum, Tasmanian Sea Kelp, and organic botanicals for visible glow.
          </p>
          <div className="inline-flex flex-wrap justify-center items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-teal-200 text-sm text-teal-700 shadow-sm max-w-full">
            <Sparkles className="w-4 h-4 text-teal-500" />
            Free standard shipping on orders over £{FREE_SHIPPING_THRESHOLD} • Use code{" "}
            <span className="font-semibold">OLEA10</span> for 10% off
          </div>
        </div>
      </section>

      {/* Filters & Catalog */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          {/* Controls */}
          <div className="bg-teal-50/50 border border-teal-100 rounded-3xl p-5 md:p-6 mb-10 space-y-5">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product, concern, or ingredient..."
                  aria-label="Search products"
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-teal-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Vegan Toggle & Sort */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVeganOnly((prev) => !prev)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all ${
                    veganOnly
                      ? "bg-teal-500 text-white border-teal-500 shadow-sm"
                      : "bg-white text-gray-700 border-teal-200 hover:border-teal-400"
                  }`}
                >
                  <Leaf className="w-4 h-4" />
                  100% Vegan Only
                </button>

                <div className="inline-flex items-center gap-2 bg-white border border-teal-200 rounded-full px-4 py-2 text-sm text-gray-700">
                  <SlidersHorizontal className="w-4 h-4 text-teal-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort products"
                    className="bg-transparent focus:outline-none text-sm text-gray-700 cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-teal-100/80">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      active
                        ? "bg-teal-500 text-white shadow-sm shadow-teal-200"
                        : "bg-white text-gray-600 hover:bg-teal-100/70 hover:text-teal-700 border border-teal-100"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
              <span className="ml-auto text-xs text-gray-500">
                Showing {filteredProducts.length} of {PRODUCTS.length} products
              </span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-teal-50/40 rounded-3xl border border-teal-100">
              <p className="text-xl font-light text-gray-800 mb-2">
                No products matched your filters
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Try clearing your search or selecting a different skincare category.
              </p>
              <Button onClick={resetFilters} className="btn-primary h-auto">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteHeader />
      <Suspense
        fallback={
          <div className="pt-32 pb-20 text-center text-gray-500">
            Loading Olea collection...
          </div>
        }
      >
        <ShopCatalog />
      </Suspense>

      {/* Newsletter Section */}
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
