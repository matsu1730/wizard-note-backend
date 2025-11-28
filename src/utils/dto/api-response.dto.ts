import { ApiProperty } from '@nestjs/swagger';

export class UpdateAndDeleteResponseDto {
  @ApiProperty({ example: 1, description: 'Número de linhas afetadas' })
  rowsAffected: number;

  constructor(rowsAffected: number) {
    this.rowsAffected = rowsAffected;
  }
}