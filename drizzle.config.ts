import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/database/",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
