"use client"

import { Todo } from "@/lib/types"

const TodoItem = (props: { todo: Todo }) => {
  const todo = props.todo
  return (
    <div key={todo.id} className="flex gap-1">
      <p>{todo.text}</p>
      <p>{todo.finished}</p>
      <p>{todo.create_at && todo.create_at.toLocaleDateString()}</p>
    </div>
  )
}

export default TodoItem
