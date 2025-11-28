import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../entities/categoria.entity';

export class CategoriaDto {
  @ApiProperty({ example: 1, description: 'Identificador único da categoria' })
  id_categoria: number;

  @ApiProperty({ example: 'Tecnologia', description: 'Nome da categoria' })
  nome: string;

  @ApiProperty({ example: 'Categoria de produtos tecnológicos', description: 'Descrição detalhada da categoria' })
  descricao: string;

  @ApiProperty({ example: '#FF5733', description: 'Cor representativa da categoria' })
  cor: string;

  @ApiProperty({ example: '2025-11-27T22:00:00.000Z', description: 'Data de criação da categoria', type: String, format: 'date-time' })
  data_criacao: Date;

  constructor(categoria: Categoria) {
    this.id_categoria = categoria.id_categoria;
    this.nome = categoria.nome;
    this.descricao = categoria.descricao;
    this.cor = categoria.cor;
    this.data_criacao = categoria.data_criacao;
  }
}
