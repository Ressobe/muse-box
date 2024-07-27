import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: "libsql://muse-box-ressobe.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjE5MTA5NDYsImlkIjoiMTY1MzQ0YTEtZTZiNi00MzUzLTg3ZTMtNTU1YjA2NzQ5ZjJlIn0.5dOv_ppHxVIL5HQeaIXDf5hhYpl4a9mpGfoP6AbctjFOv8dBrW4ow3CyT3B-MkxEvtNSguCBlN1pXuOSlrYHAw",
});

const db = drizzle(client, { schema });

export { db };
