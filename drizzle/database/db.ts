import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schemas/index";

const client = createClient({
  url: process.env.VERCEL_TURSO_DATABASE_URL!,
  authToken: process.env.VERCEL_TURSO_AUTH_TOKEN!,
});

declare global {
  var db: LibSQLDatabase<typeof schema> | undefined;
}

let db: LibSQLDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(client, { schema });
} else {
  if (!global.db) {
    global.db = drizzle(client, { schema });
  }
  db = global.db;
}

export { db };
