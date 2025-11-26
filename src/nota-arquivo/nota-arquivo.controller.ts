import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotaArquivoService } from './nota-arquivo.service';
import { CreateNotaArquivoDto } from './dto/create-nota-arquivo.dto';
import { UpdateNotaArquivoDto } from './dto/update-nota-arquivo.dto';

@Controller('nota-arquivo')
export class NotaArquivoController {
  constructor(private readonly notaArquivoService: NotaArquivoService) {}

  @Post()
  async create(@Body() createNotaArquivoDto: CreateNotaArquivoDto) {
    return await this.notaArquivoService.create(createNotaArquivoDto);
  }

  @Get()
  async findAll() {
    return await this.notaArquivoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notaArquivoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNotaArquivoDto: UpdateNotaArquivoDto) {
    return await this.notaArquivoService.update(+id, updateNotaArquivoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notaArquivoService.remove(+id);
  }
}
