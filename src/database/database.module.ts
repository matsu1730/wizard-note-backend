import { Module } from '@nestjs/common';
import { DatabaseSeederService } from './service/database-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria])
  ],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService]
})
export class DatabaseModule {}