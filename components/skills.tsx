"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Skill = {
  name: string
  level: number
  icon: string
}

type SkillCategory = {
  name: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "frontend",
    skills: [
      { name: "React.js", level: 95, icon: "🔵" },
      { name: "Next.js", level: 90, icon: "⚫" },
      { name: "TypeScript", level: 85, icon: "🔷" },
      { name: "JavaScript", level: 95, icon: "🟡" },
      { name: "HTML5", level: 98, icon: "🟠" },
      { name: "CSS3/SASS", level: 90, icon: "🔵" },
      { name: "Tailwind CSS", level: 92, icon: "🔷" },
      { name: "Redux", level: 88, icon: "🟣" },
      { name: "React Native", level: 80, icon: "🔵" },
      { name: "Stencil JS", level: 85, icon: "🔷" },
    ],
  },
  {
    name: "tools",
    skills: [
      { name: "Git", level: 90, icon: "🟠" },
      { name: "Storybook", level: 88, icon: "🔴" },
      { name: "Docker", level: 75, icon: "🔵" },
      { name: "AWS S3", level: 80, icon: "🟠" },
      { name: "Jest", level: 85, icon: "🔴" },
      { name: "RTL", level: 82, icon: "🔴" },
      { name: "Figma", level: 75, icon: "🟣" },
      { name: "CI/CD", level: 78, icon: "🟢" },
      { name: "WebSockets", level: 80, icon: "🔵" },
      { name: "RESTful APIs", level: 92, icon: "🟢" },
    ],
  },
  {
    name: "concepts",
    skills: [
      { name: "Responsive Design", level: 95, icon: "📱" },
      { name: "Accessibility", level: 88, icon: "♿" },
      { name: "Performance Optimization", level: 85, icon: "⚡" },
      { name: "Component Design", level: 92, icon: "🧩" },
      { name: "State Management", level: 90, icon: "🔄" },
      { name: "Atomic Design", level: 85, icon: "⚛️" },
      { name: "BEM/SMACSS", level: 88, icon: "🏗️" },
      { name: "SEO Basics", level: 80, icon: "🔍" },
      { name: "OOP Principles", level: 85, icon: "🧠" },
      { name: "Agile/Scrum", level: 82, icon: "🔄" },
    ],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20">
      <div className="section-container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="concepts">Concepts</TabsTrigger>
            </TabsList>
          </div>

          {skillCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.1 * index, duration: 0.5 },
                          }
                        : { opacity: 0, y: 20 }
                    }
                  >
                    <Card className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="mr-2 text-xl">{skill.icon}</span>
                            <h4 className="font-medium">{skill.name}</h4>
                          </div>
                          <span className="text-sm font-medium text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <motion.div
                            className="bg-primary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.2 + 0.05 * index }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

