import { promises as fs } from "fs"
import * as path from "path"
import { Database } from "@/lib/types"
import { logger } from "@/lib/utility"
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
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
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
      logger.info(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === "Error") {
      logger.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    logger.error("failed to migrate")
    logger.error(error)
    process.exit(1)
  }

  logger.info("Database migration finished.")

  await db.destroy()
}

migrateToLatest()
