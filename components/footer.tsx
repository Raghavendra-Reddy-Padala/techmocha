"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8 pb-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group interactive">
              <motion.div
                className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 rounded-full overflow-hidden transition-transform group-hover:scale-110"
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="text-white font-mono font-bold text-sm">&lt;/&gt;</div>
                <motion.div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white font-mono font-bold text-sm">&lt;TM&gt;</div>
                </motion.div>
              </motion.div>

              <motion.div
                className="font-bold text-xl relative"
                animate={{
                  textShadow: "0 0 8px rgba(255,255,255,0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-mono tracking-tight">
                  <span className="text-red-500 relative z-10">Tech</span>
                  <span className="text-blue-500 relative z-10">Mocha</span>
                </span>
              </motion.div>
            </Link>
            <p className="text-muted-foreground text-sm">Brewing tech solutions for your business since 2025.</p>
          </div>

          {/* Quick Links Section - Visible only on desktop */}
          <div className="hidden md:block">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Home</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-primary text-sm">Services</Link></li>
              <li><Link href="#approach" className="text-muted-foreground hover:text-primary text-sm">Our Approach</Link></li>
              <li><Link href="#portfolio" className="text-muted-foreground hover:text-primary text-sm">Portfolio</Link></li>
            </ul>
          </div>

          {/* Services Section - Visible only on desktop */}
          <div className="hidden md:block">
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#services" className="text-muted-foreground hover:text-primary text-sm">App Development</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-primary text-sm">Web Development</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-primary text-sm">Server Management</Link></li>
              <li><Link href="#services" className="text-muted-foreground hover:text-primary text-sm">Other Tech Services</Link></li>
            </ul>
          </div>

          {/* Legal Section - Always visible */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons - Separated and moved up */}
        <div className="flex justify-center mt-8 mb-4">
          <div className="flex gap-8">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t pt-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} TechMocha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}