import { ApiProperty } from '@nestjs/swagger';

export class SummarizationDto {
  @ApiProperty({
    description: 'Prompt/texto a ser resumido pela IA',
    example: 'Este é um texto longo que precisa ser resumido para facilitar a compreensão rápida das ideias principais.',
    minLength: 10,
    maxLength: 10000
  })
  prompt: string;
}

export class SummarizationResultDto {
  @ApiProperty({
    description: 'Resumo gerado pela inteligência artificial',
    example: 'Resumo conciso das ideias principais do texto fornecido.',
    maxLength: 2000
  })
  summary: string;

  constructor(summary: string) {
    this.summary = summary;
  }
}
