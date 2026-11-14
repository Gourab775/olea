"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  CheckCircle2,
  ChevronDown,
  CreditCard,
  ShieldCheck,
  Wallet,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsletterForm } from "@/components/newsletter-form"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We currently ship across Australia, New Zealand, the United Kingdom, Canada, and the United States. International shipping rates and delivery windows are calculated at checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. We accept returns within 30 days of delivery for unopened, unused products in their original packaging. Contact hello@olea.com.au for a return authorization.",
  },
  {
    question: "Are your products suitable for sensitive skin?",
    answer:
      "Yes. Our formulas are crafted without harsh sulfates, parabens, or synthetic fragrances, making them gentle for sensitive skin. We always recommend patch testing before full application.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Within Australia: 3–5 business days (Express: 1–2 days). International: 7–14 business days. Standard shipping is free on all orders over £50.",
  },
]

export default function ContactPage() {
  const [messageSent, setMessageSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessageSent(true)
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    })
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteHeader />

      {/* Contact Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6">Get in Touch</h1>
            <p className="text-white/90 text-lg mb-8">
              Have questions about our botanical skincare or need help with an order?
              We&apos;d love to hear from you.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mx-auto max-w-lg">
              <h2 className="text-xl font-light text-white mb-2">Newsletter</h2>
              <p className="text-white/85 text-sm mb-6">
                Subscribe for skincare tips, exclusive offers, and new product launches.
              </p>
              <NewsletterForm variant="translucent" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-title mb-8">Send Us a Message</h2>

            <form
              className="space-y-6 bg-teal-50/30 p-8 rounded-3xl border border-teal-100"
              onSubmit={handleContactSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Sarah Mitchell"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="sarah@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Order Support</option>
                  <option value="press">Press / Media</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button type="submit" className="btn-primary w-full h-auto">
                Send Message
              </Button>
            </form>

            {messageSent && (
              <div className="mt-6 p-6 bg-teal-50 border border-teal-200 rounded-2xl text-center flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <p className="text-teal-800 font-medium text-sm">
                  Your message has been sent! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-10">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div
                    key={faq.question}
                    className="bg-white rounded-2xl border border-teal-100 overflow-hidden shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full flex justify-between items-center p-6 text-left hover:text-teal-600 transition-colors"
                    >
                      <h3 className="text-lg font-light text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-teal-500 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-teal-50 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Delivery Section */}
      <section id="shipping" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-teal-50/40 rounded-3xl p-8 border border-teal-100">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Shipping Information
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-medium text-gray-800">Australia</p>
                  <p className="text-gray-600 text-sm">
                    Standard: 3–5 business days • Express: 1–2 business days
                  </p>
                  <p className="text-teal-600 text-sm font-medium">
                    Free on orders over £50
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-800">New Zealand</p>
                  <p className="text-gray-600 text-sm">
                    Standard: 7–10 business days • Express: 3–5 business days
                  </p>
                  <p className="text-teal-600 text-sm font-medium">
                    Free on orders over £100
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-800">UK, US &amp; Canada</p>
                  <p className="text-gray-600 text-sm">
                    Standard: 7–14 business days • Express: 3–5 business days
                  </p>
                  <p className="text-teal-600 text-sm font-medium">
                    Free on orders over £150
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50/40 rounded-3xl p-8 border border-teal-100">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Payment Methods
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-gray-700 text-sm">
                    Visa, Mastercard, American Express
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-gray-700 text-sm">
                    PayPal, Apple Pay, Google Pay
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-gray-700 text-sm">
                    Secure 128-bit SSL Encrypted Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
