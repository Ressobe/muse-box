import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: "libsql://muse-box-2-ressobe.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQzMTUxNjIsInAiOnsicnciOnsibnMiOlsiMmM4NzlkZmMtOTkyOC00YzJmLTg1ODMtYWMzNGZiYTVmYmY0Il19fX0.T_-HIIa52AvjCkj4H0ulRfHa7fumkxJJiqhxMMz3UiyiVt0PGzQP1_Uv_Xc-gBzkdke0r5n52oxRvJeu2NEtCA",
});

const db = drizzle(client, { schema });

export { db };
