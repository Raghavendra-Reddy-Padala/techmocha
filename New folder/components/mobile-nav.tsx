"use client"

import { useState, useEffect } from "react"
import { Home, Layers, Briefcase, Phone, Settings, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function MobileNav() {
  const isMobile = useMobile()
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Services", href: "#services", icon: Layers },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Phone },
    { name: "Quote", href: "#quote", icon: Settings },
  ]

  // Track scroll position to highlight active section
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
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
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  // Handle touch interactions
  const handleTouchStart = (name: string) => {
    setActiveItem(name)
  }

  const handleTouchEnd = () => {
    setActiveItem(null)
    setIsMenuOpen(false) // Close menu when an item is selected
  }

  if (!isMobile) return null

  return (
    <>
      {/* Fixed bottom navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="bg-background/95 backdrop-blur-lg border-t px-2 py-2 shadow-lg">
          <nav className="flex justify-between items-center max-w-md mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl transition-all",
                  currentSection === item.href.replace("#", "")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground",
                  activeItem === item.name && "scale-90",
                )}
                onTouchStart={() => handleTouchStart(item.name)}
                onTouchEnd={handleTouchEnd}
                onClick={(e) => {
                  // Smooth scroll to section
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
                <motion.div whileTap={{ scale: 0.9 }}>
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg flex flex-col md:hidden"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-6 p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium transition-all",
                      currentSection === item.href.replace("#", "") ? "text-primary bg-primary/10" : "text-foreground",
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
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
                    <item.icon className="h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

