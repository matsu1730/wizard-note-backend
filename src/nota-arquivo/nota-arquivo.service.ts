import { Injectable } from '@nestjs/common';
import { CreateNotaArquivoDto } from './dto/create-nota-arquivo.dto';
import { UpdateNotaArquivoDto } from './dto/update-nota-arquivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotaArquivo } from './entities/nota-arquivo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotaArquivoService {
  constructor(
    @InjectRepository(NotaArquivo) private readonly notaArquivoRepository: Repository<NotaArquivo>
  ) {}

  async create(createNotaArquivoDto: CreateNotaArquivoDto) {
    const buffer = Buffer.from(createNotaArquivoDto.arquivo, 'base64');
    const notaArquivo = this.notaArquivoRepository.create({
      ...createNotaArquivoDto,
      arquivo: buffer
    });
    return await this.notaArquivoRepository.save(notaArquivo);
  }

  async findAll() {
    return await this.notaArquivoRepository.find();
  }

  async findOne(id: number) {
    return this.notaArquivoRepository.findOne({ where: { id_nota_arquivo: id } });
  }

  async update(id: number, updateNotaArquivoDto: UpdateNotaArquivoDto) {
    let updateObject = {
      id_nota: updateNotaArquivoDto.id_nota,
      nome_arquivo: updateNotaArquivoDto.nome_arquivo,
      arquivo: Buffer.from(updateNotaArquivoDto.arquivo??'', 'base64')
    }
    return await this.notaArquivoRepository.update(id, updateObject);
  }

  async remove(id: number) {
    return await this.notaArquivoRepository.delete(id);
  }
}
