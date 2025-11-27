import { Nota } from 'src/nota/entities/nota.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tb_nota_arquivo')
export class NotaArquivo {
  @PrimaryGeneratedColumn()
  id_nota_arquivo: number;

  @Column({ type: 'int', unsigned: true })
  id_nota: number;

  @Column({ type: 'bytea' })
  arquivo: Buffer;

  @Column({ type: 'varchar', length: 255 })
  nome_arquivo: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;

  @ManyToOne(() => Nota, nota => nota.arquivos, { nullable: false })
  @JoinColumn({ name: 'id_nota', referencedColumnName: 'id_nota' })
  nota: Nota;
}
