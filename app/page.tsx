"use client"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { PRODUCTS } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Leaf, Droplets, Shield, Clock, Sparkles, Heart, ArrowRight, Star } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    setIsVisible(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const featuredProducts = PRODUCTS.slice(0, 4)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 min-h-screen flex items-center pt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="space-y-6">
                <p className="text-teal-600 text-sm uppercase tracking-wider font-medium">
                  Premium Australian Skincare
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight">
                  Celebrating
                  <br />
                  <span className="text-teal-500 relative">
                    Australian Nature
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                      <path
                        d="M0 6C50 2 100 10 150 6C200 2 250 10 300 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="animate-draw"
                      />
                    </svg>
                  </span>
                </h1>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Discover our range of premium skincare products crafted with native Australian botanicals for radiant,
                healthy skin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary group h-auto">
                  <Link href="/shop">
                    SEE HYDRATING RANGE
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button asChild className="btn-secondary h-auto">
                  <Link href="/about">WATCH STORY</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Trusted by 10,000+ customers</p>
              </div>
            </div>

            <div
              className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-3xl shadow-primary-lg">
                  <Image
                    src="/images/hero-products.jpg"
                    alt="Premium skincare products with pink flowers and facial tools"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating elements */}
              <div className="floating-element -top-4 -right-4">
                <Leaf className="w-6 h-6 text-teal-500" />
              </div>
              <div className="floating-element -bottom-4 -left-4 animation-delay-500">
                <Sparkles className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Natural skincare with scientifically proven results</h2>
            <p className="section-subtitle">
              Harness the power of Australian botanicals with our carefully formulated products.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {[
              { icon: Shield, title: "NO NASTY\nCHEMICALS", delay: "0ms" },
              { icon: Leaf, title: "VEGAN\nINGREDIENTS", delay: "100ms" },
              { icon: Droplets, title: "CRUELTY\nFREE", delay: "200ms" },
              { icon: Clock, title: "FAST\nDELIVERY", delay: "300ms" },
              { icon: Sparkles, title: "CLINICALLY\nTESTED", delay: "400ms" },
              { icon: Heart, title: "MADE WITH\nLOVE", delay: "500ms" },
            ].map((feature, index) => (
              <Link
                key={index}
                href="/about"
                className="feature-card group block"
                style={{ animationDelay: feature.delay }}
              >
                <div className="icon-container">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="feature-text">{feature.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50/70 to-cyan-50/70">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-teal-600 text-sm uppercase tracking-wider font-medium mb-2">
                Curated Rituals
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-gray-800">
                Customer Bestsellers
              </h2>
            </div>
            <Button asChild className="btn-secondary h-auto self-start md:self-auto">
              <Link href="/shop">
                VIEW ALL PRODUCTS
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-primary-lg">
                <Image
                  src="/images/product-flat-lay.jpg"
                  alt="Minimalist skincare products with natural elements"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <p className="text-teal-600 text-sm uppercase tracking-wider font-medium">Our Story</p>
                <h2 className="section-title text-left">Crafted with Care</h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Founded with Australian native botanicals, our products are carefully crafted to provide exceptional
                results while respecting the environment and your skin&apos;s natural balance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Leaf,
                    title: "Natural",
                    desc: "Only the finest natural ingredients sourced responsibly",
                  },
                  {
                    icon: Droplets,
                    title: "Hydrating",
                    desc: "Deep hydration that lasts all day long",
                  },
                  {
                    icon: Sparkles,
                    title: "Effective",
                    desc: "Proven results you can see and feel",
                  },
                ].map((item, index) => (
                  <div key={index} className="benefit-card group">
                    <div className="icon-container">
                      <item.icon className="w-8 h-8 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="btn-primary group h-auto">
                <Link href="/about">
                  LEARN MORE
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="section-title">Natural skincare with scientifically proven results</h2>
            <p className="section-subtitle">
              Every ingredient is carefully selected for its proven benefits and sustainable sourcing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Leaf,
                title: "NO NASTIES",
                desc: "Australian Native Botanicals, Organic Aloe Vera, Natural Vitamin E. No harsh chemicals, parabens or sulfates.",
              },
              {
                icon: Sparkles,
                title: "POWERFUL ACTIVES",
                desc: "A carefully curated selection of active ingredients that deliver real results for your skin.",
              },
              {
                icon: Shield,
                title: "CLINICALLY TESTED & PROVEN",
                desc: "Dermatologically tested and clinically proven to deliver visible results in just 4 weeks.",
              },
              {
                icon: Heart,
                title: "SUSTAINABLY SOURCED",
                desc: "Ethically sourced ingredients that are kind to your skin and the environment.",
              },
            ].map((item, index) => (
              <div key={index} className="ingredient-card group">
                <div className="icon-container-lg">
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="ingredient-title">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <Button asChild className="btn-primary group h-auto">
            <Link href="/shop">
              SHOP NOW
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Categories */}
      <section
        id="shop"
        className="py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-teal-300/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-teal-600 text-sm uppercase tracking-wider font-medium">Collections</p>
                <h2 className="section-title text-left">Luxury Skincare</h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Discover our complete range of luxury skincare essentials, from cleansers to moisturizers, all crafted
                with premium ingredients for every skin type and concern.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    color: "bg-teal-100 text-teal-600",
                    icon: Sparkles,
                    title: "FACE CARE",
                    category: "Face Care",
                    desc: "Complete facial care routine",
                    hover: "group-hover:bg-teal-200",
                  },
                  {
                    color: "bg-cyan-100 text-cyan-600",
                    icon: Heart,
                    title: "BODY CARE",
                    category: "Body Care",
                    desc: "Nourish and hydrate your body",
                    hover: "group-hover:bg-cyan-200",
                  },
                  {
                    color: "bg-emerald-100 text-emerald-600",
                    icon: Droplets,
                    title: "CLEANSERS",
                    category: "Cleansers",
                    desc: "Gentle yet effective cleansing",
                    hover: "group-hover:bg-emerald-200",
                  },
                ].map((category, index) => (
                  <Link
                    key={index}
                    href={`/shop?category=${encodeURIComponent(category.category)}`}
                    className="category-card group block"
                  >
                    <div className={`category-icon ${category.color} ${category.hover}`}>
                      <category.icon className="w-7 h-7" />
                    </div>
                    <h3 className="category-title">{category.title}</h3>
                    <p className="text-xs text-gray-600">{category.desc}</p>
                  </Link>
                ))}
              </div>

              <Button asChild className="btn-secondary group h-auto">
                <Link href="/shop">
                  VIEW ALL
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-primary-lg">
                <Image
                  src="/images/luxury-collection.jpg"
                  alt="Luxury white and gold skincare collection"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="section-title">Discover the difference premium botanicals can make to your skin</h2>
            <p className="section-subtitle">
              Experience the power of nature with our premium skincare collection designed for every skin type.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                image: "/images/pink-collection.jpg",
                href: "/products/gro-collection",
                title: "GRO COLLECTION",
                subtitle: "Hair & Scalp Care",
              },
              {
                image: "/images/modern-skincare.jpg",
                href: "/products/essentials",
                title: "ESSENTIALS",
                subtitle: "Daily Skincare",
              },
              {
                image: "/images/luxury-collection.jpg",
                href: "/products/luxury",
                title: "LUXURY",
                subtitle: "Premium Care",
              },
            ].map((collection, index) => (
              <Link key={index} href={collection.href} className="collection-card group">
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="collection-overlay">
                  <div className="collection-content">
                    <h3 className="collection-title">{collection.title}</h3>
                    <p className="collection-subtitle">{collection.subtitle}</p>
                  </div>
                  <div className="collection-arrow">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Button asChild className="btn-primary group h-auto">
            <Link href="/shop">
              SHOP NOW
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Stay in the glow</h2>
            <p className="text-white/90 text-lg">
              Subscribe to our newsletter for skincare tips, exclusive offers, and new product launches.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
