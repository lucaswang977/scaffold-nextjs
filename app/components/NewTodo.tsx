"use client"

import { newTodoItem } from "@/lib/actions"
import { useRouter } from "next/navigation"
import * as React from "react"

const NewTodo = () => {
  const [text, setText] = React.useState("")
  const router = useRouter()

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
          router.refresh()
        }}
      >
        Add
      </button>
    </div>
  )
}

export default NewTodo
