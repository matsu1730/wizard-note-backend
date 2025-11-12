import { Module } from '@nestjs/common';
import { NotaArquivoService } from './nota-arquivo.service';
import { NotaArquivoController } from './nota-arquivo.controller';

@Module({
  controllers: [NotaArquivoController],
  providers: [NotaArquivoService],
})
export class NotaArquivoModule {}
