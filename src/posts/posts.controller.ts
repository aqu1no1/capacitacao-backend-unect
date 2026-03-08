import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/pagination/dto/paginated.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAllPosts(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAllPosts({ paginationDto });
  }

  @Get(':id')
  findOnePost(@Param('id') id: string) {
    return this.postsService.findOnePost({ id });
  }

  @Post(':userId')
  createPost(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost({ userId, createPostDto });
  }

  @Patch(':userId/:id')
  updatePost(
    @Param('userId') userId: string,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost({ userId, postId, updatePostDto });
  }

  @Delete(':userId/:id')
  removePost(@Param('userId') userId: string, @Param('id') postId: string) {
    return this.postsService.removePost({ userId, postId });
  }
}
