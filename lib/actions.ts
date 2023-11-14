"use server"

import db from "@/l/dbconn"
import { revalidateTag } from "next/cache"

export async function newTodoItem(text: string) {
  const result = await db
    .insertInto("todo")
    .values({
      text,
      finished: false,
      priority: 0,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  revalidateTag(`todo:${result.id}`)

  return result
}

export async function fetchTodoList(finished?: boolean) {
  const result =
    finished === undefined
      ? await db
          .selectFrom("todo")
          .selectAll()
          .orderBy("priority desc")
          .orderBy("created_at desc")
          .execute()
      : await db
          .selectFrom("todo")
          .selectAll()
          .orderBy("priority desc")
          .orderBy("created_at desc")
          .where("finished", "=", finished)
          .execute()

  return result
}

export async function todoItemMarkFinished(id: string, finished: boolean) {
  const result = await db
    .updateTable("todo")
    .where("id", "=", id)
    .set({ finished })
    .execute()

  revalidateTag(`todo:${id}`)

  return result.length > 0
}

export async function todoItemDelete(id: string) {
  const result = await db.deleteFrom("todo").where("id", "=", id).execute()

  revalidateTag(`todo:${id}`)

  return result.length > 0
}
