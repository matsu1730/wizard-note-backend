import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UsuarioDto } from './dto/usuario.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';
import { AuthRequest } from '../utils/dto/auth.dto';

@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo usuário.',
    description: 'Criar uma nova conta de usuário.',
  })
  @ApiCreatedResponse({
    description: 'Conta de usuário criada com sucesso.',
    type: UsuarioDto,
  })
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioDto> {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários.',
    description: 'Retorna uma lista de todos os usuários cadastrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    type: [UsuarioDto],
  })
  async findAll(): Promise<UsuarioDto[]> {
    return await this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  @ApiOperation({
    summary: 'Obter informações do usuário autenticado.',
    description: 'Retorna os dados do próprio usuário autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário autenticado retornados com sucesso.',
    type: UsuarioDto,
  })
  async getMe(@Request() req: AuthRequest): Promise<UsuarioDto> {
    return this.usuarioService.findOne(req.user.id_usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Put('self')
  @ApiOperation({
    summary: 'Atualizar informações do usuário autenticado.',
    description: 'Atualiza os dados do próprio usuário autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário atualizados com sucesso.',
    type: UpdateAndDeleteResponseDto,
  })
  async updateMe(
    @Request() req: AuthRequest,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    return await this.usuarioService.update(
      req.user.id_usuario,
      updateUsuarioDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Remover usuário pelo ID.',
    description: 'Exclui um usuário especificado pelo seu ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso.',
    type: UpdateAndDeleteResponseDto,
  })
  async remove(@Param('id') id: string): Promise<UpdateAndDeleteResponseDto> {
    return this.usuarioService.remove(+id);
  }
}
