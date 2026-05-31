'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme
} from 'next-themes'
import { useSchoolStore } from '@/lib/store'

function ThemeSync() {
  const { themeLanguage } = useSchoolStore()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    // Rehydrate Zustand store on client mount to prevent hydration mismatch
    useSchoolStore.persist.rehydrate()
  }, [])

  React.useEffect(() => {
    if (themeLanguage?.theme) {
      setTheme(themeLanguage.theme.toLowerCase())
    }
  }, [themeLanguage?.theme, setTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
