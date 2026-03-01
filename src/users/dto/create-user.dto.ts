import { IsEmail, IsNotEmpty, IsString, Max, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Max(50, {
    message: 'Password must be at most 50 characters long',
  })
  password: string;
}
