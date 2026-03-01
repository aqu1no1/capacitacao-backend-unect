import { Post } from 'src/posts/entity/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv7();

  @Column({ length: 50, type: 'varchar' })
  name: string;

  @Column({ unique: true, length: 60, type: 'varchar' })
  email: string;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.authorId)
  posts: Post[];
}
