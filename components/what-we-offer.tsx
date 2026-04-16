"use client"

import { motion } from "framer-motion"
import { Sparkles, Cloud, MessageSquare, Plug, Building2, Users, Package } from "lucide-react"

const services = [
  {
    icon: Cloud,
    title: "Built for the cloud",
    description:
      "A hosted platform your team can reach from the trailer or the office—no wrestling with installs on a single machine.",
  },
  {
    icon: MessageSquare,
    title: "Chat-first web app",
    description:
      "Interact with Kayzo the way you already talk through work: natural conversation in the browser, tuned to construction workflows.",
  },
  {
    icon: Plug,
    title: "Supplier integrations",
    description:
      "Built-in connections to Lowe's, Home Depot, and more—so answers tie back to real catalogs, SKUs, and sourcing—not generic web fluff.",
  },
  {
    icon: Building2,
    title: "For builders & GCs",
    description:
      "Purpose-built for general contractors and builders coordinating trades, schedules, materials, and job-site reality.",
  },
  {
    icon: Package,
    title: "Procurement-aware help",
    description:
      "Bring purchasing and material questions into the same thread as planning and coordination, with integrations doing the heavy lifting.",
  },
  {
    icon: Users,
    title: "Aligned teams",
    description:
      "Keep estimators, supers, and field leads on the same page with one system of engagement instead of scattered threads and spreadsheets.",
  },
]

export function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="relative py-24 px-4">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#e78a53]" />
            <span className="text-sm font-medium text-white/80">Services</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            What we offer
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A conversational layer on top of the tools builders already need—cloud-hosted, integration-backed, and meant for how jobs actually run.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#e78a53]/30 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/5 border border-[#e78a53]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#e78a53]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e78a53]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
