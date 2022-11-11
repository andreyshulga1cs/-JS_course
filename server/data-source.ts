import "reflect-metadata"
import { User } from "./dbEntities/User"
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "js_course",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})