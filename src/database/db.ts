import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: "libsql://muse-box2-ressobe.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjA1MTQzODUsImlkIjoiZTgxZDljYjctNWZhOS00YzdhLWIxYjYtOGNmY2NlNTRkYzFiIn0.pdM6Hi44eLGuy0QWmHVdhzS3r9b4twPOlGo2bQaHLazsoFjI4iESoOkI_CmbDnX5d5t2Hq4Gr5-Fp6tOv0UbDA",
});

const db = drizzle(client, { schema });

export { db };
