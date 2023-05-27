import { DataSource } from "typeorm";
import { config } from "./ormconfig";

export const dataSource = new DataSource(config);
