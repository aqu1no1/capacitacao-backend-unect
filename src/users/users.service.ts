import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[] | null> {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException('Nenhum usuario encontrado.');
    }

    return users;
  }

  async findOneUser({ id }: { id: string }): Promise<User> {
    const user = await this.findUserById({ id });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const existEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existEmail) {
      throw new ConflictException('Ja existe esse email cadastrado no sistema');
    }

    try {
      const createdUser = this.userRepository.create({
        ...createUserDto,
        id: uuidv7(),
      });
      await this.userRepository.save(createdUser);
    } catch (error) {
      this.logger.error('Erro ao criar usuário:', error);
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById({ id });

    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }

    try {
      if (updateUserDto.password) {
        const passwordHashed = await bcrypt.hash(updateUserDto.password, 10);
        updateUserDto.password = passwordHashed;
      }

      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Erro ao atualizar usuário:', error);
      throw new InternalServerErrorException('Erro ao atualizar usuário');
    }
  }

  async deleteUser(id: string) {
    const user = await this.findUserById({ id });

    if (!user) {
      throw new NotFoundException('Nenhum usuario encontrado.');
    }

    try {
      await this.userRepository.remove(user);
    } catch (error) {
      this.logger.error('Erro ao deletar usuário:', error);
      throw new InternalServerErrorException('Erro ao deletar usuário');
    }
  }

  private async findUserById({ id }: { id: string }): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new NotFoundException('Nenhum usuario encontrado.');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new NotFoundException('Nenhum usuario encontrado.');
    }

    return user;
  }
}
