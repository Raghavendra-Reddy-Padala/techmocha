"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionTitle from "@/components/section-title"
import { useMobile } from "@/hooks/use-mobile"

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0)
  const [dragging, setDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const dragStartX = useRef(0)
  const isMobile = useMobile()

  const projects = [
    {
      title: "EETA (College Website)",
      description:
        "A comprehensive website for a college, featuring course information, faculty profiles, and student resources.",
      image: "/placeholder.svg?height=600&width=800",
      link: "https://eeta-club.web.app/",
      challenges:
        "Creating an intuitive navigation system for diverse user groups including prospective students, current students, and faculty.",
      solutions:
        "Implemented a role-based content structure with personalized dashboards and a responsive design that works across all devices.",
      technologies: ["React", "Firebase", "Tailwind CSS"],
    },
    {
      title: "Sai Anjana Digitals",
      description:
        "A digital platform for a flex printing business, streamlining order management and customer interactions.",
      image: "/placeholder.svg?height=600&width=800",
      link: null,
      challenges:
        "Transitioning a traditional printing business to digital operations while maintaining ease of use for non-technical staff.",
      solutions:
        "Developed a simplified order management system with automated workflows and integrated payment processing.",
      technologies: ["Next.js", "Node.js", "MongoDB"],
    },
  ]

  const nextProject = () => {
    if (!dragging) {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }
  }

  const prevProject = () => {
    if (!dragging) {
      setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
    }
  }

  const handleDragStart = (event: React.PointerEvent | React.TouchEvent) => {
    setDragging(true)

    // Handle both mouse and touch events
    if ("clientX" in event) {
      dragStartX.current = event.clientX
    } else if (event.touches && event.touches[0]) {
      dragStartX.current = event.touches[0].clientX
    }
  }

  const handleDragEnd = (event: React.PointerEvent | React.TouchEvent) => {
    let dragEndX = 0

    // Handle both mouse and touch events
    if ("clientX" in event) {
      dragEndX = event.clientX
    } else if (event.changedTouches && event.changedTouches[0]) {
      dragEndX = event.changedTouches[0].clientX
    }

    const dragDistance = dragEndX - dragStartX.current

    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        prevProject()
      } else {
        nextProject()
      }
    }

    setTimeout(() => setDragging(false), 100)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging) {
        nextProject()
      }
    }, 8000) // 8 seconds between auto-advance

    return () => clearInterval(interval)
  }, [dragging])

  return (
    <section className="py-20 bg-muted/30" id="portfolio">
      <div className="container">
        <SectionTitle
          title="Our Portfolio"
          description="Explore our successful projects and see how we've helped businesses achieve their digital goals."
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation arrows - hidden on mobile */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-1/2 left-4 -translate-y-1/2 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-cursor-text="Prev"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm shadow-md border-blue-500/50 hover:bg-blue-500/10"
                  onClick={prevProject}
                >
                  <ChevronLeft className="h-5 w-5 text-primary" />
                  <span className="sr-only">Previous project</span>
                </Button>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-4 -translate-y-1/2 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-cursor-text="Next"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm shadow-md border-blue-500/50 hover:bg-blue-500/10"
                  onClick={nextProject}
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                  <span className="sr-only">Next project</span>
                </Button>
              </motion.div>
            </>
          )}

          {/* Mobile swipe instructions */}
          {isMobile && (
            <div className="text-center text-sm text-muted-foreground mb-4">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                Swipe left or right to navigate projects
              </motion.p>
            </div>
          )}

          <div
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -50) {
                    nextProject()
                  } else if (offset.x > 50) {
                    prevProject()
                  }
                }}
                style={{ x }}
              >
                <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                  <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
                    <Image
                      src={projects[activeProject].image || "/placeholder.svg"}
                      alt={projects[activeProject].title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-xl sm:text-2xl text-primary">
                        {projects[activeProject].title}
                      </CardTitle>
                      {projects[activeProject].link && (
                        <Link href={projects[activeProject].link} target="_blank" rel="noopener noreferrer">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" size="sm" className="gap-1 text-blue-500 hover:bg-blue-500/10">
                              <ExternalLink className="h-4 w-4" />
                              Visit Site
                            </Button>
                          </motion.div>
                        </Link>
                      )}
                    </div>
                    <CardDescription className="text-base">{projects[activeProject].description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2 text-lg text-blue-500">Challenges</h4>
                        <p className="text-muted-foreground">{projects[activeProject].challenges}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="font-semibold mb-2 text-lg text-blue-500">Solutions</h4>
                        <p className="text-muted-foreground">{projects[activeProject].solutions}</p>
                      </motion.div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {projects[activeProject].technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <Badge variant="secondary" className="bg-blue-500/10 text-primary hover:bg-blue-500/20">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 gap-3">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeProject === index ? "bg-primary" : "bg-blue-500/30"
                }`}
                onClick={() => setActiveProject(index)}
                aria-label={`View project ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

