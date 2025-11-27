import { Injectable } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import {
  SummarizationDto,
  SummarizationResultDto,
} from './dto/summarization.dto';
import { HuggingFaceApiService } from '../hugging-face-api/hugging-face-api.service';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota) private readonly notaRepository: Repository<Nota>,
    private readonly huggingFaceApiService: HuggingFaceApiService
  ) {}

  async create(createNotaDto: CreateNotaDto) {
    const nota = this.notaRepository.create(createNotaDto);
    return await this.notaRepository.save(nota);
  }

  async findAll() {
    return await this.notaRepository.find();
  }

  async findOne(id: number) {
    return await this.notaRepository.findOne({ where: { id_nota: id } });
  }

  async update(id: number, updateNotaDto: UpdateNotaDto) {
    return await this.notaRepository.update(id, updateNotaDto);
  }

  async remove(id: number) {
    return await this.notaRepository.delete(id);
  }

  async makeSummarization(summarizationDto: SummarizationDto) {
    return new SummarizationResultDto(await this.huggingFaceApiService.getSummarization(summarizationDto.prompt));
  }
}
