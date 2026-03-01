import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entity/post.entity';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private readonly postsRepository: Repository<Post>) {}

  async findAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findOnePost({ id }: { id: string }): Promise<Post> {
    return await this.findPostById({ id });
  }

  async createPost({
    userId,
    createPostDto,
  }: {
    userId: string;
    createPostDto: CreatePostDto;
  }): Promise<Post> {
    try {
      const createPost = this.postsRepository.create({
        ...createPostDto,
        authorId: userId,
      });
      await this.postsRepository.save(createPost);
      return createPost;
    } catch (error) {
      this.logger.error('Failed to create post', error);
      throw error;
    }
  }

  async updatePost({
    userId,
    postId,
    updatePostDto,
  }: {
    userId: string;
    postId: string;
    updatePostDto: UpdatePostDto;
  }): Promise<void> {
    const post = await this.findPostById({ id: postId });

    if (userId !== updatePostDto.authorId) {
      throw new ConflictException('Apenas o autor do post pode editar.');
    }

    try {
      Object.assign(post, updatePostDto);
      await this.postsRepository.save(post);
    } catch (error) {
      this.logger.error('Failed to update post', error);
    }
  }

  async removePost({
    userId,
    postId,
  }: {
    userId: string;
    postId: string;
  }): Promise<void> {
    const post = await this.findPostById({ id: postId });

    if (post.authorId !== userId) {
      throw new ConflictException('Apenas o autor do post pode remover.');
    }

    try {
      await this.postsRepository.remove(post);
    } catch (error) {
      this.logger.error('Failed to remove post', error);
    }
  }

  private async findPostById({ id }: { id: string }): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: id } });

    if (!post) {
      throw new NotFoundException('Nao foi encontrado nenhum post no sistema.');
    }

    return post;
  }
}
