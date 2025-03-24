"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Smartphone, Globe, Server, Code, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import SectionTitle from "@/components/section-title"

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null)

  const services = [
    {
      title: "App Development",
      description:
        "Custom mobile applications for iOS and Android platforms that deliver exceptional user experiences.",
      icon: Smartphone,
      details: [
        "Native and cross-platform development",
        "UI/UX design for mobile interfaces",
        "App store optimization and deployment",
        "Ongoing maintenance and updates",
      ],
    },
    {
      title: "Web Development",
      description: "Responsive, high-performance websites and web applications tailored to your business needs.",
      icon: Globe,
      details: [
        "Custom website development",
        "E-commerce solutions",
        "Content management systems",
        "Progressive web applications",
      ],
    },
    {
      title: "Server Management",
      description: "Reliable server infrastructure setup, optimization, and maintenance for your digital operations.",
      icon: Server,
      details: [
        "Cloud server configuration",
        "Performance optimization",
        "Security hardening",
        "Backup and disaster recovery",
      ],
    },
    {
      title: "Other Tech Services",
      description: "Comprehensive technology solutions to address your unique business challenges.",
      icon: Code,
      details: [
        "Technical consultation",
        "Legacy system modernization",
        "Integration services",
        "Custom software development",
      ],
    },
  ]

  return (
    <section className="py-20 relative" id="services">
      <div className="container">
        <SectionTitle
          title="Our Services"
          description="We offer a comprehensive range of technology solutions to help your business thrive in the digital landscape."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "h-full transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden",
                  "hover:translate-y-[-5px]",
                  activeService === index ? "border-primary" : "",
                )}
                onClick={() => setActiveService(activeService === index ? null : index)}
              >
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    activeService === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <ul className="space-y-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    {activeService === index ? "Show Less" : "Learn More"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

