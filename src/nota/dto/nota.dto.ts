import { ApiProperty } from '@nestjs/swagger';

export class NotaDto {
  @ApiProperty({ example: 1, description: 'Identificador único da nota' })
  id_nota: number;

  @ApiProperty({ example: 1, description: 'ID do usuário relacionado à nota' })
  id_usuario: number;

  @ApiProperty({ example: 2, description: 'ID da categoria relacionada à nota' })
  id_categoria: number;

  @ApiProperty({
    example: 'Resumo do Projeto',
    description: 'Título da nota',
    minLength: 3,
    maxLength: 255,
  })
  titulo: string;

  @ApiProperty({
    example: 'Este é o conteúdo da nota com maior detalhe.',
    description: 'Conteúdo completo da nota',
  })
  conteudo: string;

  @ApiProperty({
    example: 'Resumo gerado automaticamente pela IA.',
    description: 'Resumo da nota gerado pela inteligência artificial',
    required: false,
  })
  resumo_ia?: string;

  @ApiProperty({
    example: 'projeto, resumo, IA',
    description: 'Palavras-chave para facilitar a busca',
    required: false,
  })
  palavras_chave?: string;

  @ApiProperty({
    example: '2025-11-27T22:05:00.000Z',
    description: 'Data de criação da nota',
    type: 'string',
    format: 'date-time',
  })
  data_criacao: Date;

  @ApiProperty({
    example: '2025-11-27T22:10:00.000Z',
    description: 'Data da última atualização da nota',
    type: 'string',
    format: 'date-time',
  })
  data_atualizacao: Date;

  constructor(nota: NotaDto) {
    this.id_nota = nota.id_nota;
    this.id_usuario = nota.id_usuario;
    this.id_categoria = nota.id_categoria;
    this.titulo = nota.titulo;
    this.conteudo = nota.conteudo;
    this.resumo_ia = nota.resumo_ia;
    this.palavras_chave = nota.palavras_chave;
    this.data_criacao = nota.data_criacao;
    this.data_atualizacao = nota.data_atualizacao;
  }
}
