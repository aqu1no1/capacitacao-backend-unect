import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plaintextPassword: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    try {
      const passwordValidation = await bcrypt.compare(
        plaintextPassword,
        user.password,
      );

      if (!passwordValidation) {
        throw new UnauthorizedException('Senha inválida');
      }
    } catch (error) {
      this.logger.error('Erro no bcrypt:', error);
      throw error;
    }

    return user;
  }

  async login({ user }: { user: LoginDto }) {
    const userValid = await this.validateUser(user.email, user.password);

    const payload = {
      sub: userValid.id,
    };

    return {
      id: userValid.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ registerDto }: { registerDto: RegisterDto }): Promise<void> {
    const { password, ...userData } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
}
