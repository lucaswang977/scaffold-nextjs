import * as React from "react"

export default function Home() {
  const dbLink = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Next.js!</h1>
      <h2>{dbLink}</h2>
    </main>
  )
}
