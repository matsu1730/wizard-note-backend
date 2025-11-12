import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaArquivoDto } from './create-nota-arquivo.dto';

export class UpdateNotaArquivoDto extends PartialType(CreateNotaArquivoDto) {}
