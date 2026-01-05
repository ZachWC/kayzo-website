"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Mail, Phone } from "lucide-react"

export function StickyFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full h-40 flex justify-center items-center bg-[#1a1a1a]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden w-full h-full flex justify-center px-12 text-center items-center py-8">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-1 text-[#e78a53]">Get in Touch</h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-base sm:text-lg">
                <a
                  href="mailto:kayzocontracts@gmail.com"
                  className="flex items-center gap-2 hover:underline cursor-pointer transition-all hover:scale-105 text-[#e78a53]"
                >
                  <Mail className="w-5 h-5" />
                  <span>kayzocontracts@gmail.com</span>
                </a>
                <a
                  href="tel:+12087897651"
                  className="flex items-center gap-2 hover:underline cursor-pointer transition-all hover:scale-105 text-[#e78a53]"
                >
                  <Phone className="w-5 h-5" />
                  <span>(208) 789-7651</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
