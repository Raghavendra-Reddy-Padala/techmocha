"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Always show intro on page refresh (removed localStorage check)
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3500) // Reduced to 3.5 seconds for faster access

    return () => clearTimeout(timer)
  }, [])

  // Handle animation complete
  const handleAnimationComplete = () => {
    setTimeout(() => {
      setAnimationComplete(true)
    }, 300) // Shorter delay after exit animation
  }

  if (animationComplete) return null

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="relative">
            {/* Background elements - optimized for performance */}
            <motion.div
              className="absolute -inset-40 opacity-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.1, 1],
                opacity: [0, 0.1, 0.05],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-blue-500 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Logo animation */}
            <div className="relative flex flex-col items-center">
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="relative w-32 h-32 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(255, 0, 0, 0)",
                      "0 0 30px rgba(255, 0, 0, 0.5)",
                      "0 0 20px rgba(255, 0, 0, 0.3)",
                    ],
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <motion.div
                    className="absolute inset-1 bg-background rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="relative"
                    >
                      {/* HTML tag styling instead of Coffee icon */}
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="text-red-500 text-3xl font-mono"
                          animate={{
                            rotateY: [0, 180, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            times: [0, 0.5, 1],
                            repeat: 1,
                          }}
                        >
                          &lt;/&gt;
                        </motion.div>
                        <motion.div
                          className="absolute text-blue-500 text-3xl font-mono opacity-0"
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            delay: 1,
                            duration: 1.5,
                            repeat: 1,
                            repeatType: "reverse",
                          }}
                        >
                          &lt;TM/&gt;
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Orbiting elements */}
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.div
                    className="absolute top-1/2 -right-2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                </motion.div>
              </motion.div>

              {/* Text animation with improved typography */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.h1
                  className="text-4xl font-bold mb-2 font-mono tracking-tight"
                  animate={{
                    color: [ "#FF0000","#0000FF","#FF0000","#0000FF" ],
                  }}
                  transition={{ delay: 0.9, duration: 1.8 }}
                >
                  Tech<span className="text-primary">Mocha</span>
                </motion.h1>
                <motion.p
                  className="text-muted-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Brewing Tech Solutions
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

