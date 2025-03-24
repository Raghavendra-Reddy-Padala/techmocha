"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionTitle from "@/components/section-title"
import { useMobile } from "@/hooks/use-mobile"

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0)
  const [isCardView, setIsCardView] = useState(true)
  const isMobile = useMobile()

  // Simplified project data
  const projects = [
    {
      title: "EETA (College Website)",
      description:
        "A comprehensive website for a college, featuring course information, faculty profiles, and student resources.",
      image: "/image.png",
      link: "https://eeta-club.web.app/",
      technologies: ["Flutter", "Firebase"],
    },
    {
      title: "Sai Anjana Digitals",
      description:
        "A digital platform for a flex printing business, streamlining order management and customer interactions.",
      image: "/sai.jpg",
      link: null,
      // challenges:
      //   "Transitioning a traditional printing business to digital operations while maintaining ease of use for non-technical staff.",
      // solutions:
      //   "Developed a simplified order management system with automated workflows and integrated payment processing.",
      technologies: ["Next.js","SEO"],
    },
  ]

  // Simple navigation functions without complex event handling
  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject()
    }, 8000) // 8 seconds between auto-advance

    return () => clearInterval(interval)
  }, [])

  // Optimize images for faster loading
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Preload images for smoother transitions
      projects.forEach((project) => {
        const img = new window.Image()
        img.src = project.image || "/placeholder.svg"
        img.crossOrigin = "anonymous"
      })
    }
  }, [])

  return (
    <section className="py-20 bg-muted/30" id="portfolio">
      <div className="container">
        <SectionTitle
          title="Our Portfolio"
          description="Explore our successful projects and see how we've helped businesses achieve their digital goals."
        />

        {/* Mobile view toggle */}
        {isMobile && (
          <div className="flex justify-center mb-6">
            <div className="bg-background rounded-full p-1 border shadow-sm">
              <Button
                variant={isCardView ? "default" : "ghost"}
                size="sm"
                className={`rounded-full ${isCardView ? "bg-gradient-to-r from-red-500 to-blue-500" : ""}`}
                onClick={() => setIsCardView(true)}
              >
                Cards
              </Button>
              <Button
                variant={!isCardView ? "default" : "ghost"}
                size="sm"
                className={`rounded-full ${!isCardView ? "bg-gradient-to-r from-red-500 to-blue-500" : ""}`}
                onClick={() => setIsCardView(false)}
              >
                Grid
              </Button>
            </div>
          </div>
        )}

        {/* Desktop and Mobile Card View */}
        {(!isMobile || (isMobile && isCardView)) && (
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
            {isMobile && isCardView && (
              <div className="text-center text-sm text-muted-foreground mb-4">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  Tap arrows below to navigate projects
                </motion.p>
              </div>
            )}

            <div className="overflow-hidden">
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
                >
                  <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                    <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
                      <Image
                        src={projects[activeProject].image || "/placeholder.svg"}
                        alt={projects[activeProject].title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={activeProject === 0}
                        loading={activeProject === 0 ? "eager" : "lazy"}
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
                      {/* <div className="grid md:grid-cols-2 gap-6">
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
                      </div> */}
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

            {/* Mobile navigation buttons */}
            {isMobile && isCardView && (
              <div className="flex justify-center mt-6 gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-blue-500/50 hover:bg-blue-500/10"
                  onClick={prevProject}
                >
                  <ChevronLeft className="h-5 w-5 text-primary" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-blue-500/50 hover:bg-blue-500/10"
                  onClick={nextProject}
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                </Button>
              </div>
            )}

            {/* Desktop pagination dots */}
            {!isMobile && (
              <div className="flex justify-center mt-6 gap-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeProject === index ? "bg-primary" : "bg-blue-500/30"
                    }`}
                    onClick={() => setActiveProject(index)}
                    aria-label={`View project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Grid View */}
        {isMobile && !isCardView && (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden h-full border border-blue-500/10 hover:border-red-500/20 transition-all duration-300 hover:shadow-md">
                  <div className="grid grid-cols-3 h-full">
                    <div className="relative col-span-1 h-full min-h-[120px]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                    <div className="col-span-2 p-4 flex flex-col">
                      <h3 className="font-semibold text-primary mb-1 line-clamp-1">{project.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {project.technologies.slice(0, 2).map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-[10px] bg-blue-500/5 border-blue-500/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 2 && (
                          <Badge variant="outline" className="text-[10px] bg-red-500/5 border-red-500/10">
                            +{project.technologies.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-background/90 to-transparent flex items-end justify-center p-4 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 border-blue-500/20 text-primary"
                      onClick={() => {
                        setActiveProject(index)
                        setIsCardView(true)
                      }}
                    >
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

