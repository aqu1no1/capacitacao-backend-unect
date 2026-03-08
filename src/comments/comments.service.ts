import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';
import { v7 as uuidv7 } from 'uuid';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment({
    createCommentDto,
  }: {
    createCommentDto: CreateCommentDto;
  }): Promise<Comment> {
    try {
      const comment = this.commentRepository.create({
        ...createCommentDto,
        id: uuidv7(),
      });
      return this.commentRepository.save(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
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
      console.error('Error updating comment:', error);
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
      console.error('Error deleting comment:', error);
    }
  }
}
