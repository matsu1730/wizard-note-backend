import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { NotaArquivoModule } from './nota-arquivo/nota-arquivo.module';
import { NotaModule } from './nota/nota.module';
import { CategoriaModule } from './categoria/categoria.module';
import ormConfig from './config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsuarioModule,
    CategoriaModule,
    NotaModule,
    NotaArquivoModule,
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    DatabaseModule,
  ],
  providers: [AppService],
})
export class AppModule {}
