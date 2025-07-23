import path from "path";
import fs from "fs";
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL!);

const migrationsDir = path.resolve("migrations");

async function runMigrations() {
  const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith(".sql"));

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");
    console.log(`Running migration: ${file}`);
    try {
      await db.none(sql);
      console.log(`Migration ${file} executed successfully.`);
    } catch (err) {
      console.error(`Failed to execute migration ${file}:`, err);
      process.exit(1);
    }
  }

  pgp.end();
}

runMigrations();
