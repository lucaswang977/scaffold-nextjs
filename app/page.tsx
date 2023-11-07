import { TodoList } from "@/components/TodoList"
import * as React from "react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Todo list sample project</h1>
      <TodoList />
    </main>
  )
}
