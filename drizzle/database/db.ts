import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schemas/index";

const client = createClient({
  url: "libsql://muse-box-ressobe.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQ4MzI4NTEsInAiOnsicnciOnsibnMiOlsiZGRjMzcxZDgtZTI2ZC00YzYxLWJhNGMtNWFhZWM0NzE5ZDExIl19fX0.nSZV_tWgXIVXFhtiPce1OjMK6SBF5LHqcpj9ekboC2BAMgsu3Ta4rrfvNlwZ_wBQCUpJt2-TlN5HLPgfuV0iCQ",
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
