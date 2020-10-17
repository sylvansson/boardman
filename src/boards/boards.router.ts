import express, { Router } from "express";
import { BoardmanRequest } from "../utils/api";
import { Repository } from "typeorm";
import { Board } from "./boards.entity";

export function boardsRouter(repo: Repository<Board>): Router {
  const router = Router();

  router.post("/", express.json(), (req: BoardmanRequest<Board>, res) => {
    repo.save(repo.create(req.body)).then(board => res.send(board));
  });

  router.get("/", (req, res) => {
    repo.find().then(boards => res.send(boards));
  });

  router.delete("/:id", (req, res) => {
    repo.delete(req.params.id).then(() => res.sendStatus(204));
  });

  return router;
}
