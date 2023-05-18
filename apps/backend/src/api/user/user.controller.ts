import { User } from '@happy-coding-challenge/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { ErrorDto } from '../../app/error.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto, UserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserDto, isArray: true })
  public async getUsers(): Promise<Omit<User, 'hash'>[]> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({ type: UserDto })
  public async createUser(@Body() body: UserDto): Promise<Omit<User, 'hash'>> {
    return this.userService.createUser(body);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: UserDto })
  public async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async deleteUserById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.userService.deleteUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUserById(id, data);
  }
}
