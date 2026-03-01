import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @MinLength(50, {
    message: 'Content must be at least 50 characters long',
  })
  content: string;

  @IsString()
  slug: string;

  @IsDate()
  @Type(() => Date)
  createdAtPost: Date;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  authorId: string;
}
