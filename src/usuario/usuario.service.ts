import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto, CreateUsuarioResultDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { AuthUsuarioDto } from './dto/auth-usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<CreateUsuarioResultDto> {
    const emailExists = await this.usuarioRepository.findOne({ where: { email: createUsuarioDto.email } });
    if (emailExists) {
      throw new ForbiddenException('e-mail já cadastrado.');
    }
    let usuario = this.usuarioRepository.create(createUsuarioDto);
    usuario = await this.usuarioRepository.save(usuario);
    return new CreateUsuarioResultDto(usuario);
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: id } });
    if (!usuario) {
      throw new InternalServerErrorException('usuário não encontrado.');
    }
    return new AuthUsuarioDto(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioRepository.update(
      { id_usuario: id },
      { ...updateUsuarioDto },
    );
  }

  async remove(id: number) {
    return await this.usuarioRepository.delete(id);
  }
}
