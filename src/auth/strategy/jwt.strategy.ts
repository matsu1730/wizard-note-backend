import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { AuthUsuarioDto } from '../../usuario/dto/auth-usuario.dto';
import { JWT_ISSUER, JWT_SECRET } from '../../config/environment.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Usuario) private userRepository: Repository<Usuario>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      issuer: JWT_ISSUER,
      algorithms: ['HS256'],
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<AuthUsuarioDto|null> {
    const usuario = await this.userRepository.findOne({ where: { id_usuario: Number(payload.sub) } });
    if (!usuario) return null;
    return new AuthUsuarioDto(usuario);
  }
}
