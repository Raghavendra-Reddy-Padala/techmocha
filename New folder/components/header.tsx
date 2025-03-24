"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coffee, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [scrolled, setScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Track active section
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100 // Offset for better detection

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
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary to-blue-500 rounded-full overflow-hidden transition-transform group-hover:scale-110"
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Coffee className="text-primary-foreground h-6 w-6 absolute" />
            <Code className="text-primary-foreground h-6 w-6 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <motion.span
            className="font-bold text-xl"
            animate={{
              color: scrolled ? "#000000" : "#FF0000",
              textShadow: scrolled ? "none" : "0 0 8px rgba(0, 0, 255, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            Tech<span className="text-blue-500">Mocha</span>
          </motion.span>
        </Link>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  currentSection === item.href.replace("#", "") ? "text-primary" : "text-foreground hover:text-primary",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all",
                  currentSection === item.href.replace("#", "") ? "after:w-full" : "after:w-0 hover:after:w-full",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const targetId = item.href.replace("#", "")
                  const targetElement = document.getElementById(targetId)
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
            >
              <Link href="#quote">Get a Quote</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

