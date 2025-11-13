import { Usuario } from '../entities/usuario.entity';

export class AuthUsuarioDto {
  id_usuario: number;
  nome: string;
  email: string;
  data_criacao: Date;
  data_atualizacao: Date;

  constructor(usuario: Usuario) {
      this.id_usuario = usuario.id_usuario;
      this.nome = usuario.nome;
      this.email = usuario.email;
      this.data_criacao = usuario.data_criacao;
      this.data_atualizacao = usuario.data_atualizacao;
  }
}