import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Nota } from '../nota/entities/nota.entity';
import { NotaArquivo } from '../nota-arquivo/entities/nota-arquivo.entity';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './environment.config';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST??'localhost',
  port: Number(DB_PORT)??5432,
  username: DB_USERNAME??'postgres',
  password: DB_PASSWORD??'postgres',
  database: DB_NAME??'wizard_note',
  entities: [
    Usuario,
    Categoria,
    Nota,
    NotaArquivo
  ],
  synchronize: true,
  logging: true,
};

export default ormConfig;