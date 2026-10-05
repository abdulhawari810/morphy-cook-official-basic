import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.APP_DATABASE_NAME,
  process.env.APP_DATABASE_USERNAME,
  process.env.APP_DATABASE_PASSWORD,
  {
    host:
      process.env.APP_ENVIRONMENT === "production"
        ? process.env.APP_DATABASE_HOST
        : "localhost",
    dialect: "mysql",
  },
);

export default db;
