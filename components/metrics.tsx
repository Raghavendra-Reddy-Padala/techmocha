"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle, Users, TrendingUp } from "lucide-react"
import SectionTitle from "@/components/section-title"

export default function AnimatedMetrics() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [isHovered, setIsHovered] = useState<number | null>(null)

  const metrics = [
    {
      value: 2,
      label: "Projects Completed",
      description: "Innovative solutions delivered with precision",
      icon: CheckCircle,
      color: {
        light: "text-red-600",
        dark: "text-red-400"
      },
      gradient: {
        light: "text-primary",
        dark: "text-primary"
      },
      hoverEffect: {
        light: "group-hover:text-red-700",
        dark: "group-hover:text-red-300"
      }
    },
    {
      value: 2,
      label: "Happy Clients",
      description: "Trusted partnerships and exceptional satisfaction",
      icon: Users,
      color: {
        light: "text-blue-600",
        dark: "text-blue-400"
      },
      gradient: {
        light: "text-primary",
        dark: "text-primary"
      },
      hoverEffect: {
        light: "group-hover:text-blue-700",
        dark: "group-hover:text-blue-300"
      }
    },
    {
      value: 100,
      label: "Success Rate",
      description: "Consistently delivering outstanding results",
      icon: TrendingUp,
      color: {
        light: "text-red-500",
        dark: "text-red-400"
      },
      gradient: {
        light: "text-primary",
        dark: "text-primary"
      },
      hoverEffect: {
        light: "group-hover:text-red-600",
        dark: "group-hover:text-red-300"
      }
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <SectionTitle 
          title="Our Impact" 
          description="Transforming challenges into success stories" 
        />
        <div 
          ref={ref} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="group relative"
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <motion.div
                className={`
                  flex flex-col items-center text-center p-8 rounded-2xl border 
                  bg-gradient-to-br 
                  dark:${metric.gradient.dark} 
                  ${metric.gradient.light}
                  transition-all duration-300 ease-in-out
                  relative overflow-hidden
                  ${isHovered === index ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {/* Hover Overlay */}
                <AnimatePresence>
                  {isHovered === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/10 dark:bg-white/10 z-10 flex items-center justify-center"
                    >
                      <p className="text-foreground text-sm text-center px-4">
                        {metric.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Background Glow Effect */}
                <div 
                  className={`
                    absolute -top-1/2 -left-1/2 w-full h-full 
                    bg-white/10 dark:bg-black/10 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300
                    blur-3xl
                  `}
                />

                <metric.icon 
                  className={`
                    h-12 w-12 mb-4 
                    dark:${metric.color.dark} 
                    ${metric.color.light}
                    transition-all duration-300
                    dark:${metric.hoverEffect.dark}
                    ${metric.hoverEffect.light}
                  `} 
                />
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {isInView ? (
                    <AnimatedCounter 
                      value={metric.value} 
                      duration={2} 
                      suffix={metric.label.includes('Rate') ? '%' : '+'} 
                    />
                  ) : "0"}
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {metric.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}
function AnimatedCounter({ 
  value, 
  duration = 2, 
  suffix = '' 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const maxValue = 100; // Fast count till 100

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      const progress = Math.min((timestamp - startTimestamp) / (duration * 500), 1);
      const currentValue = Math.floor(progress * maxValue);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // After reaching 100, reset back to actual value
        setTimeout(() => {
          setDisplayValue(value);
        }, 500);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <motion.span 
      ref={countRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
}
