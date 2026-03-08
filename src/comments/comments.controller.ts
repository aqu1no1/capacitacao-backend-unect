import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { User } from '../auth/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(
    @User('id') userId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment({ userId, createCommentDto });
  }

  @Get(':id')
  getCommentById(@Param('id') commentId: string) {
    return this.commentsService.getCommentById({ commentId });
  }

  @Patch(':id')
  updateComment(
    @Param('id') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment({ commentId, updateCommentDto });
  }

  @Delete(':id')
  deleteComment(@Param('id') commentId: string) {
    return this.commentsService.deleteComment({ commentId });
  }
}
