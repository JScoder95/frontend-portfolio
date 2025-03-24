"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <Link
            href="#home"
            className="text-2xl font-bold gradient-text mb-6"
            onClick={(e) => scrollToSection(e, "#home")}
          >
            José Solís
          </Link>

          <div className="flex space-x-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://linkedin.com/in/josesolisdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:cotosolis.d@gmail.com" aria-label="Email Me">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Home", "About", "Skills", "Experience", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                >
                  {item}
                </Link>
              )
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              &copy; {currentYear} José Solís. All rights reserved.
            </p>
            <p>Designed and built with ❤️ using Next.js and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
