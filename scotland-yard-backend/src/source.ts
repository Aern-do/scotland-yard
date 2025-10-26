import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Init1761488906985 } from "./migrations/1761488906985-Init";

export const MainDataSource = new DataSource({
  type: "better-sqlite3",
  database: "local.db",
  entities: [User],
  migrations: [Init1761488906985]
});
