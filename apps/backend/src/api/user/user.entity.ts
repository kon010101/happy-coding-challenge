import { User } from '@happy-coding-challenge/types';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as argon from 'argon2';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Column({ unique: true })
  public email!: string;

  @Column()
  public firstname!: string;

  @Column()
  public lastname!: string;

  @Exclude()
  @Column()
  public password: string;

  @Column({ nullable: true, type: 'date' })
  public dateOfBirth?: Date;

  @BeforeInsert()
  async setHash(password: string) {
    try {
      const hash = await argon.hash(password || this.password);
      this.password = hash;
    } catch (err) {
      throw new Error(err);
    }
  }
}
