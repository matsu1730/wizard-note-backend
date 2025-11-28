import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaArquivoDto } from './dto/create-nota-arquivo.dto';
import { UpdateNotaArquivoDto } from './dto/update-nota-arquivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotaArquivo } from './entities/nota-arquivo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { NotaArquivoDto } from './dto/nota-arquivo.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';

@Injectable()
export class NotaArquivoService {
  constructor(
    @InjectRepository(NotaArquivo)
    private readonly notaArquivoRepository: Repository<NotaArquivo>,
  ) {}

  async create(
    createNotaArquivoDto: CreateNotaArquivoDto,
  ): Promise<NotaArquivoDto> {
    const buffer = Buffer.from(createNotaArquivoDto.arquivo, 'base64');
    let notaArquivo: NotaArquivo = this.notaArquivoRepository.create({
      ...createNotaArquivoDto,
      arquivo: buffer,
    });
    notaArquivo = await this.notaArquivoRepository.save(notaArquivo);
    return new NotaArquivoDto(notaArquivo);
  }

  async findAll(): Promise<NotaArquivoDto[]> {
    const notaArquivos: NotaArquivo[] = await this.notaArquivoRepository.find();
    return notaArquivos.map((notaArquivo) => new NotaArquivoDto(notaArquivo));
  }

  async findOne(id: number): Promise<NotaArquivoDto> {
    const notaArquivo: NotaArquivo | null =
      await this.notaArquivoRepository.findOne({
        where: { id_nota_arquivo: id },
      });
    if (!notaArquivo) {
      throw new NotFoundException('Arquivo não encontrado.');
    }
    return new NotaArquivoDto(notaArquivo);
  }

  async update(
    id: number,
    updateNotaArquivoDto: UpdateNotaArquivoDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    let updateObject = {
      id_nota: updateNotaArquivoDto.id_nota,
      nome_arquivo: updateNotaArquivoDto.nome_arquivo,
      arquivo: Buffer.from(updateNotaArquivoDto.arquivo ?? '', 'base64'),
    };
    const updateResult: UpdateResult = await this.notaArquivoRepository.update(
      id,
      updateObject,
    );
    return new UpdateAndDeleteResponseDto(updateResult.affected ?? 0);
  }

  async remove(id: number): Promise<UpdateAndDeleteResponseDto> {
    const deleteResult: DeleteResult =
      await this.notaArquivoRepository.delete(id);
    return new UpdateAndDeleteResponseDto(deleteResult.affected ?? 0);
  }
}
