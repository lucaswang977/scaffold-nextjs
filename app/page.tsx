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
        "flex flex-col items-center justify-between",
      )}
    >
      <div />
      <div className="flex flex-col items-center space-y-2">
        <NewTodo />
        <TodoList />
      </div>
      <div className="mb-3 flex flex-col items-center space-y-1 text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <p>v{version}</p>
          <ThemeChanger />
        </div>
        <p>A small todo list app written using Next.js 14</p>
      </div>
    </main>
  )
}
