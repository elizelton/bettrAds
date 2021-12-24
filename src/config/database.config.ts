import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres321',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: ['src/model/entities/*.ts'],
  synchronize: true,
};

export default dbConfig;