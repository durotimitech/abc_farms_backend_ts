import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRoleTypes {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users_abc_ts")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  telephone: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRoleTypes, default:UserRoleTypes.USER })
  role: UserRoleTypes;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
