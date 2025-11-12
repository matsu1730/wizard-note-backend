import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { NotaArquivo } from '../../nota-arquivo/entities/nota-arquivo.entity';

@Entity('tb_nota')
export class Nota {
  @PrimaryGeneratedColumn()
  id_nota: number;

  @ManyToOne(() => Usuario, usuario => usuario.notas, { nullable: false })
  usuario: Usuario;

  @ManyToOne(() => Categoria, categoria => categoria.notas, { nullable: false })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ type: 'text', nullable: true })
  resumo_ia: string;

  @Column({ type: 'text', nullable: true })
  palavras_chave: string;

  @CreateDateColumn({ type: 'datetime' })
  data_criacao: Date;

  @UpdateDateColumn({ type: 'datetime' })
  data_atualizacao: Date;

  @OneToMany(() => NotaArquivo, notaArquivo => notaArquivo.nota)
  arquivos: NotaArquivo[];
}
