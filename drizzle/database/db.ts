import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schemas/index";

const client = createClient({
  url: "libsql://muse-box-ressobe.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjcwOTU0MzUsImlkIjoiMDMwN2VjYmUtNjY5Mi00YjI2LWIxOTUtMjNhMzEwMTVkNjc4In0.dXKwKRTldkvN1g1oXW-YXHrI0vm45GbqdIGH2LJA_aDtcBeAh0e6N1RNm1utmm4tH4RHYzUUDiyxtYCW1tPBDg",
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
