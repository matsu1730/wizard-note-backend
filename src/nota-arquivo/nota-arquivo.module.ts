import { Module } from '@nestjs/common';
import { NotaArquivoService } from './nota-arquivo.service';
import { NotaArquivoController } from './nota-arquivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaArquivo } from './entities/nota-arquivo.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([NotaArquivo])
  ],
  controllers: [NotaArquivoController],
  providers: [NotaArquivoService],
})
export class NotaArquivoModule {}
