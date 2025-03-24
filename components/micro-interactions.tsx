"use client"

import { useEffect } from "react"
import { useAnimation, useScroll } from "framer-motion"

export default function useMicroInteractions() {
  const controls = useAnimation()
  const { scrollY } = useScroll()

  // Add scroll-triggered animations to elements with data-animate attribute
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-animate]")

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight - 100

        if (isVisible) {
          element.classList.add("animate-in")
        }
      })
    }

    // Add hover effects to buttons and links
    const addHoverEffects = () => {
      const buttons = document.querySelectorAll("button, a")

      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          button.classList.add("hover-effect")
        })

        button.addEventListener("mouseleave", () => {
          button.classList.remove("hover-effect")
        })
      })
    }

    window.addEventListener("scroll", handleScroll)
    addHoverEffects()
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { controls }
}

// Apply this component at the top level to enable micro-interactions
export function MicroInteractions() {
  useMicroInteractions()
  return null
}

