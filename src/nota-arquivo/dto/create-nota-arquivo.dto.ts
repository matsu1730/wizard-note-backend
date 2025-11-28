import { ApiProperty } from '@nestjs/swagger';

export class CreateNotaArquivoDto {
  @ApiProperty({
    description: 'ID da nota associada ao arquivo',
    example: 1,
    minimum: 1
  })
  id_nota: number;

  @ApiProperty({
    description: 'Arquivo codificado em base64',
    example: 'VGhpcyBpcyBhIHNhbXBsZSBmaWxlIGVuY29kZWQgaW4gYmFzZTY0Lg==',
    format: 'byte',
    maxLength: 1000000
  })
  arquivo: string;

  @ApiProperty({
    description: 'Nome do arquivo com extensão',
    example: 'documento.pdf',
    maxLength: 255
  })
  nome_arquivo: string;
}
