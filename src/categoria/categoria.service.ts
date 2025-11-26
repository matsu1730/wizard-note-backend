import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  findOne(id: number) {
    return this.categoriaRepository.findOne({ where: { id_categoria: id } });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return await this.categoriaRepository.update(id, updateCategoriaDto);
  }

  async remove(id: number) {
    return await this.categoriaRepository.delete(id);
  }
}
