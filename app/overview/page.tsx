"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OverviewPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      if (elementId === "footer") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      } else {
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <Link
          href="/"
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${
            isScrolled ? "ml-4" : ""
          }`}
        >
          <img
            src="/kayzo-logo-white.png"
            alt="Kayzo"
            className="h-8 w-auto"
          />
        </Link>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "/#who-are-we"
            }}
          >
            <span className="relative z-20">Who are we</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "/#what-we-offer"
            }}
          >
            <span className="relative z-20">What we offer</span>
          </a>
          <Link
            href="/overview"
            className="relative px-4 py-2 text-foreground transition-colors cursor-pointer"
          >
            <span className="relative z-20">Overview</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              window.location.href = "/#footer"
            }}
            className="font-medium transition-colors hover:text-foreground text-muted-foreground cursor-pointer inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-background/50"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              window.location.href = "/#contact"
            }}
            className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] px-4 py-2"
            aria-label="Send us a message"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </header>

      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2"
        >
          <img
            src="/kayzo-logo-white.png"
            alt="Kayzo"
            className="h-7 w-auto"
          />
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <a
                href="/#who-are-we"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Who are we
              </a>
              <a
                href="/#what-we-offer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                What we offer
              </a>
              <Link
                href="/overview"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left px-4 py-3 text-lg font-medium text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Overview
              </Link>
              <div className="border-t border-border/50 pt-4 mt-4 flex flex-row items-center justify-center gap-4">
                <a
                  href="/#footer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </a>
                <a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg font-bold text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Message</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 text-balance">Company Overview</h1>

          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p>
                We are dedicated to providing innovative solutions that help businesses reach their full potential. Our
                team of experts works tirelessly to deliver exceptional services that drive growth and success.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-semibold text-foreground mb-4">What We Do</h2>
              <p>
                Our comprehensive suite of services is designed to meet the diverse needs of modern businesses. From
                strategic consulting to hands-on implementation, we partner with our clients every step of the way to
                ensure lasting results and measurable impact.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-semibold text-foreground mb-4">Our Values</h2>
              <ul className="space-y-3 list-disc list-inside">
                <li>Innovation and creativity in everything we do</li>
                <li>Commitment to excellence and quality</li>
                <li>Building lasting partnerships with our clients</li>
                <li>Continuous learning and improvement</li>
                <li>Transparency and integrity in all our dealings</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-semibold text-foreground mb-4">Looking Forward</h2>
              <p>
                As we continue to grow and evolve, our focus remains on delivering exceptional value to our clients and
                pushing the boundaries of what's possible. We're excited about the future and the opportunities it
                brings to make a meaningful impact in the industries we serve.
              </p>
            </motion.section>
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/#contact">
              <Button className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:-translate-y-0.5 transition-all duration-200">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
