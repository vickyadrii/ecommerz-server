import pgPromise from "pg-promise";
import dotenv from "dotenv";
import { config } from "./config.js";

dotenv.config();

const pgp = pgPromise();
export const db = pgp(config.dbUrl);

// Tes koneksi
db.connect()
  .then((obj) => {
    console.log("✅ Connected to database:", obj.client.database);
    obj.done();
  })
  .catch((error) => {
    console.error("❌ Failed to connect to database:", error.message || error);
  });
