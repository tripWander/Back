import { IsEmail, IsInt, IsOptional, Length, Min } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 20,
  })
  @IsEmail()
  email: string;

  @Column()
  @Length(8, 20)
  password: string;

  @Column({
    length: 20,
  })
  @IsOptional()
  @Length(8, 20)
  firstName: string;

  @Column({
    length: 20,
  })
  @IsOptional()
  @Length(8, 20)
  lastName: string;

  @Column({
    type: 'int',
  })
  @IsInt()
  @Min(16)
  age: number;
}
