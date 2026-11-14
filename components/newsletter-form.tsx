"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface NewsletterFormProps {
  variant?: "solid" | "translucent"
}

export function NewsletterForm({ variant = "solid" }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    toast.success("Welcome to the Olea glow!", {
      description: `Subscribed ${email} for exclusive skincare tips and offers.`,
    })
    setEmail("")
  }

  if (subscribed) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
        <CheckCircle2 className="w-4 h-4" />
        Thank you for subscribing! Check your inbox for 10% off (code: OLEA10).
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address for newsletter"
        className={
          variant === "translucent"
            ? "flex-1 min-w-0 w-full px-4 py-3 bg-white/20 rounded-full border border-white/30 text-white placeholder:text-white/75 focus:outline-none focus:ring-2 focus:ring-white/40"
            : "newsletter-input text-gray-800"
        }
      />
      <Button type="submit" className="newsletter-button h-auto shrink-0">
        Subscribe
      </Button>
    </form>
  )
}
