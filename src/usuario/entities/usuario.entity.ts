import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Nota } from '../../nota/entities/nota.entity';
import * as bcrypt from 'bcrypt';

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
  senha: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  data_atualizacao: Date;

  @OneToMany(() => Nota, nota => nota.usuario)
  notas: Nota[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.senha) {
      const salt = await bcrypt.genSalt();
      this.senha = await bcrypt.hash(this.senha, salt);
    }
  }
}
