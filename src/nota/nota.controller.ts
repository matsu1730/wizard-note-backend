import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { SummarizationDto } from './dto/summarization.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post()
  async create(@Body() createNotaDto: CreateNotaDto) {
    return await this.notaService.create(createNotaDto);
  }

  @Get()
  async findAll() {
    return await this.notaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNotaDto: UpdateNotaDto) {
    return await this.notaService.update(+id, updateNotaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notaService.remove(+id);
  }

  @Post('summarization')
  async makeSummarization(@Body() summarizationDto: SummarizationDto) {
    return await this.notaService.makeSummarization(summarizationDto);
  }
}
