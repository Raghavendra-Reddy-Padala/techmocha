"use client"

import { useEffect, useState, useRef } from "react"
import { useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
  // Use refs for direct DOM manipulation
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)

  // Track mouse position with motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Game-like spring config (more drag/lag for a gaming feel)
  const springConfig = { damping: 15, stiffness: 200, mass: 1.2 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  // State for cursor behavior
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  
  // Last position for when cursor is inactive
  const lastPositionRef = useRef({ x: 0, y: 0 })

  // Initialize cursor
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // If mobile, don't show custom cursor
    if (isMobile) return

    // Hide default cursor
    document.documentElement.classList.add("custom-cursor")

    // Set initial position to prevent cursor jump on page load
    const setInitialPosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      lastPositionRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
      window.removeEventListener("mousemove", setInitialPosition)
    }

    window.addEventListener("mousemove", setInitialPosition, { once: true })

    // Track mouse movement - throttled for game-like effect
    let lastUpdate = 0
    const updateInterval = 10 // ms between updates for smooth but delayed feel
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate > updateInterval) {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        lastPositionRef.current = { x: e.clientX, y: e.clientY }
        lastUpdate = now
      }
    }

    // Handle mouse events
    const handleMouseDown = () => {
      setIsActive(true)
    }
    
    const handleMouseUp = () => {
      setIsActive(false)
      // Clear any stuck text after click
      setTimeout(() => {
        setCursorText("")
        setIsHovering(false)
      }, 100)
    }

    // Handle element interactions - with proper clean-up
    const handleElementEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if element is interactive
      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.tagName.toLowerCase() === "input" ||
        target.closest("input") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive")

      if (isInteractive) {
        setIsHovering(true)

        // Get custom cursor text if available
        const cursorTextAttr =
          target.getAttribute("data-cursor-text") ||
          target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") ||
          ""

        setCursorText(cursorTextAttr)
      }
    }

    const handleElementLeave = () => {
      setIsHovering(false)
      setCursorText("")
    }

    // Additional click handler to ensure text is cleared
    const handleClick = () => {
      // Clear any stuck text after click
      setTimeout(() => {
        setCursorText("")
        setIsHovering(false)
      }, 100)
    }

    // Force clear cursor text when navigating
    const handleNavigation = () => {
      setCursorText("")
      setIsHovering(false)
    }

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("click", handleClick)
    document.addEventListener("mouseover", handleElementEnter)
    document.addEventListener("mouseout", handleElementLeave)
    document.addEventListener("scroll", handleNavigation)

    // Handle cursor leaving/entering window
    document.addEventListener("mouseleave", () => setIsVisible(false))
    document.addEventListener("mouseenter", () => setIsVisible(true))

    // Special handling for navigation links
    const navLinks = document.querySelectorAll("nav a, header a, .nav-link, a[href], button")
    navLinks.forEach(link => {
      link.addEventListener("click", handleNavigation)
    })

    return () => {
      document.documentElement.classList.remove("custom-cursor")
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("click", handleClick)
      document.removeEventListener("mouseover", handleElementEnter)
      document.removeEventListener("mouseout", handleElementLeave)
      document.removeEventListener("mouseleave", () => setIsVisible(false))
      document.removeEventListener("mouseenter", () => setIsVisible(true))
      document.removeEventListener("scroll", handleNavigation)
      window.removeEventListener("resize", checkMobile)
      
      // Clean up navigation link listeners
      navLinks.forEach(link => {
        link.removeEventListener("click", handleNavigation)
      })
    }
  }, [mouseX, mouseY, isMobile])

  // Update cursor position with RAF for smoother performance
  useEffect(() => {
    if (isMobile || !isVisible) return

    // Use custom easing for game-like effect
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
    
    // To prevent cursor getting "stuck" when inactive
    const inactivityTimer = 5000 // 5 seconds
    let lastActiveTime = Date.now()
    let inactivityCheckId: number
    
    const checkActivity = () => {
      if (Date.now() - lastActiveTime > inactivityTimer) {
        // If cursor hasn't moved in a while, ensure it's at last known position
        followerX.set(lastPositionRef.current.x)
        followerY.set(lastPositionRef.current.y)
      }
      inactivityCheckId = requestAnimationFrame(checkActivity)
    }
    inactivityCheckId = requestAnimationFrame(checkActivity)

    // Track user activity
    const updateActivity = () => {
      lastActiveTime = Date.now()
    }
    window.addEventListener("mousemove", updateActivity)

    // Update cursor position with better animation
    const updateCursorPosition = () => {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        // Inner cursor follows with slight easing
        const innerX = mouseX.get()
        const innerY = mouseY.get()
        cursorInnerRef.current.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate3d(-50%, -50%, 0)`

        // Outer cursor follows with spring physics
        const outerX = followerX.get()
        const outerY = followerY.get()
        cursorOuterRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate3d(-50%, -50%, 0) scale(${isHovering ? 1.5 : 1})`

        // Update text position if present
        if (cursorTextRef.current) {
          cursorTextRef.current.style.transform = `translate3d(${outerX}px, ${outerY - 30}px, 0) translate3d(-50%, -50%, 0)`
        }
      }

      requestAnimationFrame(updateCursorPosition)
    }

    const animationId = requestAnimationFrame(updateCursorPosition)
    
    return () => {
      cancelAnimationFrame(animationId)
      cancelAnimationFrame(inactivityCheckId)
      window.removeEventListener("mousemove", updateActivity)
    }
  }, [mouseX, mouseY, followerX, followerY, isHovering, isMobile, isVisible])

  // Don't render on mobile or when not visible
  if (isMobile || !isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none w-5 h-5 rounded-full bg-red-500 mix-blend-difference will-change-transform transition-transform duration-100"
        style={{
          transform: `translate3d(${mouseX.get()}px, ${mouseY.get()}px, 0) translate3d(-50%, -50%, 0)`,
          scale: isActive ? 0.7 : 1,
          transition: "scale 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Follower ring */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 z-[99] pointer-events-none w-12 h-12 rounded-full border-2 border-blue-500 will-change-transform transition-all duration-500"
        style={{
          transform: `translate3d(${followerX.get()}px, ${followerY.get()}px, 0) translate3d(-50%, -50%, 0)`,
          opacity: 0.75,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.1)" : "transparent",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
          transition: "background-color 0.4s ease, scale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {/* Cursor text - with proper cleanup on clicks */}
      {cursorText && (
        <div
          ref={cursorTextRef}
          className="fixed top-0 left-0 z-[101] pointer-events-none flex items-center justify-center text-white text-xs font-medium bg-blue-500 px-2 py-1 rounded-full whitespace-nowrap will-change-transform"
          style={{
            transform: `translate3d(${followerX.get()}px, ${followerY.get() - 30}px, 0) translate3d(-50%, -50%, 0)`,
            opacity: 0.9,
            transition: "opacity 0.3s ease",
          }}
        >
          {cursorText}
        </div>
      )}

      {/* Subtle trailing effect */}
      <div
        className="fixed top-0 left-0 z-[98] pointer-events-none w-20 h-20 rounded-full bg-blue-500/10 blur-lg will-change-transform"
        style={{
          transform: `translate3d(${followerX.get()}px, ${followerY.get()}px, 0) translate3d(-50%, -50%, 0)`,
          opacity: isHovering ? 0.4 : 0.15,
          scale: isHovering ? 1.3 : 1,
          transition: "opacity 0.5s ease, scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </>
  )
}