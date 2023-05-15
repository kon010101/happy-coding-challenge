import { Injectable } from '@nestjs/common';
import { User } from '../../../../../libs/types/src';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      dateOfBirth: new Date('1989-09-25T07:38:55.652Z'),
      firstname: 'Konrad',
      lastname: 'Weiss',
      hash: '$argon2id$v=19$m=65536,t=3,p=4$uWGwCMkOe2Q4TAcs31AlFQ$qItPYh1b8DuOKDdJTa6D4U4g5FB40HAds1M6FcgkAiY',
      email: 'konradweiss@gmx.de',
    },
  ];

  public getUsers(): Omit<User, 'hash'>[] {
    return this.users.map((user) => {
      const { hash, ...userData } = user;

      return userData;
    });
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
