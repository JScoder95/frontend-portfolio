import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import BackToTop from "@/components/back-to-top"

export const metadata: Metadata = {
  title: "José Solís | Front-end Developer",
  description:
    "Experienced Front-end Developer specializing in React.js, Next.js, TypeScript, and modern web technologies.",
  keywords: "front-end developer, react developer, next.js developer, typescript, web development, UI engineer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://josesolisdev.com",
    title: "José Solís | Front-end Developer",
    description:
      "Experienced Front-end Developer specializing in React.js, Next.js, TypeScript, and modern web technologies.",
    siteName: "José Solís Portfolio",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <BackToTop />
    </main>
  )
}

