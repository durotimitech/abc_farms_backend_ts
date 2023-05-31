import { DataSourceOptions } from "typeorm";
import { AuthToken, User, Product, WishList } from "../api/entities";

export const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, AuthToken, Product, WishList],
  migrations: ["dist/src/api/migrations/**/*.js", "src/api/migrations/**/*.ts"],
  logging: true,
  synchronize: true,
  connectTimeout: 30000,
};
