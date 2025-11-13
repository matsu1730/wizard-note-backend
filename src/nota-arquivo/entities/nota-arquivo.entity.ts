import { Nota } from 'src/nota/entities/nota.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('tb_nota_arquivo')
export class NotaArquivo {
  @PrimaryGeneratedColumn()
  id_nota_arquivo: number;

  @ManyToOne(() => Nota, nota => nota.arquivos, { nullable: false })
  nota: Nota;

  @Column({ type: 'bytea' })
  arquivo: Buffer;

  @Column({ type: 'varchar', length: 255 })
  nome_arquivo: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;
}
