import { Board } from "./boards/boards.entity";
import { User } from "./users/users.entity";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const ormConfig: MysqlConnectionOptions = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "boardman",
  "password": "thereisnoboard",
  "database": "boardman",
  "entities": [
    User,
    Board
  ],
  "logging": true,
  "synchronize": true
};
