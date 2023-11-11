"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/c/shadui/dropdown-menu"
import { COOKIE_THEME_NAME } from "@/l/constants"
import { clogger } from "@/l/utility"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { LucideIcon, Moon, Sun, SunMoon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type ThemeType = "light" | "dark" | "system"

const getCookieTheme = (): ThemeType => {
  const theme = getCookie(COOKIE_THEME_NAME)
  if (theme) return theme as ThemeType
  return "system"
}

const setCookieTheme = (themeInCookie: ThemeType) => {
  if (themeInCookie === "system") {
    deleteCookie(COOKIE_THEME_NAME)
  } else {
    setCookie(COOKIE_THEME_NAME, themeInCookie)
  }

  clogger.trace(`Theme set to ${themeInCookie}`)
}

const getThemeIcon = (t: ThemeType) => {
  if (t === "dark") return <Moon />
  if (t === "light") return <Sun />

  return <SunMoon />
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
      <DropdownMenu>
        <DropdownMenuTrigger>{getThemeIcon(theme)}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setThemeThenRefresh("light")}>
            Light Mode
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeThenRefresh("dark")}>
            Dark Mode
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeThenRefresh("system")}>
            Follow System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ThemeChanger
