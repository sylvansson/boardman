import express, { Router } from "express";
import { BoardmanRequest } from "../utils/api";
import { Repository } from "typeorm";
import { User } from "./users.entity";

export function usersRouter(repo: Repository<User>): Router {
  const router = Router();

  router.post("/", express.json(), (req: BoardmanRequest<User>, res) => {
    repo.save(repo.create(req.body)).then(user => res.send(user));
  });

  return router;
}
