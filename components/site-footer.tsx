import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

const footerColumns = [
  {
    title: "Shop",
    items: [
      { label: "All Products", href: "/shop" },
      { label: "Face Care", href: "/shop?category=Face+Care" },
      { label: "Body Care", href: "/shop?category=Body+Care" },
      { label: "Cleansers", href: "/shop?category=Cleansers" },
      { label: "Gift Sets", href: "/shop?category=Gift+Sets" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "Mission & Values", href: "/about#values" },
      { label: "Meet the Team", href: "/about#team" },
      { label: "Get in Touch", href: "/about#contact-section" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Shipping Info", href: "/contact#shipping" },
      { label: "Returns Policy", href: "/contact#faq" },
    ],
  },
]

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Email Olea", href: "/contact", icon: Mail },
]

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="block text-3xl font-light hover:text-teal-400 transition-colors duration-300"
            >
              Olea
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium Australian skincare crafted with native botanicals for radiant, healthy skin.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const isExternal = social.href.startsWith("http")
                return isExternal ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="social-icon text-gray-300 hover:text-white"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="social-icon text-gray-300 hover:text-white"
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="font-medium text-lg">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Olea. All rights reserved. Crafted with botanicals in Australia.
          </p>
          <p className="text-gray-500 text-xs">
            Free shipping on orders over £50 • 30-day returns
          </p>
        </div>
      </div>
    </footer>
  )
}
