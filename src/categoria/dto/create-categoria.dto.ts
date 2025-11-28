import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Tecnologia',
    minLength: 2,
    maxLength: 50
  })
  nome: string;

  @ApiProperty({
    description: 'Descrição detalhada da categoria',
    example: 'Categoria relacionada a produtos e serviços de tecnologia',
    maxLength: 255,
    required: false
  })
  descricao: string;

  @ApiProperty({
    description: 'Cor representativa da categoria em hexadecimal',
    example: '#FF5733',
    pattern: '^#([A-Fa-f0-9]{6})$'
  })
  cor: string;
}
