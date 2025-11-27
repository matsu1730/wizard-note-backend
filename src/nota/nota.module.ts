import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { HuggingFaceApiModule } from '../hugging-face-api/hugging-face-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota]),
    HuggingFaceApiModule
  ],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
