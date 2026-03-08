import { Comment } from 'src/comments/entity/comment.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('posts')
export class Post {
  @PrimaryColumn({ type: 'varchar', length: '36', name: 'id' })
  id: string = uuidv7();

  @Column({ length: 255, type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'content' })
  content?: string;

  @Column({
    unique: true,
    length: 255,
    type: 'varchar',
    nullable: true,
    name: 'slug',
  })
  slug?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
