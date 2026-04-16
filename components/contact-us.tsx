"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setSubmitStatus("success")
      setFormData({ name: "", companyName: "", email: "", phone: "" })

      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="mt-12 mb-32 w-full">
      <div className="mx-auto max-w-4xl rounded-[40px] border border-black/5 dark:border-white/20 p-2 shadow-sm">
        <div className="relative mx-auto min-h-[500px] max-w-4xl overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 bg-primary p-8 md:p-12 shadow-sm">
          {/* Subtle radial glow from center */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 64, 23, 0.1), transparent 70%)",
            }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                Early Access
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Join the builder &amp; GC waitlist</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/70">
                Tell us who you are and we&apos;ll reach out as Kayzo opens access to its cloud assistant for builders and
                general contractors—chat in the web app, supplier integrations, and workflows tuned to how you run jobs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm font-medium text-white">
                    Company name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-black/20 p-4 text-sm text-white/70">
                We&apos;re talking with builders and GCs who want one conversational place to coordinate work—with hooks into
                Lowe&apos;s, Home Depot, and more—instead of bouncing between portals and spreadsheets. Joining the waitlist
                lets us reach out when spots open.
              </div>

              {submitStatus === "success" && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-center text-white">
                  You&apos;re on the waitlist. We&apos;ll be in touch soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/20 p-4 text-center text-white">
                  Something went wrong. Please try again or reach out to us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-lg font-bold text-primary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                    Joining waitlist...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Join Waitlist
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
