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
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import {
  SummarizationDto,
  SummarizationResultDto,
} from './dto/summarization.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { NotaDto } from './dto/nota.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova nota.',
    description: 'Cria uma nova nota associada a um usuário e categoria.',
  })
  @ApiCreatedResponse({
    description: 'Nota criada com sucesso.',
    type: NotaDto,
  })
  async create(@Body() createNotaDto: CreateNotaDto): Promise<NotaDto> {
    return await this.notaService.create(createNotaDto);
  }

  @Post('summarization')
  @ApiOperation({
    summary: 'Gerar resumo de texto com IA.',
    description:
      'Processa um texto e retorna resumo gerado por inteligência artificial.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumo gerado com sucesso.',
    type: SummarizationResultDto,
  })
  async makeSummarization(
    @Body() summarizationDto: SummarizationDto,
  ): Promise<SummarizationResultDto> {
    return await this.notaService.makeSummarization(summarizationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as notas.',
    description:
      'Retorna lista completa de todas as notas do usuário autenticado.',
  })
  @ApiOkResponse({
    description: 'Lista de notas retornada com sucesso.',
    type: [NotaDto],
  })
  async findAll(): Promise<NotaDto[]> {
    return await this.notaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter nota por ID.',
    description: 'Retorna detalhes de uma nota específica pelo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da nota',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Nota encontrada com sucesso.',
    type: NotaDto,
  })
  @ApiNotFoundResponse({
    description: 'Nota não encontrada.',
  })
  async findOne(@Param('id') id: string): Promise<NotaDto> {
    return await this.notaService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar nota por ID.',
    description: 'Atualiza os dados de uma nota existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da nota a ser atualizada',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Nota atualizada com sucesso.',
    type: NotaDto,
  })
  @ApiNotFoundResponse({
    description: 'Nota não encontrada.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateNotaDto: UpdateNotaDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    return await this.notaService.update(+id, updateNotaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover nota por ID.',
    description: 'Exclui permanentemente uma nota do sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da nota a ser removida',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Nota removida com sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'Nota não encontrada.',
  })
  async remove(@Param('id') id: string): Promise<UpdateAndDeleteResponseDto> {
    return await this.notaService.remove(+id);
  }
}
