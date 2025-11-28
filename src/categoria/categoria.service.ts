import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { CategoriaDto } from './dto/categoria.dto';
import { UpdateAndDeleteResponseDto } from '../utils/dto/api-response.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    let categoria = this.categoriaRepository.create(createCategoriaDto);
    categoria = await this.categoriaRepository.save(categoria);
    return new CategoriaDto(categoria);
  }

  async findAll() {
    const categorias: Categoria[] = await this.categoriaRepository.find();
    return categorias.map(categoria => new CategoriaDto(categoria));
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id } });
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }
    return new CategoriaDto(categoria);
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const updateResult = await this.categoriaRepository.update(id, updateCategoriaDto);
    return new UpdateAndDeleteResponseDto(updateResult.affected??0);
  }

  async remove(id: number) {
    const deleteResult = await this.categoriaRepository.delete(id);
    return new UpdateAndDeleteResponseDto(deleteResult.affected??0);
  }
}
