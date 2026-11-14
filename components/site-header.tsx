"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, ShoppingBag } from "lucide-react"
import { useMemo, useState } from "react"
import { useCart } from "@/components/cart-provider"
import { PRODUCTS, formatPrice } from "@/lib/products"

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "STORY", href: "/about" },
  { label: "CONTACT", href: "/contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, isHydrated } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ingredients.some((i) => i.toLowerCase().includes(q))
    ).slice(0, 4)
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    setSearchOpen(false)
    setMobileMenuOpen(false)
    if (q) {
      router.push(`/shop?q=${encodeURIComponent(q)}`)
    } else {
      router.push("/shop")
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-teal-100 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-light text-gray-800 hover:text-teal-500 transition-colors duration-300 tracking-wide"
          >
            Olea
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-teal-500 transition-colors duration-300 relative group ${
                    isActive ? "text-teal-600 font-medium" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-teal-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="hover:text-teal-500 transition-colors duration-300 flex items-center gap-1.5"
              aria-label="Toggle product search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            <Link
              href="/cart"
              className={`hover:text-teal-500 transition-colors duration-300 relative flex items-center gap-1.5 ${
                pathname === "/cart" ? "text-teal-600 font-medium" : ""
              }`}
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CART</span>
              {isHydrated && itemCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-semibold bg-teal-500 text-white rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-gray-600 hover:text-teal-500 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Interactive Search Drawer */}
        {searchOpen && (
          <div className="py-4 border-t border-teal-100">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 min-w-0">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search skincare, Kakadu Plum, hair serum..."
                    className="w-full min-w-0 pl-11 pr-4 py-2.5 rounded-full border border-teal-200 bg-teal-50/40 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery("")
                  }}
                  aria-label="Close search"
                  className="shrink-0 p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-3 bg-white rounded-2xl border border-teal-100 shadow-lg divide-y divide-teal-50 overflow-hidden">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery("")
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-teal-50/70 transition-colors"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {product.category} • {product.subtitle}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-teal-600">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-teal-100 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3 text-sm text-gray-600">
              {[...navLinks, { label: `CART${itemCount > 0 ? ` (${itemCount})` : ""}`, href: "/cart" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-teal-500 transition-colors duration-300 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
