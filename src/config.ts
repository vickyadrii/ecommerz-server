import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 3000),
  dbUrl:
    process.env.DATABASE_URL || `postgres://${process.env.DATABASE_USER}${process.env.DATABASE_PASSWORD ? `:${process.env.DATABASE_PASSWORD}` : ""}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
};
