import NewTodo from "@/components/NewTodo"
import TodoItem from "@/components/TodoItem"
import { fetchTodoList } from "@/lib/actions"

export const TodoList = async () => {
  const dataFromDB = await fetchTodoList()
  return (
    <div className="flex flex-col gap-1">
      <NewTodo />
      {dataFromDB &&
        dataFromDB.map((item) => {
          return <TodoItem key={item.id} todo={item} />
        })}
    </div>
  )
}
