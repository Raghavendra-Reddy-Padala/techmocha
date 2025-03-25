"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Target, 
  Globe, 
  Rocket, 
  CheckCircle, 
  Layers, 
  Zap, 

} from "lucide-react"
import SectionTitle from "@/components/section-title"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutUsPage() {
  const featureVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Rocket,
      title: "Innovative Solutions",
      description: "Cutting-edge digital strategies that drive business growth and transformation."
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Rigorous quality control and testing to deliver exceptional digital products."
    },
    {
      icon: Layers,
      title: "Comprehensive Services",
      description: "End-to-end digital solutions from concept to implementation and support."
    },
    {
      icon: Zap,
      title: "Rapid Delivery",
      description: "Efficient project management ensuring timely and precise project completion."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/10 to-background" id="about"> 
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle
            title="TechMocha: Transforming Digital Landscapes"
            description="A Top-Rated Digital Agency Delivering Innovative Technology Solutions"
            className="mb-8"
          />
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are a premier digital agency specializing in creating transformative technology solutions 
            that empower businesses to thrive in the digital era. With our expert team of developers, 
            designers, and strategists, we turn innovative ideas into powerful digital experiences.
          </p>
        </motion.div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={featureVariants.initial}
            whileInView={featureVariants.animate}
            viewport={{ once: true }}
            transition={featureVariants.transition}
          >
            <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center space-y-0 space-x-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Our Mission</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower businesses through innovative technology solutions, 
                  delivering exceptional digital experiences that drive growth, 
                  efficiency, and competitive advantage.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={featureVariants.initial}
            whileInView={featureVariants.animate}
            viewport={{ once: true }}
            transition={featureVariants.transition}
          >
            <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center space-y-0 space-x-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading digital transformation partner, recognized globally 
                  for our innovative solutions, client-centric approach, and ability to 
                  turn complex challenges into digital opportunities.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>


        {/* Key Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose TechMocha</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with creative thinking to deliver solutions that make an impact
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={featureVariants.initial}
              whileInView={featureVariants.animate}
              viewport={{ once: true }}
              transition={{ ...featureVariants.transition, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to transform your digital presence?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your business goals with our tailored solutions.
          </p>
          <Button size="lg" className="px-8">
            
            <Link href="#quote">Contact Us Today</Link>

          </Button>
        </div>
      </div>
    </section>
  )
}