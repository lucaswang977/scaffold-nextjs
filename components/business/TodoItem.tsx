"use client"

import { todoItemDelete, todoItemMarkFinished } from "@/l/actions"
import { Todo } from "@/l/types"

function TodoItem(props: { todo: Todo }) {
  const { todo } = props
  return (
    <div key={todo.id} className="flex gap-1">
      <p>{todo.text}</p>
      <input
        type="checkbox"
        onChange={async (ev) => {
          await todoItemMarkFinished(todo.id, ev.currentTarget.checked)
        }}
        checked={todo.finished}
      />
      <button
        type="button"
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
