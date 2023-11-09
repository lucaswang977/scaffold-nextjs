"use client"

import { ThemeProvider, useTheme } from "next-themes"

function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      The current theme is: {theme}
      <button type="button" onClick={() => setTheme("light")}>
        Light Mode
      </button>
      <button type="button" onClick={() => setTheme("dark")}>
        Dark Mode
      </button>
    </div>
  )
}

export { ThemeProvider, ThemeChanger }
