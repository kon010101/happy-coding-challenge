import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthController } from '../api/auth/auth.controller';
import { AuthModule } from '../api/auth/auth.module';
import { AuthService } from '../api/auth/auth.service';
import { UserController } from '../api/user/user.controller';
import { UserModule } from '../api/user/user.module';
import { UserService } from '../api/user/user.service';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot()],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class AppModule {}
