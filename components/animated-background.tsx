"use client"

import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calculate parallax effect based on scroll position
  const parallaxFactor = 0.05
  const blob1Style = {
    transform: `translate(${scrollPosition * parallaxFactor * 0.5}px, ${scrollPosition * parallaxFactor * -0.3}px)`,
  }

  const blob2Style = {
    transform: `translate(${scrollPosition * parallaxFactor * -0.4}px, ${scrollPosition * parallaxFactor * 0.2}px)`,
  }

  const blob3Style = {
    transform: `translate(${scrollPosition * parallaxFactor * 0.2}px, ${scrollPosition * parallaxFactor * 0.4}px)`,
  }

  return (
    <div className="animated-background">
      <div className="blob blob-1" style={blob1Style}></div>
      <div className="blob blob-2" style={blob2Style}></div>
      <div className="blob blob-3" style={blob3Style}></div>
    </div>
  )
}

