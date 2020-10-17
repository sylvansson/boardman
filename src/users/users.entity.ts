import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Board } from "../boards/boards.entity";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Board, board => board.user)
  boards: Board[];
}
