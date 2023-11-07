"use server"

import { db } from "@/lib/dbconn"

export async function newTodoItem(text: string) {
  const result = await db
    .insertInto("todo")
    .values({
      text: text,
      finished: false,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  return result
}

export async function fetchTodoList() {
  const result = await db.selectFrom("todo").selectAll().execute()
  return result
}
