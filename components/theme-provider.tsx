"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // During SSR and before hydration, render a simple provider
    // that doesn't do any theme switching
    return <>{children}</>
  }

  return (
    <NextThemesProvider {...props} enableSystem={true} enableColorScheme={true} forcedTheme={undefined}>
      {children}
    </NextThemesProvider>
  )
}

