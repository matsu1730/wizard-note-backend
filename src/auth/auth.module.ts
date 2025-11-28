import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { JWT_ISSUER, JWT_SECRET } from '../config/environment.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: JWT_SECRET!,
        signOptions: {
          issuer: JWT_ISSUER,
          expiresIn: '1h',
          algorithm: 'HS256'
        },
      }),
    }),

  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
