import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv7();

  @Column({ length: 255, type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  content: string;

  @Column({ unique: true, length: 255, type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'string', length: 255 })
  authorId: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAtPost: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;
}
