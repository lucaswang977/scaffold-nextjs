import NewTodo from "@/components/NewTodo"
import TodoItem from "@/components/TodoItem"
import { fetchTodoList } from "@/lib/actions"
import { Suspense } from "react"

async function RealTodoList() {
  const dataFromDB = await fetchTodoList()

  if (dataFromDB)
    return dataFromDB.map((item) => <TodoItem key={item.id} todo={item} />)
}

function TodoList() {
  return (
    <div className="flex flex-col gap-1">
      <NewTodo />
      <Suspense fallback={<p className="dark:text-white">Loading...</p>}>
        <RealTodoList />
      </Suspense>
    </div>
  )
}

export default TodoList
