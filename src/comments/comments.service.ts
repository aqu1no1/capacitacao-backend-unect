import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';
import { v7 as uuidv7 } from 'uuid';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment({
    userId,
    createCommentDto,
  }: {
    userId: string;
    createCommentDto: CreateCommentDto;
  }): Promise<Comment> {
    try {
      const comment = this.commentRepository.create({
        ...createCommentDto,
        id: uuidv7(),
        user: { id: userId },
      });
      return this.commentRepository.save(comment);
    } catch (error) {
      this.logger.error('Error creating comment:', error);
      throw error;
    }
  }

  async getCommentById({ commentId }: { commentId: string }): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException('Comentario nao encontrado');
    }
    return comment;
  }

  async updateComment({
    commentId,
    updateCommentDto,
  }: {
    commentId: string;
    updateCommentDto: UpdateCommentDto;
  }) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
      });

      if (!comment) {
        throw new NotFoundException('Comentario nao encontrado');
      }

      await this.commentRepository.update(
        { id: commentId },
        { ...updateCommentDto },
      );
    } catch (error) {
      this.logger.error('Error updating comment:', error);
    }
  }

  async deleteComment({ commentId }: { commentId: string }) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
      });

      if (!comment) {
        throw new NotFoundException('Comentario nao encontrado');
      }

      await this.commentRepository.delete({ id: commentId });
    } catch (error) {
      this.logger.error('Error deleting comment:', error);
    }
  }
}
