"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import SectionTitle from "@/components/section-title"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Quote request submitted",
      description: "We'll get back to you within 24 hours.",
      variant: "success"
    })

    setIsSubmitting(false)
    formRef.current?.reset()
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/10" id="quote">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionTitle
            title="Get a Free Quote"
            description="Tell us about your project and we'll provide a customized solution"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: "Our Location",
                  content: "Suraram colony 4-47, Hyderabad, Telangana",
                  color: "text-red-600"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "9032323095",
                  color: "text-blue-600"
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "info@techmocha.in",
                  color: "text-red-600"
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  content: "Mon-Fri: 9AM - 6PM\nSat: 10AM - 4PM",
                  color: "text-blue-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`bg-${item.color.split('-')[1]}/10 p-3 rounded-full`}>
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60889.63496551296!2d78.38294755!3d17.49368445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b35ca6b0e3%3A0x6a8d4d7c94231f0d!2sSuraram%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1647859045123!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TechMocha office location"
                    className="w-full"
                  />
                </CardHeader>
               
              </Card>
            </motion.div>
          </motion.div>

          {/* Quote Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-0">
                <div className="text-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Request a Quote</h3>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form and we'll get back to you within 24 hours
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 1234567890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your company (if applicable)" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-type">What service do you need? <span className="text-red-500">*</span></Label>
                    <Select required>
                      <SelectTrigger id="project-type">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="app">App Development</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                        <SelectItem value="marketing">Digital Marketing</SelectItem>
                        <SelectItem value="consulting">IT Consulting</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget</Label>
                    <Select>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-10">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="10-25">₹1,00,000 - ₹2,50,000</SelectItem>
                        <SelectItem value="25-50">₹2,50,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="50+">₹5,00,000+</SelectItem>
                        <SelectItem value="undecided">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Project Details <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="requirements"
                      placeholder="Describe your project requirements, goals, and timeline..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 transition-colors shadow-md" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>Submit Request</>
                      )}
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    We respect your privacy. Your information will not be shared with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}