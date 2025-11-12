import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotaArquivoService } from './nota-arquivo.service';
import { CreateNotaArquivoDto } from './dto/create-nota-arquivo.dto';
import { UpdateNotaArquivoDto } from './dto/update-nota-arquivo.dto';

@Controller('nota-arquivo')
export class NotaArquivoController {
  constructor(private readonly notaArquivoService: NotaArquivoService) {}

  @Post()
  create(@Body() createNotaArquivoDto: CreateNotaArquivoDto) {
    return this.notaArquivoService.create(createNotaArquivoDto);
  }

  @Get()
  findAll() {
    return this.notaArquivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaArquivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotaArquivoDto: UpdateNotaArquivoDto) {
    return this.notaArquivoService.update(+id, updateNotaArquivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaArquivoService.remove(+id);
  }
}
