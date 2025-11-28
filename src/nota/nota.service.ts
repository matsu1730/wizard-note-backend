import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Nota } from './entities/nota.entity';
import {
  SummarizationDto,
  SummarizationResultDto,
} from './dto/summarization.dto';
import { HuggingFaceApiService } from '../hugging-face-api/hugging-face-api.service';
import { NotaDto } from './dto/nota.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota) private readonly notaRepository: Repository<Nota>,
    private readonly huggingFaceApiService: HuggingFaceApiService,
  ) {}

  async create(createNotaDto: CreateNotaDto): Promise<NotaDto> {
    let nota: Nota = this.notaRepository.create(createNotaDto);
    nota = await this.notaRepository.save(nota);
    return new NotaDto(nota);
  }

  async findAll(): Promise<NotaDto[]> {
    const notas: Nota[] = await this.notaRepository.find();
    return notas.map((nota) => new NotaDto(nota));
  }

  async findOne(id: number): Promise<NotaDto> {
    const nota: Nota | null = await this.notaRepository.findOne({
      where: { id_nota: id },
    });
    if (!nota) {
      throw new NotFoundException('Nota não encontrada.');
    }
    return new NotaDto(nota);
  }

  async update(
    id: number,
    updateNotaDto: UpdateNotaDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    const updateResult: UpdateResult = await this.notaRepository.update(
      id,
      updateNotaDto,
    );
    return new UpdateAndDeleteResponseDto(updateResult.affected ?? 0);
  }

  async remove(id: number): Promise<UpdateAndDeleteResponseDto> {
    const deleteResult: DeleteResult = await this.notaRepository.delete(id);
    return new UpdateAndDeleteResponseDto(deleteResult.affected ?? 0);
  }

  async makeSummarization(
    summarizationDto: SummarizationDto,
  ): Promise<SummarizationResultDto> {
    return new SummarizationResultDto(
      await this.huggingFaceApiService.getSummarization(
        summarizationDto.prompt,
      ),
    );
  }
}
