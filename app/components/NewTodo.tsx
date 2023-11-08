"use client"

import { newTodoItem } from "@/lib/actions"
import * as React from "react"

const NewTodo = () => {
  const [text, setText] = React.useState("")

  return (
    <div className="flex gap-1">
      <input
        type="text"
        value={text}
        onChange={(v) => {
          setText(v.currentTarget.value)
        }}
        className="rounded-sm border-b-[1px] border-gray-500"
      />
      <button
        onClick={async () => {
          await newTodoItem(text)
        }}
      >
        Add
      </button>
    </div>
  )
}

export default NewTodo
