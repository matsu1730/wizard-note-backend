import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class LoginRequestDto {
  email: string;
  senha: string;
}

class LoginResponseDto {
  accessToken: string;
  expiresIn: number;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login de usuário.',
    description: 'Autentica o usuário retornando token de acesso JWT.',
  })
  @ApiBody({
    description: 'Dados para autenticação do usuário',
    type: LoginRequestDto,
    examples: {
      valid: {
        value: {
          email: 'usuario@email.com',
          senha: 'senha123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso. Token JWT retornado.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '[translate:Payload inválido]',
  })
  async login(@Body() body: { email: string; senha: string }) {
    if (!body.email || !body.senha) {
      throw new BadRequestException('[translate:Payload inválido]');
    }
    return this.authService.login(body.email, body.senha);
  }
}
