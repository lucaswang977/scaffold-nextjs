import { Generated } from "kysely"

export interface TodoTable {
  id: Generated<string>
  text: string
  finished: boolean
  create_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface Database {
  todo: TodoTable
}
