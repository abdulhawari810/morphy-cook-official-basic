import dotenv from "dotenv";

dotenv.config();

export default {
    client: "mysql2",

    connection: {
      host: process.env.APP_DATABASE_HOST,
      port: process.env.APP_DATABASE_PORT || 3306,
      user: process.env.APP_DATABASE_USERNAME,
      password: process.env.APP_DATABASE_PASSWORD,
      database: process.env.APP_DATABASE_NAME,
    },

    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeders",
    },
};
