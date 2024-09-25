import { defineConfig } from "drizzle-kit";
import { configEnv } from "./configEnv";

export default defineConfig({
  schema: "./drizzle/database/schemas",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: configEnv.TURSO_DATABASE_URL,
    authToken: configEnv.TURSO_AUTH_TOKEN,
  },
});
