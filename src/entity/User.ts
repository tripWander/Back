import { dataSource } from '@src/db';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 20,
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

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

export const userRepository = dataSource.getRepository(User);
