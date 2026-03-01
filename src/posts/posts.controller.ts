import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findOnePost(@Param('id') id: string) {
    return this.postsService.findOnePost({ id });
  }

  @Post(':id')
  createPost(
    @Param('id') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost({ userId, createPostDto });
  }

  @Patch(':id')
  updatePost(
    @Param('id') userId: string,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost({ userId, postId, updatePostDto });
  }

  @Delete(':id')
  removePost(@Param('id') userId: string, @Param('id') postId: string) {
    return this.postsService.removePost({ userId, postId });
  }
}
