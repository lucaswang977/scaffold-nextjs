"use client"

import { Button } from "@/c/shadui/button"
import { Checkbox } from "@/c/shadui/checkbox"
import { todoItemDelete, todoItemMarkFinished } from "@/l/actions"
import { Todo } from "@/l/types"
import { cn } from "@/l/utility"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Trash2 } from "lucide-react"
import { useState } from "react"

dayjs.extend(relativeTime)

function TodoItem({ todo, seq }: { todo: Todo; seq: number }) {
  const [edit, setEdit] = useState<undefined | string>()
  return (
    <div key={todo.id} className="group flex space-x-1">
      <div className="flex items-center space-x-1 opacity-0 transition-all group-hover:opacity-100">
        <Checkbox
          onChange={async (ev) => {
            await todoItemMarkFinished(
              todo.id,
              (ev.currentTarget as HTMLInputElement).checked,
            )
          }}
          checked={todo.finished}
        />
        <Button
          onClick={async () => {
            await todoItemDelete(todo.id)
          }}
          variant="ghost"
          size="icon"
          className="h-4 w-4"
        >
          <Trash2 />
        </Button>
      </div>
      <div
        className={cn(
          todo.finished ? "text-secondary line-through" : "",
          "flex space-x-2",
          "items-center",
        )}
      >
        <span>{seq}.</span>
        <span
          onDoubleClick={() => {
            setEdit(todo.id)
          }}
        >
          {edit === todo.id ? (
            <input
              type="text"
              value={todo.text}
              className="max-w-xl border-b-[1px] border-b-current outline-none"
              onBlur={() => {
                setEdit(undefined)
              }}
            />
          ) : (
            todo.text
          )}
        </span>
        {edit !== todo.id && (
          <span
            className={cn("text-xs", todo.finished ? "" : "text-slate-300")}
          >
            {dayjs(todo.created_at).fromNow()}
          </span>
        )}
      </div>
    </div>
  )
}

export default TodoItem
