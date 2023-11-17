import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://devenv:3000",
  },
})
