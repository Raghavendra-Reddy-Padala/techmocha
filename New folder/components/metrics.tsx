"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, Users } from "lucide-react"
import SectionTitle from "@/components/section-title"

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const metrics = [
    {
      value: 2,
      label: "Projects Completed",
      icon: CheckCircle,
      color: "text-primary",
    },
    {
      value: 2,
      label: "Happy Clients",
      icon: Users,
      color: "text-blue-500",
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <SectionTitle title="Our Metrics" description="See the impact we've made for our clients." />
        <div ref={ref} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-lg border bg-background/50 backdrop-blur-sm shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <metric.icon className={`h-12 w-12 mb-4 ${metric.color}`} />
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {isInView ? <Counter from={0} to={metric.value} duration={2} /> : "0"}+
              </div>
              <div className="text-muted-foreground">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CounterProps {
  from: number
  to: number
  duration: number
}

function Counter({ from, to, duration }: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const startTime = performance.now()
    const endTime = startTime + duration * 1000

    const updateCounter = (currentTime: number) => {
      if (currentTime >= endTime) {
        if (node) node.textContent = to.toString()
        return
      }

      const elapsedTime = currentTime - startTime
      const progress = elapsedTime / (duration * 1000)
      const currentValue = Math.floor(from + progress * (to - from))

      if (node) node.textContent = currentValue.toString()
      requestAnimationFrame(updateCounter)
    }

    requestAnimationFrame(updateCounter)
  }, [from, to, duration])

  return <span ref={nodeRef}>{from}</span>
}

