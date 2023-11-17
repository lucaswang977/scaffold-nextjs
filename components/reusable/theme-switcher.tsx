"use client"

import { Button } from "@/c/shadui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/c/shadui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/c/shadui/tooltip"
import constants from "@/l/constants"
import { clogger } from "@/l/utility"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { Check, Moon, Sun, SunMoon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ThemeType = "light" | "dark" | "system"

const getCookieTheme = (): ThemeType => {
  const theme = getCookie(constants.COOKIE_THEME_NAME)
  if (theme) return theme as ThemeType
  return "system"
}

const setCookieTheme = (themeInCookie: ThemeType) => {
  if (themeInCookie === "system") {
    deleteCookie(constants.COOKIE_THEME_NAME)
  } else {
    setCookie(constants.COOKIE_THEME_NAME, themeInCookie)
  }

  clogger.trace(`Theme set to ${themeInCookie}`)
}

const getThemeNameIcon = (t: ThemeType): [string, JSX.Element] => {
  if (t === "dark") return ["Dark Mode", <Moon className="h-4 w-4" />]
  if (t === "light") return ["Light Mode", <Sun className="h-4 w-4" />]

  return ["Follow System", <SunMoon className="h-4 w-4" />]
}

function ThemeDropdownMenuItem({
  currentTheme,
  settingTheme,
  setTheme,
}: {
  currentTheme: ThemeType
  settingTheme: ThemeType
  setTheme: Dispatch<SetStateAction<ThemeType>>
}) {
  const router = useRouter()
  const setThemeThenRefresh = (themeInCookie: ThemeType) => {
    setCookieTheme(themeInCookie)
    setTheme(themeInCookie)
    router.refresh()
  }
  const [name, icon] = getThemeNameIcon(settingTheme)

  return (
    <DropdownMenuItem
      className="grid grid-cols-3"
      onClick={() => setThemeThenRefresh(settingTheme)}
    >
      <div className="col-span-2 flex space-x-2">
        {icon}
        <span>{name}</span>
      </div>
      {currentTheme === settingTheme && (
        <Check className="mr-2 h-4 w-4 justify-self-end" />
      )}
    </DropdownMenuItem>
  )
}

function useCookieTheme(
  initValue: ThemeType,
): [ThemeType, Dispatch<SetStateAction<ThemeType>>] {
  const [theme, setTheme] = useState<ThemeType>(initValue)

  useEffect(() => {
    const themeInCookie = getCookieTheme()
    setTheme(themeInCookie)
  }, [])

  return [theme, setTheme]
}

function ThemeSwitcher() {
  const [theme, setTheme] = useCookieTheme("system")
  const [name, icon] = getThemeNameIcon(theme)

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            data-testid="theme-switcher"
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            asChild
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{icon}</TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {["light", "dark", "system"].map((item) => (
            <ThemeDropdownMenuItem
              data-testid={`ts-${item}`}
              key={item}
              currentTheme={theme}
              settingTheme={item as ThemeType}
              setTheme={setTheme}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { ThemeSwitcher, useCookieTheme }
