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
import { InjectRepository } from '@nestjs/typeorm';
import { v7 as uuidv7 } from 'uuid';
import { PaginationDto } from 'src/common/pagination/dto/paginated.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAllPosts({
    paginationDto,
  }: {
    paginationDto: PaginationDto;
  }): Promise<{
    data: Post[];
    meta: { total: number; page: number; limit: number; lastPage: number };
  }> {
    const { skip, limit, page } = paginationDto;

    const [data, total] = await this.postsRepository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page: page || 1,
        limit: limit || 10,
        lastPage: Math.ceil(total / (limit || 10)),
      },
    };
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
        author: { id: userId },
        id: uuidv7(),
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

    if (userId !== post.author.id) {
      throw new ConflictException('Apenas o autor do post pode editar.');
    }

    try {
      Object.assign(post, updatePostDto);
      await this.postsRepository.save(post);
    } catch (error) {
      this.logger.error('Failed to update post', error);
      throw error;
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

    if (post.author.id !== userId) {
      throw new ConflictException('Apenas o autor do post pode remover.');
    }

    try {
      await this.postsRepository.remove(post);
    } catch (error) {
      this.logger.error('Failed to remove post', error);
    }
  }

  private async findPostById({ id }: { id: string }): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Nao foi encontrado nenhum post no sistema.');
    }

    return post;
  }
}
