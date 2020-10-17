import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @RelationId((b: Board) => b.user)
  userId: string;

  @ManyToOne(() => User, user => user.boards, { onDelete: "CASCADE" })
  user: User;
}
