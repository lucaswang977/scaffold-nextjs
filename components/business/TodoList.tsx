import TodoItem from "@/c/business/TodoItem"
import {
  fetchTodoList,
  todoItemDelete,
  todoItemMarkFinished,
} from "@/l/actions"
import { Suspense } from "react"

async function TodoListComp({ finished }: { finished: boolean }) {
  const dataFromDB = await fetchTodoList(finished)

  if (dataFromDB)
    return dataFromDB.map((item, index) => (
      <div className="flex space-x-1">
        <TodoItem
          key={item.id}
          data={item}
          seq={index + 1}
          handleFinished={async (id, setFinished) => {
            "use server"

            await todoItemMarkFinished(id, setFinished)
          }}
          handleRemoved={async (id) => {
            "use server"

            await todoItemDelete(id)
          }}
        />
      </div>
    ))
}

function TodoList() {
  return (
    <div className="flex flex-col space-y-1">
      <Suspense fallback={<p>Loading...</p>}>
        <TodoListComp finished={false} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <TodoListComp finished />
      </Suspense>
    </div>
  )
}

export default TodoList
