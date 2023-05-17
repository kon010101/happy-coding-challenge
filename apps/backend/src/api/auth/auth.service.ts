import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { LoginResult } from '@happy-coding-challenge/types';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  async login(email: string, pass: string): Promise<LoginResult> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException([`User with email ${email} not found`]);
    }

    const verified = await argon.verify(user.hash, pass);
    if (!verified) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };

    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logout(email: string, pass: string): Promise<any> {
    // todo
  }
}
