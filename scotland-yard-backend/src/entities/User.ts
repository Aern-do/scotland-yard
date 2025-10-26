import { verify } from "@node-rs/argon2";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;
  @Column()
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  async validatePassword(password: string): Promise<boolean> {
    return verify(this.passwordHash, password);
  }
}
