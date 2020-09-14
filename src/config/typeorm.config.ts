import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: dbConfig.type,
//   host: process.env.HOSTNAME || dbConfig.host,
//   port: process.env.PORT || dbConfig.port,
//   username: process.env.USERNAME || dbConfig.username,
//   password: process.env.PASSWORD || dbConfig.password,
//   database: process.env.DB_NAME || dbConfig.database,
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};