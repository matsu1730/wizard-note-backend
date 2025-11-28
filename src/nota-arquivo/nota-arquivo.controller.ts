import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotaArquivoService } from './nota-arquivo.service';
import { CreateNotaArquivoDto } from './dto/create-nota-arquivo.dto';
import { UpdateNotaArquivoDto } from './dto/update-nota-arquivo.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { NotaArquivoDto } from './dto/nota-arquivo.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('nota-arquivo')
export class NotaArquivoController {
  constructor(private readonly notaArquivoService: NotaArquivoService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo arquivo de nota.',
    description: 'Associa um arquivo (base64) a uma nota específica.',
  })
  @ApiCreatedResponse({
    description: 'Arquivo de nota criado com sucesso.',
    type: NotaArquivoDto,
  })
  async create(
    @Body() createNotaArquivoDto: CreateNotaArquivoDto,
  ): Promise<NotaArquivoDto> {
    return await this.notaArquivoService.create(createNotaArquivoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os arquivos de notas.',
    description:
      'Retorna lista completa de todos os arquivos associados às notas.',
  })
  @ApiOkResponse({
    description: 'Lista de arquivos de notas retornada com sucesso.',
    type: [NotaArquivoDto],
  })
  async findAll(): Promise<NotaArquivoDto[]> {
    return await this.notaArquivoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter arquivo de nota por ID.',
    description: 'Retorna detalhes de um arquivo específico de nota.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do arquivo de nota',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Arquivo de nota encontrado com sucesso.',
    type: NotaArquivoDto,
  })
  @ApiNotFoundResponse({
    description: 'Arquivo de nota não encontrado.',
  })
  async findOne(@Param('id') id: string): Promise<NotaArquivoDto> {
    return await this.notaArquivoService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar arquivo de nota por ID.',
    description: 'Atualiza os dados de um arquivo de nota existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do arquivo de nota a ser atualizado',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Arquivo de nota atualizado com sucesso.',
    type: UpdateAndDeleteResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Arquivo de nota não encontrado.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateNotaArquivoDto: UpdateNotaArquivoDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    return await this.notaArquivoService.update(+id, updateNotaArquivoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover arquivo de nota por ID.',
    description: 'Exclui permanentemente um arquivo de nota.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do arquivo de nota a ser removido',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Arquivo de nota removido com sucesso.',
    type: UpdateAndDeleteResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Arquivo de nota não encontrado.',
  })
  async remove(@Param('id') id: string): Promise<UpdateAndDeleteResponseDto> {
    return await this.notaArquivoService.remove(+id);
  }
}
