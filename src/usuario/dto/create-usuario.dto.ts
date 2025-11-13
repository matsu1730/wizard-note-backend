import { Usuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  nome: string;
  email: string;
  senha: string;
}

export class CreateUsuarioResultDto {
  id_usuario: number;
  nome: string;
  email: string;
  data_criacao: Date;

  constructor(usuario: Usuario) {
    this.id_usuario = usuario.id_usuario;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.data_criacao = usuario.data_criacao;
  }
}
