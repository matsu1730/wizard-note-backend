// ormconfig.ts
export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432, // padrão do PostgreSQL
  username: 'postgres', // ajuste conforme seu usuário
  password: 'sua_senha', // ajuste sua senha
  database: 'nome_do_banco', // ajuste para o nome do seu banco
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations'
  },
  synchronize: false, // nunca ativar em produção!
};
