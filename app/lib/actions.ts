"use server"

import { db } from "@/lib/dbconn"
import { revalidateTag } from "next/cache"

export async function newTodoItem(text: string) {
  const result = await db
    .insertInto("todo")
    .values({
      text: text,
      finished: false,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidateTag(`todo:${result.id}`)

  return result
}

export async function fetchTodoList() {
  const result = await db
    .selectFrom("todo")
    .selectAll()
    .orderBy("created_at desc")
    .execute()
  return result
}

export async function todoItemMarkFinished(id: string, finished: boolean) {
  const result = await db
    .updateTable("todo")
    .where("id", "=", id)
    .set({ finished: finished })
    .execute()

  revalidateTag(`todo:${id}`)

  return result.length > 0
}

export async function todoItemDelete(id: string) {
  const result = await db.deleteFrom("todo").where("id", "=", id).execute()

  revalidateTag(`todo:${id}`)

  return result.length > 0
}
