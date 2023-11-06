import { promises as fs } from "fs"
import * as path from "path"
import { Database } from "@/lib/types"
import * as dotenv from "dotenv"
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely"
import { Pool } from "pg"

dotenv.config()

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
    password: process.env.PG_PASSWORD,
    max: 10,
  }),
})

const db = new Kysely<Database>({
  dialect,
})

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error("failed to migrate")
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
