import ThemeChanger from "@/components/ThemeChanger"
import TodoList from "@/components/TodoList"
import { cn } from "@/lib/utility"
import getConfig from "next/config"

export default function Home() {
  const { publicRuntimeConfig } = getConfig()
  const version = publicRuntimeConfig?.version

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center",
        "p-24",
      )}
    >
      <h1>Todo list sample project</h1>
      <TodoList />
      <ThemeChanger />
      <p>Current version is: {version}</p>
    </main>
  )
}
