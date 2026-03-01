import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: Repository<User>) {}

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
      const createdUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(createdUser);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById({ id });

    if (user) {
      throw new ConflictException('Ja existe esse usuario no sistema');
    }

    try {
      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
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
      console.error(error);
      throw new InternalServerErrorException('Erro ao deletar usuário');
    }
  }

  private async findUserById({ id }: { id: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('Nenhum usuario encontrado.');
    }

    return user;
  }
}
