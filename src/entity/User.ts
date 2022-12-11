import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


export enum Role{
  USER = "user",
  ADMIN = "admin",
  OWNER = "owner"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 40,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'first_name',
    length: 20,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 20,
  })
  lastName: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
