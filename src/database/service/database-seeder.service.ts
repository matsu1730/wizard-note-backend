import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedDatabase();
  }

  async seedDatabase() {
    this.logger.log('Starting DB seeding...');
    await this.categoriaRepository.save([
      { nome: 'Trabalho', descricao: 'Trabalho', cor: '#FF0000' },
      { nome: 'Estudos', descricao: 'Estudos', cor: '#FF0000' },
    ]);
    this.logger.log('DB seeding finished.');
  }
}