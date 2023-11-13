"use client"

import { Button } from "@/c/shadui/button"
import { Input } from "@/c/shadui/input"
import { newTodoItem } from "@/l/actions"
import * as React from "react"

function NewTodo() {
  const [text, setText] = React.useState("")

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        value={text}
        placeholder="What are you going to do today..."
        onChange={(v) => {
          setText(v.currentTarget.value)
        }}
      />
      <Button
        type="button"
        onClick={async () => {
          await newTodoItem(text)
        }}
      >
        Add
      </Button>
    </div>
  )
}

export default NewTodo
