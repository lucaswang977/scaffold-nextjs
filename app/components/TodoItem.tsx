"use client"

import { todoItemDelete, todoItemMarkFinished } from "@/lib/actions"
import { Todo } from "@/lib/types"

const TodoItem = (props: { todo: Todo }) => {
  const todo = props.todo
  return (
    <div key={todo.id} className="flex gap-1">
      <p>{todo.text}</p>
      <p>{todo.created_at && todo.created_at.toUTCString()}</p>
      <input
        type="checkbox"
        onChange={async (ev) => {
          await todoItemMarkFinished(todo.id, ev.currentTarget.checked)
        }}
        checked={todo.finished}
      />
      <button
        onClick={async () => {
          await todoItemDelete(todo.id)
        }}
      >
        X
      </button>
    </div>
  )
}

export default TodoItem
