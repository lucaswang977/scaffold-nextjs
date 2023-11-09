import NewTodo from "@/components/NewTodo"
import TodoItem from "@/components/TodoItem"
import { fetchTodoList } from "@/lib/actions"

async function TodoList() {
  const dataFromDB = await fetchTodoList()
  return (
    <div className="flex flex-col gap-1">
      <NewTodo />
      {dataFromDB &&
        dataFromDB.map((item) => <TodoItem key={item.id} todo={item} />)}
    </div>
  )
}

export default TodoList
