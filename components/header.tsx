"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [scrolled, setScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      let currentActive = "home"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentActive = sectionId
        }
      })

      setCurrentSection(currentActive)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "Portfolio", href: "#portfolio" },
  ]

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - (headerRef.current?.offsetHeight || 0),
        behavior: "smooth",
      })
      window.history.pushState(null, "", sectionId)
      setCurrentSection(targetId)
    }
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "py-4"
      )}
    >
      <div className="container flex items-center justify-between relative z-10">
        <Link
          href="#home"
          className="flex items-center gap-2 group interactive"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("#home")
          }}
        >
          <motion.div
            className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-full overflow-hidden transition-transform group-hover:scale-110"
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-white font-mono font-bold text-sm">&lt;/&gt;</div>
            <motion.div className="absolute inset-0 flex items-center justify-center bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white font-mono font-bold text-sm">&lt;TM&gt;</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="font-bold text-xl relative"
            animate={{
              textShadow: scrolled ? "0 0 1px rgba(0,0,0,0.1)" : "0 0 8px rgba(255,255,255,0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono tracking-tight">
              <span className="text-primary relative z-10">Tech</span>
              <span className="text-blue-500 relative z-10">Mocha</span>
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative py-2 interactive",
                currentSection === item.href.replace("#", "") ? "text-primary" : "text-foreground hover:text-primary"
              )}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.href)
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Button
          className="bg-primary text-white hover:bg-primary/90"
          onClick={() => scrollToSection("#quote")}
        >
          Get a Quote
        </Button>
      </div>
    </header>
  )
}