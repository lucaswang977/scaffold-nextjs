import TodoList from "@/c/business/TodoList"
import ThemeChanger from "@/c/reusable/ThemeChanger"
import { cn } from "@/l/utility"
import getConfig from "next/config"

export default function Home() {
  const { publicRuntimeConfig } = getConfig()
  const version = publicRuntimeConfig?.version

  return (
    <main
      className={cn(
        "container min-h-screen",
        "flex flex-col items-center justify-center",
      )}
    >
      <h1>Todo list sample project</h1>
      <TodoList />
      <ThemeChanger />
      <p>Current version is: {version}</p>
    </main>
  )
}
