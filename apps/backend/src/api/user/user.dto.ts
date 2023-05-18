import { User } from '@happy-coding-challenge/types';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserDto implements User {
  @ApiProperty({ readOnly: true, format: 'uuid' })
  public readonly id!: string;

  @IsEmail()
  @ApiProperty({ example: 'firstname@lastname.com' })
  public email!: string;

  @IsString()
  @Length(0, 50)
  @ApiProperty({ example: 'Firstname' })
  public firstname!: string;

  @IsString()
  @Length(0, 50)
  @ApiProperty({ example: 'Lastname' })
  public lastname!: string;

  @IsString()
  @Length(5, 100)
  @ApiProperty({ example: 'password' })
  public password!: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ type: Date })
  public dateOfBirth: Date;
}

export class UpdateUserDto extends PartialType(UserDto) {}
