import TodoItem from "@/c/business/TodoItem"
import { fetchTodoList } from "@/l/actions"
import { Suspense } from "react"

async function RealTodoList() {
  const dataFromDB = await fetchTodoList()

  if (dataFromDB)
    return dataFromDB.map((item) => <TodoItem key={item.id} todo={item} />)
}

function TodoList() {
  return (
    <div className="flex flex-col space-y-1">
      <Suspense fallback={<p>Loading...</p>}>
        <RealTodoList />
      </Suspense>
    </div>
  )
}

export default TodoList