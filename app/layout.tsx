import { slogger } from "@/lib/utility"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import * as React from "react"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo List Sample Project",
  description: "Todo list implemented with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")

  slogger.info(`Get theme from cookie: ${theme ? theme.value : "(system)"}`)

  let value = (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )

  if (theme !== undefined) {
    value = (
      <html lang="en" className={theme.value}>
        <body className={inter.className}>{children}</body>
      </html>
    )
  }

  return value
}
