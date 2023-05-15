import { User } from '@happy-coding-challenge/types';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto implements User {
  @ApiProperty({ readOnly: true, format: 'uuid' })
  public readonly id!: string;

  @IsEmail()
  @ApiProperty({ example: 'firstname@lastname.com' })
  public email!: string;

  @IsString()
  @ApiProperty({ example: 'Firstname' })
  public firstname!: string;

  @IsString()
  @ApiProperty({ example: 'Lastname' })
  public lastname!: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  public hash!: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ type: Date })
  public dateOfBirth: Date;
}

export class UpdateUserDto extends PartialType(UserDto) {}
