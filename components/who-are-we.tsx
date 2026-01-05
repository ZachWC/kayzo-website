"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function WhoAreWe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const founders = [
    {
      name: "Kaden Christensen, CEO",
      image: "/IMG_2216.jpeg",
      bio: "Business-focused leader responsible for setting company direction, aligning strategy with execution, and guiding long-term growth. Emphasizes clear decision-making, disciplined focus, and building a sustainable organization.",
    },
    {
      name: "Zach Christensen, CTO",
      image: "/zach2.jpeg",
      bio: "Software engineer with over four years of hands-on experience in artificial intelligence and cybersecurity, focused on building secure, scalable systems that solve real world problems in high stakes environments. Specializes in practical, security first solutions that prioritize reliability, efficiency, and long term maintainability.",
    },
    {
      name: "Tyler Delarosa, COO",
      image: "/IMG_2905.png",
      bio: "Former Air Force project manager with experience in government contracting and healthcare operations. MBA-trained, focused on practical AI automation that improves efficiency without increasing risk.",
    },
  ]

  return (
    <section id="who-are-we" className="text-foreground relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6"
      >
        {/* Section Title */}
        <h2
          className={cn(
            "via-foreground mb-8 bg-gradient-to-b from-zinc-800 to-zinc-700 bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]",
            geist.className,
          )}
        >
          Who are we
        </h2>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-4xl mb-16 text-center"
        >
          <p className="text-muted-foreground text-lg leading-relaxed">
            Add your company description here. Tell your story, share your mission, and explain what makes your company
            unique. This is your opportunity to connect with your audience and communicate your values and vision.
            Replace this text with a compelling narrative about your company's journey and purpose.
          </p>
        </motion.div>

        {/* Founders Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Founder Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl border-2 border-secondary/40 shadow-lg transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-xl group-hover:scale-105">
                <div className="aspect-square w-full max-w-[300px]">
                  <img
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    className={cn(
                      "w-full h-full object-cover",
                      index === 0 && "scale-150 object-[center_40%]",
                      index === 2 && "object-[center_30%]",
                      index === 1 && "scale-[1.75] object-[center_45%]"
                    )}
                  />
                </div>
              </div>

              {/* Founder Name */}
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">{founder.name}</h3>

              {/* Founder Bio */}
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{founder.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
