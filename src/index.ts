import express from "express";
import { createConnection } from "typeorm";
import { boardsRouter } from "./boards/boards.router";
import { Board } from "./boards/boards.entity";

createConnection().then(conn => {
  const boardsRepository = conn.getRepository(Board);

  const app = express();
  app.use("/boards", boardsRouter(boardsRepository));

  const port = 8080;
  app.listen(port, () => console.log(`Server started on port ${port}.`));
});

