import TodoList from "@/components/TodoList"
import cn from "@/lib/utility"
import * as React from "react"

export default function Home() {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center",
        "p-24",
        "dark:bg-black dark:text-white",
      )}
    >
      <h1>Todo list sample project</h1>
      <TodoList />
    </main>
  )
}
