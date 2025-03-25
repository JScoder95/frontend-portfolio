"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveSphere from "./interactive-sphere";

export default function Hero() {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typingRef.current) return;

    const roles = [
      "Front-end Developer",
      "Senior UX Engineer",
      "React.js & Next.js Expert",
      "The dev that you need.",
    ];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentRole = roles[currentRoleIndex];

      if (isDeleting) {
        if (typingRef.current) {
          typingRef.current.textContent = currentRole.substring(
            0,
            currentCharIndex - 1
          );
          currentCharIndex--;
        }
        typingSpeed = 50;
      } else {
        if (typingRef.current) {
          typingRef.current.textContent = currentRole.substring(
            0,
            currentCharIndex + 1
          );
          currentCharIndex++;
        }
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next role
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Hello, I'm José Solís
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">Creative</span> &{" "}
              <span className="gradient-text">Passionate</span>
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 h-12">
              <span
                ref={typingRef}
                className="border-r-2 border-primary"
              ></span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Specialized in creating exceptional digital experiences with
              modern web technologies. Turning complex problems into elegant,
              intuitive solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="group">
                <a href="#contact">
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Interactive sphere visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[450px]"
          >
            <InteractiveSphere />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
