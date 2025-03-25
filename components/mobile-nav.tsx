"use client"

import { useState, useEffect, useRef } from "react"
import { Home, Layers, Briefcase, InfoIcon, Settings, X, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function FuturisticMobileNav() {
  const isMobile = useMobile()
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")
  const navRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const navItems = [
    { name: "Home", href: "#home", icon: Home, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "About", href: "#about", icon: InfoIcon, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Services", href: "#services", icon: Layers, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Quote", href: "#quote", icon: Settings, color: "text-red-500", bg: "bg-red-500/10" },
  ]

  // Cursor tracking effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        cursorX.set(event.clientX - rect.left)
        cursorY.set(event.clientY - rect.top)
      }
    }

    if (isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile, cursorX, cursorY])

  // Section tracking
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
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
  }, [isMobile])

  // Interactive touch and hover effects
  const handleTouchStart = (name: string) => {
    setActiveItem(name)
  }

  const handleTouchEnd = () => {
    setActiveItem(null)
    setIsMenuOpen(false)
  }

  if (!isMobile) return null

  return (
    <>
      {/* Futuristic Bottom Navigation */}
      <motion.div
        ref={navRef}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Glowing Cursor Effect */}
        <motion.div
          className="absolute pointer-events-none z-0"
          style={{
            left: cursorX,
            top: cursorY,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-16 h-16 bg-primary/20 rounded-full blur-3xl absolute -z-10 animate-pulse"></div>
        </motion.div>

        <div className="bg-background/80 backdrop-blur-xl border-t border-primary/10 px-2 py-2 shadow-2xl rounded-t-3xl">
          <nav className="flex justify-between items-center max-w-md mx-auto relative">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl transition-all relative z-10",
                  currentSection === item.href.replace("#", "")
                    ? `${item.color} ${item.bg}`
                    : "text-muted-foreground",
                  activeItem === item.name && "scale-90",
                )}
                onTouchStart={() => handleTouchStart(item.name)}
                onTouchEnd={handleTouchEnd}
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
                <motion.div 
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
            
            {/* Futuristic Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-primary/10 rounded-full"
              onClick={() => setIsMenuOpen(true)}
            >
              <Zap className="h-5 w-5 text-primary animate-pulse" />
            </motion.button>
          </nav>
        </div>
      </motion.div>

      {/* Fullscreen Futuristic Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-3xl flex flex-col md:hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-end p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-6 p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    stiffness: 300 
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium transition-all",
                      "hover:bg-primary/10 hover:scale-105 active:scale-95",
                      currentSection === item.href.replace("#", "") 
                        ? `${item.color} ${item.bg}` 
                        : "text-foreground"
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