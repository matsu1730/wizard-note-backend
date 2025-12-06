import { Nota } from 'src/nota/entities/nota.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DB_TYPE } from '../../config/environment.config';

@Entity('tb_nota_arquivo')
export class NotaArquivo {
  @PrimaryGeneratedColumn()
  id_nota_arquivo: number;

  @Column({ type: 'int', unsigned: true })
  id_nota: number;

  @Column({ type: DB_TYPE === 'sqlite' ? 'blob' : 'bytea' })
  arquivo: Buffer;

  @Column({ type: 'varchar', length: 255 })
  nome_arquivo: string;

  @CreateDateColumn({
    type: DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_criacao: Date;

  @ManyToOne(() => Nota, nota => nota.arquivos, { nullable: false })
  @JoinColumn({ name: 'id_nota', referencedColumnName: 'id_nota' })
  nota: Nota;
}
