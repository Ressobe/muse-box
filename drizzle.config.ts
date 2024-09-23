import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/database/schemas",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: "libsql://muse-box-ressobe.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjcwOTU0MzUsImlkIjoiMDMwN2VjYmUtNjY5Mi00YjI2LWIxOTUtMjNhMzEwMTVkNjc4In0.dXKwKRTldkvN1g1oXW-YXHrI0vm45GbqdIGH2LJA_aDtcBeAh0e6N1RNm1utmm4tH4RHYzUUDiyxtYCW1tPBDg",
  },
});
