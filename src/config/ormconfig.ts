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
  DB_TYPE,
  NODE_ENV,
} from './environment.config';

const entities = [Usuario, Categoria, Nota, NotaArquivo];

const ormConfig: TypeOrmModuleOptions = {
  ...(DB_TYPE === 'sqlite' ? {
    type: 'sqlite' as const,
    database: ':memory:',  // Banco em memória - perde dados no restart
  } : {
    type: 'postgres',
    host: DB_HOST ?? 'localhost',
    port: Number(DB_PORT) ?? 5432,
    username: DB_USERNAME ?? 'postgres',
    password: DB_PASSWORD ?? 'postgres',
    database: DB_NAME ?? 'wizard_note',
  }),

  entities,
  synchronize: NODE_ENV === 'dev', // APENAS desenvolvimento/testes
  logging: NODE_ENV === 'dev',
};

export default ormConfig;
