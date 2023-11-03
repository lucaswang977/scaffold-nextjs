import envVariables from "@/lib/env"
import { Database } from "@/lib/types"
import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"

const dialect = new PostgresDialect({
  pool: new Pool({
    database: envVariables.PG_DB,
    host: envVariables.PG_HOST,
    user: envVariables.PG_USER,
    port: envVariables.PG_PORT,
    max: 10,
  }),
})

export const db = new Kysely<Database>({
  dialect,
})
