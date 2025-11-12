import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Nota } from '../../nota/entities/nota.entity';

@Entity('tb_usuario')
@Unique(['email'])
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha_hash: string;

  @CreateDateColumn({ type: 'datetime' })
  data_criacao: Date;

  @UpdateDateColumn({ type: 'datetime' })
  data_atualizacao: Date;

  @OneToMany(() => Nota, nota => nota.usuario)
  notas: Nota[];
}
