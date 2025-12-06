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
import { DB_TYPE } from '../../config/environment.config';

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

  @CreateDateColumn({
    type: DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  data_criacao: Date;

  @UpdateDateColumn({
    type: DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
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
