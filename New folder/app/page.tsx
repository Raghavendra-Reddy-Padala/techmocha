import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Approach from "@/components/approach"
import Portfolio from "@/components/portfolio"
import Metrics from "@/components/metrics"
import QuoteForm from "@/components/quote-form"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import IntroAnimation from "@/components/intro-animation"
import PageTransition from "@/components/page-transition"

export default function Home() {
  return (
    <div className="min-h-screen">
      <IntroAnimation />
      <CustomCursor />
      <PageTransition>
        <Header />
        <main>
          <Hero />
          <Services />
          <Approach />
          <Portfolio />
          <Metrics />
          <QuoteForm />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </div>
  )
}

