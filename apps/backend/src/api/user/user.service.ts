import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@happy-coding-challenge/types';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException([`User with email ${email} not found`]);
    }

    return user;
  }

  public async findUserById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException([`User with id ${id} not found`]);
    }

    return user;
  }

  public async createUser(data: User): Promise<User> {
    const existingUser = await this.repository.findOneBy({ email: data.email });
    if (existingUser) {
      throw new ForbiddenException(['Email already exists']);
    }

    const user = this.repository.create(data);
    await this.repository.save(user);

    return user;
  }

  public async updateUserById(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException([`User with id ${id} not found`]);
    }

    await this.repository.update(id, data);

    return this.findUserById(id);
  }

  public async deleteUserById(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException([`User with id ${id} not found`]);
    }

    return result;
  }
}
