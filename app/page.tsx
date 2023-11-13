import NewTodo from "@/c/business/NewTodo"
import TodoList from "@/c/business/TodoList"
import { ThemeChanger } from "@/c/reusable/theme-changer"
import { cn } from "@/l/utility"
import getConfig from "next/config"

export default function Home() {
  const { publicRuntimeConfig } = getConfig()
  const version = publicRuntimeConfig?.version

  return (
    <main
      className={cn(
        "container min-h-screen",
        "flex flex-col items-center justify-center space-y-2",
      )}
    >
      <NewTodo />
      <TodoList />
      <div className="absolute bottom-1 mb-4 flex items-center gap-2 text-sm text-gray-500">
        <p>v{version}</p>
        <ThemeChanger />
      </div>
    </main>
  )
}
