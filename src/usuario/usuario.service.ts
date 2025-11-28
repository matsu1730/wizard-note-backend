import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { AuthUsuarioDto } from './dto/auth-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    const emailExists = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });
    if (emailExists) {
      throw new ForbiddenException('e-mail já cadastrado.');
    }
    let usuario = this.usuarioRepository.create(createUsuarioDto);
    usuario = await this.usuarioRepository.save(usuario);
    return new UsuarioDto(usuario);
  }

  async findAll(): Promise<UsuarioDto[]> {
    const usuarios: Usuario[] = await this.usuarioRepository.find();
    return usuarios.map((usuario) => new UsuarioDto(usuario));
  }

  async findOne(id: number): Promise<AuthUsuarioDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });
    if (!usuario) {
      throw new NotFoundException('usuário não encontrado.');
    }
    return new AuthUsuarioDto(usuario);
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UpdateAndDeleteResponseDto> {
    const updateResult = await this.usuarioRepository.update(
      id,
      updateUsuarioDto,
    );
    return new UpdateAndDeleteResponseDto(updateResult.affected ?? 0);
  }

  async remove(id: number): Promise<UpdateAndDeleteResponseDto> {
    const deleteResult = await this.usuarioRepository.delete(id);
    return new UpdateAndDeleteResponseDto(deleteResult.affected ?? 0);
  }
}
