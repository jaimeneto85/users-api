import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "User's name" })
  @IsString()
  @IsNotEmpty({ message: "User's name can't be empty" })
  name: string;

  @ApiProperty({ description: "User's email" })
  @IsEmail({}, { message: "User's email must be valid" })
  email: string;

  @ApiProperty({ description: "User's password" })
  @IsString()
  @MinLength(6, { message: "User's password must be at least 6 characters" })
  password: string;
}
