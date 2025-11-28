import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário (formato RFC 5322)',
    example: 'john.doe@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 8 caracteres)',
    example: 'johndoe123',
    minLength: 8,
    maxLength: 128,
    writeOnly: true,
  })
  senha: string;
}
