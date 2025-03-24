"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Use spring physics for smooth following effect
  const springConfig = { damping: 25, stiffness: 300 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  const [cursorVariant, setCursorVariant] = useState("default")
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [isMobile, setIsMobile] = useState(false)

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
    document.body.style.cursor = "none"

    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const mouseDown = () => setCursorVariant("click")
    const mouseUp = () => setCursorVariant(isHovering ? "hover" : "default")

    // Handle different element types
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if the element or its parent is clickable
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.closest("a") ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.tagName.toLowerCase() === "input" ||
        target.closest("input") ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("textarea") ||
        target.tagName.toLowerCase() === "select" ||
        target.closest("select")

      if (isLink) {
        setCursorVariant("hover")
        setIsHovering(true)

        // Get text for special elements
        if (target.getAttribute("data-cursor-text")) {
          setCursorText(target.getAttribute("data-cursor-text") || "")
        } else if (target.closest("[data-cursor-text]")) {
          setCursorText(target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "")
        } else {
          setCursorText("")
        }
      }
    }

    const handleElementLeave = () => {
      setCursorVariant("default")
      setIsHovering(false)
      setCursorText("")
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    // Use event delegation for better performance
    document.addEventListener("mouseover", handleElementHover)
    document.addEventListener("mouseout", handleElementLeave)

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
      document.removeEventListener("mouseover", handleElementHover)
      document.removeEventListener("mouseout", handleElementLeave)
      window.removeEventListener("resize", checkMobile)
    }
  }, [mouseX, mouseY, isHovering, isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={cursorVariant}
        variants={{
          default: {
            height: 12,
            width: 12,
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            borderRadius: "50%",
            x: mouseX,
            y: mouseY,
            transition: {
              type: "spring",
              mass: 0.3,
            },
          },
          hover: {
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 0, 0, 0.4)",
            borderRadius: "50%",
            x: mouseX - 26,
            y: mouseY - 26,
            mixBlendMode: "difference",
            transition: {
              type: "spring",
              mass: 0.3,
            },
          },
          click: {
            height: 12,
            width: 12,
            backgroundColor: "rgba(255, 0, 0, 1)",
            borderRadius: "50%",
            scale: 0.8,
            x: mouseX,
            y: mouseY,
            transition: {
              type: "spring",
              mass: 0.3,
            },
          },
        }}
      >
        {cursorText && <span className="text-white text-xs font-medium select-none">{cursorText}</span>}
      </motion.div>

      {/* Follower ring */}
      <motion.div
        ref={followerRef}
        className="fixed top-0 left-0 z-[99] pointer-events-none border-2 border-blue-500 rounded-full"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorVariant}
        variants={{
          default: {
            height: 40,
            width: 40,
            opacity: 0.6,
            transition: {
              type: "spring",
              mass: 0.6,
            },
          },
          hover: {
            height: 80,
            width: 80,
            opacity: 0.4,
            transition: {
              type: "spring",
              mass: 0.6,
            },
          },
          click: {
            height: 36,
            width: 36,
            opacity: 0.8,
            scale: 0.9,
            transition: {
              type: "spring",
              mass: 0.6,
            },
          },
        }}
      />

      {/* Subtle trailing effect */}
      <motion.div
        className="fixed top-0 left-0 z-[98] pointer-events-none bg-blue-500 rounded-full opacity-20 blur-sm"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          height: isHovering ? 100 : 60,
          width: isHovering ? 100 : 60,
        }}
        transition={{
          type: "spring",
          mass: 1,
          damping: 30,
        }}
      />
    </>
  )
}

