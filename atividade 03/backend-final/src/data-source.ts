import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'todo',
  entities: [Tarefa, Projeto],
  synchronize: false, // usamos migrations, não auto-sync
};
const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/*.ts'],
});
export default dataSource;