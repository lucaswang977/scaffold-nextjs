import { z } from "zod"

const envSchema = z.object({
  PG_HOST: z.string().trim().min(1),
  PG_DB: z.string().trim().min(1),
  PG_PORT: z.number().default(5432),
  PG_USER: z.string().trim().min(1),
  PG_PASSWORD: z.string().trim().min(1),
})

const envSchemaParser = envSchema.safeParse({
  PG_HOST: process.env.PG_HOST,
  PG_DB: process.env.PG_DB,
  PG_PORT: process.env.PG_PORT,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
})

console.log(process.env)

if (!envSchemaParser.success) {
  throw new Error("Server side environment variables parsing failed.")
}

const envVariables = envSchemaParser.data

export default envVariables
