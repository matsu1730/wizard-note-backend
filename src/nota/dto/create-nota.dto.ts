import { ApiProperty } from '@nestjs/swagger';

export class CreateNotaDto {
  @ApiProperty({
    description: 'ID do usuário que criou a nota',
    example: 1,
    minimum: 1
  })
  id_usuario: number;

  @ApiProperty({
    description: 'ID da categoria associada à nota',
    example: 2,
    minimum: 1
  })
  id_categoria: number;

  @ApiProperty({
    description: 'Título da nota',
    example: 'Resumo do projeto',
    minLength: 3,
    maxLength: 100
  })
  titulo: string;

  @ApiProperty({
    description: 'Conteúdo completo da nota',
    example: 'Este é o conteúdo detalhado da nota, contendo todas as informações...',
    maxLength: 5000
  })
  conteudo: string;

  @ApiProperty({
    description: 'Resumo gerado por inteligência artificial',
    example: 'Resumo automático criado pela IA para facilitar a leitura rápida.',
    maxLength: 1000,
    required: false
  })
  resumo_ia: string;

  @ApiProperty({
    description: 'Palavras-chave para facilitar a busca',
    example: 'projeto, resumo, IA',
    maxLength: 255,
    required: false
  })
  palavras_chave: string;
}
