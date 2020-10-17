import express, { Router } from "express";
import { BoardmanRequest } from "../utils/api";
import { Repository } from "typeorm";
import { Board } from "./boards.entity";
import * as _ from "lodash";

export function boardsRouter(repo: Repository<Board>): Router {
  const router = Router();

  router.post("/", express.json(), (req: BoardmanRequest<Board>, res) => {
    const newBoard = _.defaults({ userId: req.user.sub }, req.body);
    repo.save(repo.create(newBoard)).then(board => res.send(board));
  });

  router.get("/", (req, res) => {
    const userId = req.query.userId as string;
    const query = userId ? { userId } : {};
    repo.find(query).then(boards => res.send(boards));
  });

  router.delete("/:id", (req, res) => {
    repo.delete(req.params.id).then(() => res.sendStatus(204));
  });

  return router;
}
