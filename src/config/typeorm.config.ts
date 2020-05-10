import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbCOnfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbCOnfig.type,
  host: process.env.RDS_HOSTNAME || dbCOnfig.host,
  port: process.env.RDS_PORT || dbCOnfig.port,
  username: process.env.RDS_USERNAME || dbCOnfig.username,
  password: process.env.RDS_PASSWROD || dbCOnfig.password,
  database: process.env.RDS_DB_NAME || dbCOnfig.database,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: process.env.TYPEORM_SYNC || dbCOnfig.synchronize,
};
