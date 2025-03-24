"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Globe, Languages, Lightbulb } from "lucide-react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="section-container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">A passionate Front-end Developer based in Santiago, Chile</h3>

            <p className="text-muted-foreground mb-6">
              I'm a dedicated Front-end Developer with a strong focus on creating intuitive and performant user
              interfaces. With experience in React.js, Next.js, TypeScript, and various modern web technologies, I
              specialize in building responsive and accessible web applications.
            </p>

            <p className="text-muted-foreground mb-6">
              My journey in web development began at Duoc UC where I earned my BS in Informatics Engineering. Since
              then, I've worked with various companies including Globant, where I've contributed to projects for clients
              like Salesforce, Air Miles, and Colsubsidio.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about staying up-to-date with the latest technologies and best practices in front-end
              development. I enjoy solving complex problems and creating elegant solutions that provide exceptional user
              experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Web Development",
                description: "Specialized in React.js, Next.js, and TypeScript for building modern web applications.",
              },
              {
                icon: <Globe className="h-10 w-10 text-primary" />,
                title: "Responsive Design",
                description: "Creating websites that work seamlessly across all devices and screen sizes.",
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-primary" />,
                title: "Problem Solving",
                description: "Turning complex requirements into elegant, intuitive solutions.",
              },
              {
                icon: <Languages className="h-10 w-10 text-primary" />,
                title: "Multilingual",
                description: "Fluent in Spanish (native) and English (upper intermediate).",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeInUpVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Card className="h-full card-hover">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">{item.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

