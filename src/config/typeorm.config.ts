import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    //db config
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'klausmikaelson123',
    database: 'sm_eliozu',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}