import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { NotaArquivoModule } from './nota-arquivo/nota-arquivo.module';
import { NotaModule } from './nota/nota.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [UsuarioModule, CategoriaModule, NotaModule, NotaArquivoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
