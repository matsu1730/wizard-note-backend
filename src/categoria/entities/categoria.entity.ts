import { Nota } from 'src/nota/entities/nota.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('tb_categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'varchar', length: 20 })
  cor: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;

  @OneToMany(() => Nota, nota => nota.categoria)
  notas: Nota[];
}
