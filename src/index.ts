import express from "express";
import { createConnection } from "typeorm";
import { boardsRouter } from "./boards/boards.router";
import { Board } from "./boards/boards.entity";
import { usersRouter } from "./users/users.router";
import { User } from "./users/users.entity";
import { ormConfig } from "./ormconfig";
import { auth } from "./config";
import jwt from "express-jwt";

declare global {
  namespace Express {
    interface DecodedToken {
      // The caller's user id.
      sub: string;
    }

    interface Request {
      user?: DecodedToken;
    }
  }
}

createConnection(ormConfig).then(conn => {
  const boardsRepository = conn.getRepository(Board);
  const usersRepository = conn.getRepository(User);

  const app = express();
  app.use(jwt({ secret: auth.secret, algorithms: ["HS256"] }));
  app.use("/boards", boardsRouter(boardsRepository));
  app.use("/users", usersRouter(usersRepository));

  const port = 8080;
  app.listen(port, () => console.log(`Server started on port ${port}.`));
});

