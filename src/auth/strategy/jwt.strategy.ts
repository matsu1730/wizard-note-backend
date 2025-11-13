import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { AuthUsuarioDto } from '../../usuario/dto/auth-usuario.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Usuario) private userRepository: Repository<Usuario>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '16e74b5b36616640d0d4817acd9a5463',
    });
  }

  async validate(payload: any): Promise<AuthUsuarioDto|null> {
    const usuario = await this.userRepository.findOne({ where: { id_usuario: Number(payload.sub) } });
    if (!usuario) return null;
    return new AuthUsuarioDto(usuario);
  }
}
