import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(50, {
    message: 'Content must be at least 50 characters long',
  })
  content?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
