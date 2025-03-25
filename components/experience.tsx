"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Experience = {
  company: string;
  location: string;
  position: string;
  period: string;
  year: string;
  description: string[];
  tools: string[];
};

const experiences: Experience[] = [
  {
    company: "GLOBANT (Salesforce)",
    location: "Santiago, Chile",
    position: "Senior UX Engineer",
    period: "Dec. 2024 - Mar. 2025",
    year: "2024-2025",
    description: [
      "Led the update of the Lightning Web Component library and the Storybook version used in all Salesforce Component Libraries.",
      "Enhanced the developer experience by integrating Salesforce Lightning Design System+ (SLDS+) styles into the cross Lightning Web Component storybook repository.",
      "Deployed the new Lightning Web Component storybook with SLDS+ on Heroku.",
      "Optimized data table Lightning Web Component for Salesforce Billing Portal, ensuring mobile responsiveness.",
      "Implemented accessibility improvements for components, ensuring compliance with ARIA guidelines.",
      "Contributed to the establishment of design guidelines for the Customer Success Score platform.",
      "Ensured website accessibility by performing an audit against WCAG 2.1 AA standards.",
    ],
    tools: [
      "Storybook",
      "TypeScript",
      "Heroku",
      "HTML & CSS",
      "Git",
      "Salesforce CLI",
    ],
  },
  {
    company: "GLOBANT (Air Miles)",
    location: "Santiago, Chile",
    position: "Web UI Developer",
    period: "Feb. 2024 - Sep. 2024",
    year: "2024",
    description: [
      "Developed a Web Component in Stencil JS, served through CloudFront in conjunction with an AWS S3 bucket.",
      "Collaborated with the DevOps team to ensure a smooth CI/CD flow.",
      "Developed the logic to visually customize the Web Component for each partner.",
      "Implemented minimum accessibility standards and ARIA attributes.",
      "Created and developed the various components and views of the Web Component.",
      "Developed the logic for the component to consume the Air Miles offers API.",
      "Developed and implemented a comprehensive tracking system integrated with Adobe Analytics.",
      "Added unit tests to each component and logic, achieving nearly 90% coverage.",
    ],
    tools: [
      "Stencil JS",
      "TypeScript",
      "SASS",
      "AXIOS",
      "AWS S3",
      "HTML & CSS",
      "Jest",
      "Docker",
      "Git",
    ],
  },
  {
    company: "GLOBANT (Colsubsidio)",
    location: "Santiago, Chile",
    position: "Web UI Developer",
    period: "Aug. 2023 - Feb. 2024",
    year: "2023-2024",
    description: [
      "Developed the views corresponding to the credit simulation and credit application flows.",
      "Implemented a WebSocket connected to a backend service that validates user input.",
      "Integrated the application with Drupal to enable content editing.",
      "Implemented Google Tag Manager within the application using a dataLayer for event tracking and analysis.",
      "Created a High Order Component (HOC) that transformed regular components into ones with event tracking capabilities.",
      "Developed a store for each user step and a global storage system.",
    ],
    tools: [
      "Next JS",
      "TypeScript",
      "Styled Components",
      "AWS S3",
      "HTML & CSS",
      "Git",
    ],
  },
  {
    company: "GLOBANT (Bizarrap - Enigma Art Studios)",
    location: "Santiago, Chile",
    position: "Web UI Developer",
    period: "Aug. 2022 – Aug. 2023",
    year: "2022-2023",
    description: [
      "Restructured and improved all the code of an application made in React with redux and React Hooks.",
      "Implemented login functionality with a password for the administrator.",
      "Implemented a function that uses Local Storage to save the on-going user session.",
      "Created sections inside the web application to store animations and images on the API that Unity consumes.",
      "Programmed complete designs that were created in Figma.",
      "Created a section to add promotional codes, both individual and in large quantities.",
      "Developed the code to be able to add image or videos that were later used in the application as a banner section.",
      "Created unit tests for some components.",
      "Migrated code from React jsx to Typescript including Redux.",
      "Added tools to prevent errors and be able to run GitHub actions without any issues.",
    ],
    tools: [
      "React JS",
      "Redux",
      "TypeScript",
      "SASS",
      "AXIOS",
      "AWS S3",
      "HTML & CSS",
      "Jest",
      "Docker",
      "MySQL",
      "Git",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("timeline");

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section id="experience" className="py-20 bg-secondary/50">
      <div className="section-container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>

        <Tabs
          defaultValue="timeline"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="timeline" className="mt-0">
            <AnimatePresence mode="wait">
              {activeTab === "timeline" && (
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={`timeline-${index}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      exit="exit"
                      className="experience-card"
                    >
                      <div className="experience-year">{exp.year}</div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-xl font-bold">{exp.position}</h3>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{exp.period}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {exp.location}
                          </p>
                        </div>

                        <div className="md:col-span-3">
                          <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-muted-foreground">
                            {exp.description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.tools.map((tool) => (
                              <Badge key={tool} variant="secondary">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="cards" className="mt-0">
            <AnimatePresence mode="wait">
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={`card-${index}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      exit="exit"
                    >
                      <Card className="h-full card-hover">
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <Badge className="mb-2">{exp.year}</Badge>
                            <h3 className="text-xl font-bold">
                              {exp.position}
                            </h3>
                            <div className="flex items-center text-muted-foreground mt-1">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{exp.company}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{exp.period}</span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <p className="text-sm text-muted-foreground">
                              {exp.description[0]}
                              {exp.description.length > 1 && "..."}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.tools.slice(0, 5).map((tool) => (
                              <Badge key={tool} variant="secondary">
                                {tool}
                              </Badge>
                            ))}
                            {exp.tools.length > 5 && (
                              <Badge variant="outline">
                                +{exp.tools.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
