import { Injectable } from '@nestjs/common';
import { CreateNotaArquivoDto } from './dto/create-nota-arquivo.dto';
import { UpdateNotaArquivoDto } from './dto/update-nota-arquivo.dto';

@Injectable()
export class NotaArquivoService {
  create(createNotaArquivoDto: CreateNotaArquivoDto) {
    return 'This action adds a new notaArquivo';
  }

  findAll() {
    return `This action returns all notaArquivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notaArquivo`;
  }

  update(id: number, updateNotaArquivoDto: UpdateNotaArquivoDto) {
    return `This action updates a #${id} notaArquivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} notaArquivo`;
  }
}
