import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único do usuário'
  })
  id_usuario: number;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
    minLength: 2,
    maxLength: 100
  })
  nome: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Endereço de e-mail único do usuário',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    example: '2025-11-27T22:00:00.000Z',
    description: 'Data de criação da conta',
    type: 'string',
    format: 'date-time'
  })
  data_criacao: Date;

  @ApiProperty({
    example: '2025-11-27T22:30:00.000Z',
    description: 'Data da última atualização',
    type: 'string',
    format: 'date-time'
  })
  data_atualizacao: Date;

  constructor(usuario: UsuarioDto) {
    this.id_usuario = usuario.id_usuario;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.data_criacao = usuario.data_criacao;
    this.data_atualizacao = usuario.data_atualizacao;
  }
}
