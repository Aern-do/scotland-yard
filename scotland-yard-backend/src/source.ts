import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Init1761488906985 } from "./migrations/1761488906985-Init";
import { Game } from "./entities/Game";
import { Game1761493997715 } from "./migrations/1761493997715-Game";

export const MainDataSource = new DataSource({
  type: "better-sqlite3",
  database: "local.db",
  entities: [User, Game],
  migrations: [Init1761488906985, Game1761493997715]
});
