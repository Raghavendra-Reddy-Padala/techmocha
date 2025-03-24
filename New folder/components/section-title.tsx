"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  description?: string
  className?: string
  align?: "left" | "center" | "right"
  titleClassName?: string
  descriptionClassName?: string
}

export default function SectionTitle({
  title,
  description,
  className,
  align = "center",
  titleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("mb-16 max-w-3xl", alignmentClasses[align], className)}>
      <div className="relative">
        <motion.div
          className="absolute -inset-1 rounded-lg blur-xl bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 opacity-70"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.98, 1.01, 0.98],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.h2
          className={cn(
            "relative text-3xl md:text-4xl font-bold mb-4 inline-block",
            "after:content-[''] after:block after:w-1/2 after:h-1 after:bg-primary after:mt-2",
            align === "center" && "after:mx-auto",
            align === "right" && "after:ml-auto",
            titleClassName,
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          className={cn("text-muted-foreground", descriptionClassName)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

