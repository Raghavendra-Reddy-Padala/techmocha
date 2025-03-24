"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Palette, Code, BarChart, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import SectionTitle from "@/components/section-title"

export default function Approach() {
  const [activeStation, setActiveStation] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const stations = [
    {
      title: "UX Research & Discovery",
      icon: Search,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      process: "Stakeholder interviews, user research, market analysis",
      deliverables: "User personas, journey maps, requirement documents",
      value: "Identifying pain points and opportunities",
    },
    {
      title: "UI Design",
      icon: Palette,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      process: "Information architecture, wireframing, visual design",
      deliverables: "Style guide, UI components, interactive prototypes",
      value: "Creating intuitive, engaging user experiences",
    },
    {
      title: "Development",
      icon: Code,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      process: "Frontend and backend implementation, integration",
      deliverables: "Functional application, tested codebase",
      value: "Robust, scalable technical solutions",
    },
    {
      title: "SEO Optimization",
      icon: BarChart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      process: "Keyword research, on-page optimization, performance tuning",
      deliverables: "SEO audit, optimization report, search visibility plan",
      value: "Improved discoverability and reach",
    },
    {
      title: "Marketing & Growth",
      icon: Rocket,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      process: "Launch planning, analytics setup, conversion optimization",
      deliverables: "Marketing strategy, success metrics, growth roadmap",
      value: "Continuous improvement and business growth",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const { top, height } = sectionRef.current.getBoundingClientRect()
      const scrollPosition = window.innerHeight - top
      const scrollPercentage = Math.min(Math.max(scrollPosition / height, 0), 1)

      // Calculate which station should be active based on scroll position
      const stationIndex = Math.min(Math.floor(scrollPercentage * stations.length), stations.length - 1)

      if (stationIndex >= 0) {
        setActiveStation(stationIndex)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [stations.length])

  return (
    <section ref={sectionRef} className="py-20 relative" id="approach">
      <div className="container">
        <SectionTitle
          title="Our Approach"
          description="We follow a comprehensive, station-based methodology to ensure your project's success from concept to completion."
        />

        {/* Desktop Version */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/30 via-primary/30 to-amber-500/30 -translate-x-1/2"></div>

          {/* Stations */}
          <div className="space-y-32 relative">
            {stations.map((station, index) => (
              <div key={index} className="relative">
                <div className="grid grid-cols-2 gap-16 items-center">
                  <motion.div
                    className={cn("space-y-6", index % 2 === 1 && "order-2")}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center",
                          station.bgColor,
                          station.borderColor,
                          "border-2",
                        )}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <station.icon className={cn("h-8 w-8", station.color)} />
                      </motion.div>
                      <h3 className="text-2xl font-bold">{station.title}</h3>
                    </div>

                    <div className="space-y-4 pl-20">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg">Process</h4>
                        <p className="text-muted-foreground">{station.process}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg">Deliverables</h4>
                        <p className="text-muted-foreground">{station.deliverables}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg">Value</h4>
                        <p className="text-muted-foreground">{station.value}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={cn(index % 2 === 0 && "order-2")}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div
                      className={cn("relative rounded-2xl overflow-hidden border-2", station.borderColor, "h-[300px]")}
                    >
                      <div className={cn("absolute inset-0 flex items-center justify-center", station.bgColor)}>
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        >
                          <station.icon className={cn("h-32 w-32", station.color)} />
                        </motion.div>
                      </div>

                      {/* Decorative elements */}
                      <motion.div
                        className="absolute top-6 left-6 w-12 h-12 rounded-full opacity-30"
                        style={{ backgroundColor: index % 2 === 0 ? "#FF0000" : "#0000FF" }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-6 right-6 w-16 h-16 rounded-full opacity-20"
                        style={{ backgroundColor: index % 2 === 0 ? "#0000FF" : "#FF0000" }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Timeline node */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-full border-4 flex items-center justify-center",
                      activeStation >= index ? station.borderColor : "border-muted",
                      activeStation >= index ? station.bgColor : "bg-background",
                    )}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-bold">{index + 1}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-12">
          {stations.map((station, index) => (
            <motion.div
              key={index}
              className={cn("border-l-4 pl-6 relative", station.borderColor)}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[10px] bg-background border-4 border-primary"></div>

              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", station.bgColor)}>
                  <station.icon className={cn("h-6 w-6", station.color)} />
                </div>
                <h3 className="text-xl font-bold">{station.title}</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">Process:</span> {station.process}
                </div>
                <div>
                  <span className="font-semibold">Deliverables:</span> {station.deliverables}
                </div>
                <div>
                  <span className="font-semibold">Value:</span> {station.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

