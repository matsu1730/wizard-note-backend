import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import {
  SummarizationDto,
  SummarizationResultDto,
} from './dto/summarization.dto';
import { HuggingFaceApiService } from '../hugging-face-api/hugging-face-api.service';
import { NotaDto } from './dto/nota.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';
import { GoogleGeminiService } from '../google-gemini/google-gemini.service';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota) private readonly notaRepository: Repository<Nota>,
    private readonly huggingFaceApiService: HuggingFaceApiService,
    private readonly googleGeminiService: GoogleGeminiService
  ) {}

  async create(
    idUsuario: number,
    createNotaDto: CreateNotaDto,
  ): Promise<NotaDto> {
    let nota: Nota = this.notaRepository.create({
      ...createNotaDto,
      id_usuario: idUsuario,
    });
    nota = await this.notaRepository.save(nota);
    return new NotaDto(nota);
  }

  async findAll(): Promise<NotaDto[]> {
    const notas: Nota[] = await this.notaRepository.find();
    return notas.map((nota) => new NotaDto(nota));
  }

  async findAllByUser(id_usuario: number): Promise<NotaDto[]> {
    return await this.notaRepository.find({
      where: {
        id_usuario,
      },
    });
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

  async update(id: number, updateNotaDto: UpdateNotaDto): Promise<NotaDto> {
    await this.notaRepository.update(id, updateNotaDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<UpdateAndDeleteResponseDto> {
    const deleteResult: DeleteResult = await this.notaRepository.delete(id);
    return new UpdateAndDeleteResponseDto(deleteResult.affected ?? 0);
  }

  async makeSummarization(
    summarizationDto: SummarizationDto,
  ): Promise<SummarizationResultDto> {
    return new SummarizationResultDto(
      await this.googleGeminiService.summarize(summarizationDto.prompt)
      /*await this.huggingFaceApiService.getSummarization(
        summarizationDto.prompt,
      ),*/
    );
  }
}
