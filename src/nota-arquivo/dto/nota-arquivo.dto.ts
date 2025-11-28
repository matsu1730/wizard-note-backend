import { ApiProperty } from '@nestjs/swagger';
import { NotaArquivo } from '../entities/nota-arquivo.entity';

export class NotaArquivoDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do arquivo da nota',
  })
  id_nota_arquivo: number;

  @ApiProperty({
    example: 5,
    description: 'ID da nota associada ao arquivo',
  })
  id_nota: number;

  // Para resposta API, pode retornar base64 ou URL de download
  @ApiProperty({
    example: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSow...',
    description: 'Conteúdo do arquivo em base64 (para download ou preview)',
    type: 'string',
    format: 'binary',
  })
  arquivo_base64: string;

  @ApiProperty({
    example: 'contrato-projeto.pdf',
    description: 'Nome original do arquivo com extensão',
    maxLength: 255,
  })
  nome_arquivo: string;

  @ApiProperty({
    example: '2025-11-27T22:15:00.000Z',
    description: 'Data de criação/upload do arquivo',
    type: 'string',
    format: 'date-time',
  })
  data_criacao: Date;

  constructor(notaArquivo: NotaArquivo) {
    this.id_nota_arquivo = notaArquivo.id_nota_arquivo;
    this.id_nota = notaArquivo.id_nota;
    this.arquivo_base64 = notaArquivo.arquivo.toString('base64');
    this.nome_arquivo = notaArquivo.nome_arquivo;
    this.data_criacao = notaArquivo.data_criacao;
  }
}
