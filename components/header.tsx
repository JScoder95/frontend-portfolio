"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className="text-xl font-bold gradient-text"
            onClick={(e) => scrollToSection(e, "#home")}
          >
            José Solís
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link",
                  activeSection === link.href.substring(1) && "active"
                )}
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://linkedin.com/in/josesolisdev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${
                  resolvedTheme === "dark" ? "light" : "dark"
                } mode`}
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg">
          <nav className="flex flex-col py-4 px-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-2 px-4 rounded-md transition-colors",
                  activeSection === link.href.substring(1)
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-secondary"
                )}
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-2">
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${
                    resolvedTheme === "dark" ? "light" : "dark"
                  } mode`}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
