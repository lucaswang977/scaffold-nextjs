"use client"

import { clogger } from "@/l/utility"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type ThemeType = "light" | "dark" | "system"

const getCookieTheme = (): ThemeType => {
  const theme = getCookie("theme")
  if (theme) return theme as ThemeType
  return "system"
}

const setCookieTheme = (themeInCookie: ThemeType) => {
  if (themeInCookie === "system") {
    deleteCookie("theme")
  } else {
    setCookie("theme", themeInCookie)
  }

  clogger.trace(`Theme set to ${themeInCookie}`)
}

function ThemeChanger() {
  const router = useRouter()
  const [theme, setTheme] = useState<ThemeType>("system")

  useEffect(() => {
    const themeInCookie = getCookieTheme()
    setTheme(themeInCookie)
  }, [])

  const setThemeThenRefresh = (themeInCookie: ThemeType) => {
    setCookieTheme(themeInCookie)
    setTheme(themeInCookie)
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      The current theme is: {theme}
      <button type="button" onClick={() => setThemeThenRefresh("light")}>
        Light Mode
      </button>
      <button type="button" onClick={() => setThemeThenRefresh("dark")}>
        Dark Mode
      </button>
      <button type="button" onClick={() => setThemeThenRefresh("system")}>
        System
      </button>
    </div>
  )
}

export default ThemeChanger
