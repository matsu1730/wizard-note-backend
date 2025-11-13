import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      return usuario;
    }
    return null;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validateUsuario(email, senha);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: usuario.id_usuario, email: usuario.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}
