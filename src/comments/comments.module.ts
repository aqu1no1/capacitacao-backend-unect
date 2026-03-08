import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
