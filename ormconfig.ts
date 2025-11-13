import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from './src/usuario/entities/usuario.entity';
import { Categoria } from './src/categoria/entities/categoria.entity';
import { Nota } from './src/nota/entities/nota.entity';
import { NotaArquivo } from './src/nota-arquivo/entities/nota-arquivo.entity';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST??'localhost',
  port: Number(process.env.DB_PORT)??5432,
  username: process.env.DB_USERNAME??'postgres',
  password: process.env.DB_PASSWORD??'postgres',
  database: process.env.DB_DATABASE??'wizard_note',
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