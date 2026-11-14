"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Heart,
  Mail,
  MapPin,
  Phone,
  Star,
  Target,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Dr. Emma Wilson",
    initials: "EW",
    role: "Founder & Formulator",
    bio: "PhD in Pharmaceutical Sciences with 15 years in natural botanical skincare research.",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    name: "James Morrison",
    initials: "JM",
    role: "Head of Operations",
    bio: "Supply chain expert dedicated to ethical Australian sourcing and sustainable practices.",
    gradient: "from-cyan-400 to-emerald-500",
  },
  {
    name: "Sophie Chen",
    initials: "SC",
    role: "Customer Experience Lead",
    bio: "Passionate about holistic skin health, personalized rituals, and customer education.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    name: "Dr. Aarav Singh",
    initials: "AS",
    role: "Lead Botanical Scientist",
    bio: "Researcher specializing in native Australian phyto-actives and the skin microbiome.",
    gradient: "from-teal-500 to-emerald-600",
  },
]

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success("Message received!", {
      description: "Our Sydney team will reply within 24 hours.",
    })
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteHeader />

      {/* Page Header */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-teal-300/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-primary-lg">
              <Image
                src="/images/hero-products.jpg"
                alt="Olea botanical skincare collection"
                width={600}
                height={600}
                priority
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-teal-600 text-sm uppercase tracking-wider font-medium mb-2">
                  Premium Australian Skincare
                </p>
                <h1 className="text-4xl md:text-5xl font-light text-gray-800 leading-tight mb-3">
                  About Olea
                </h1>
                <p className="text-teal-600 text-lg font-light">
                  Australian Botanical Skincare crafted with care
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                ))}
                <span className="text-sm text-gray-600">4.8 average rating</span>
              </div>

              <div>
                <p className="text-2xl font-semibold text-gray-800">
                  10,000+ happy customers
                </p>
                <p className="text-sm text-gray-500">Crafted in Australia since 2020</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="btn-primary h-auto">
                  <Link href="#our-story">
                    Read Our Story
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild className="btn-secondary h-auto">
                  <Link href="/shop">Explore Shop</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-8">Our Story</h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Olea was founded in 2020 with a simple mission: to harness the extraordinary
                power of Australian botanicals for truly transformative skincare. Born from
                the red earth and golden coasts of Australia, our journey began with a
                single question: What if skincare could be both luxurious and completely
                natural?
              </p>

              <p>
                Growing up on the sunny shores of Queensland, our founder discovered the
                healing properties of native plants used in traditional botanical care for
                generations. From vitamin C-rich Kakadu Plum to soothing Aloe Vera grown in
                the Northern Territory, we knew these botanicals held the secret to healthy,
                radiant skin.
              </p>

              <p>
                Every product we create is carefully formulated in small batches, ensuring
                freshness and potency. We source our ingredients ethically, supporting
                local Australian farmers, never testing on animals, and using recyclable
                packaging wherever possible.
              </p>

              <blockquote className="mt-8 p-8 bg-teal-50 rounded-3xl border border-teal-100">
                <p className="text-lg text-gray-700 italic mb-4">
                  &ldquo;I&apos;ve used Olea for three months and my skin has never looked better.
                  The difference is incredible — my complexion is brighter, more hydrated,
                  and truly radiant.&rdquo;
                </p>
                <cite className="not-italic text-sm font-medium text-teal-700">
                  — Sarah M., Verified Customer
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section id="values" className="py-24 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="section-title">Mission, Values &amp; Standards</h2>
            <p className="section-subtitle">
              Guided by clinical rigor and deep respect for Australian ecosystems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal-100 text-center space-y-4">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To provide premium, natural skincare solutions powered by Australian
                botanicals that deliver visible results while respecting our planet.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal-100 text-center space-y-4">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800">Our Values</h3>
              <ul className="space-y-2.5 text-sm text-gray-600 text-left max-w-[200px] mx-auto">
                {["100% Cruelty-Free", "Ethically Sourced", "Clean Botanical Actives", "Small-Batch Freshness"].map(
                  (val) => (
                    <li key={val} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span>{val}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal-100 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                <Award className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800">Certifications</h3>
              <ul className="space-y-2.5 text-sm text-gray-600 text-left max-w-[200px] mx-auto">
                {["Vegan Friendly Formulas", "Leaping Bunny Aligned", "Dermatologically Tested", "Recyclable Glass & Packs"].map(
                  (cert) => (
                    <li key={cert} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span>{cert}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title mb-4">Meet Our Team</h2>
            <p className="section-subtitle mb-12">
              The formulators, researchers, and botanical experts behind Olea.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="group rounded-3xl bg-white border border-teal-100 overflow-hidden shadow-sm hover:shadow-primary-lg transition-all duration-300"
                >
                  <div
                    className={`h-44 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}
                  >
                    <div className="w-20 h-20 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-2xl font-light tracking-wider group-hover:scale-105 transition-transform duration-300">
                      {member.initials}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-teal-600 text-xs font-medium uppercase tracking-wider mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section id="contact-section" className="py-24 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto items-start">
            <div>
              <h2 className="text-3xl font-light text-gray-800 mb-6">Get in Touch</h2>

              {submitted ? (
                <div className="bg-white rounded-3xl p-8 border border-teal-100 text-center space-y-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">Thank you for reaching out!</h3>
                  <p className="text-sm text-gray-600">
                    We&apos;ve received your inquiry and will respond within 24 hours.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary h-auto"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-white p-8 rounded-3xl border border-teal-100 shadow-sm"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Sarah Mitchell"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="sarah@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option value="">Select subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Order Support</option>
                      <option value="press">Press / Media</option>
                      <option value="partnership">Retail Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full h-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-light text-gray-800 mb-6">Contact Details</h2>

              <div className="space-y-6 bg-white p-8 rounded-3xl border border-teal-100 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm">hello@olea.com.au</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600 text-sm">+61 2 9829 1234</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Headquarters</p>
                    <p className="text-gray-600 text-sm">
                      123 Botany Street
                      <br />
                      Sydney NSW 2000, Australia
                    </p>
                  </div>
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
