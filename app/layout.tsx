import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import MobileNav from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/toaster"
import { MicroInteractions } from "@/components/micro-interactions"
import ThemeToggle from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechMocha - Brewing Tech Solutions",
  description:
    "TechMocha provides app development, web development, server management, and other tech services to help your business grow.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MicroInteractions />
          {children}
          <MobileNav />
          <ThemeToggle />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'