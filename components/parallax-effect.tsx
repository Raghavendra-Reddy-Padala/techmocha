"use client"

import { useEffect, useRef } from "react"

export default function ParallaxEffect() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!parallaxRef.current) return

    const parallaxContainer = parallaxRef.current
    const parallaxLayers = parallaxContainer.querySelectorAll(".parallax-layer")

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = parallaxContainer.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      parallaxLayers.forEach((layer) => {
        const speed = Number.parseFloat(layer.getAttribute("data-speed") || "0")
        const htmlLayer = layer as HTMLElement

        htmlLayer.style.transform = `translate3d(${x * 50 * speed}px, ${y * 50 * speed}px, 0)`
      })
    }

    const handleScroll = () => {
      const scrollY = window.scrollY

      parallaxLayers.forEach((layer) => {
        const speed = Number.parseFloat(layer.getAttribute("data-scroll-speed") || "0")
        const htmlLayer = layer as HTMLElement

        htmlLayer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return <div ref={parallaxRef} className="parallax absolute inset-0 overflow-hidden pointer-events-none" />
}

