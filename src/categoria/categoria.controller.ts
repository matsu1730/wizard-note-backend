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
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';
import { CategoriaDto } from './dto/categoria.dto'; // Assumindo que existe

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova categoria.',
    description: 'Cria uma nova categoria com nome, descrição e cor.',
  })
  @ApiCreatedResponse({
    description: 'Categoria criada com sucesso.',
    type: CategoriaDto,
  })
  async create(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaDto> {
    return await this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as categorias.',
    description: 'Retorna lista completa de todas as categorias cadastradas.',
  })
  @ApiOkResponse({
    description: 'Lista de categorias retornada com sucesso.',
    type: [CategoriaDto],
  })
  async findAll(): Promise<CategoriaDto[]> {
    return await this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter categoria por ID.',
    description: 'Retorna detalhes de uma categoria específica pelo ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Categoria encontrada com sucesso.',
    type: CategoriaDto,
  })
  @ApiNotFoundResponse({
    description: 'Categoria não encontrada.',
  })
  async findOne(@Param('id') id: string): Promise<CategoriaDto> {
    return await this.categoriaService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar categoria por ID.',
    description: 'Atualiza os dados de uma categoria existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria a ser atualizada',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Categoria atualizada com sucesso.',
    type: UpdateAndDeleteResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Categoria não encontrada.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    return await this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover categoria por ID.',
    description: 'Exclui permanentemente uma categoria do sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria a ser removida',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Categoria removida com sucesso.',
    type: UpdateAndDeleteResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Categoria não encontrada.',
  })
  async remove(@Param('id') id: string): Promise<UpdateAndDeleteResponseDto> {
    return await this.categoriaService.remove(+id);
  }
}
