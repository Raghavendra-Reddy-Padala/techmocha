"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      const elements = container.querySelectorAll(".animate-mouse")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "1")
        const htmlEl = el as HTMLElement
        htmlEl.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`
      })
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden" id="home">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Brewing <span className="text-primary">Tech Solutions</span> for Your{" "}
              <span className="text-blue-500">Business</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              TechMocha blends innovative technology with expert craftsmanship to deliver digital solutions that
              energize your business growth.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                >
                  <Link href="#services">Explore Services</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-blue-500 text-primary hover:bg-blue-500/10"
                >
                  <Link href="#contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <div
              className="absolute animate-mouse"
              data-speed="1.5"
              style={{ top: "10%", left: "20%", width: "60%", height: "60%" }}
            >
              <motion.div
                className="w-full h-full bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
            <div
              className="absolute animate-mouse"
              data-speed="1"
              style={{ bottom: "15%", right: "10%", width: "50%", height: "50%" }}
            >
              <motion.div
                className="w-full h-full bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0.5, 0.7],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 animate-mouse"
                data-speed="0.5"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-blue-500/30 animate-ping-slow animation-delay-500"></div>
                <div className="absolute inset-8 rounded-full border-2 border-primary/30 animate-ping-slow animation-delay-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-gradient">TM</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>
    </section>
  )
}

