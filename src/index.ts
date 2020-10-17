import express from "express";
import { createConnection } from "typeorm";
import { boardsRouter } from "./boards/boards.router";
import { Board } from "./boards/boards.entity";
import { usersRouter } from "./users/users.router";
import { User } from "./users/users.entity";
import { ormConfig } from "./ormconfig";

createConnection(ormConfig).then(conn => {
  const boardsRepository = conn.getRepository(Board);
  const usersRepository = conn.getRepository(User);

  const app = express();
  app.use("/boards", boardsRouter(boardsRepository));
  app.use("/users", usersRouter(usersRepository));

  const port = 8080;
  app.listen(port, () => console.log(`Server started on port ${port}.`));
});

