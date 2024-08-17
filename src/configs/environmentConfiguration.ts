import { EnvConfigType } from './environmentsConfigType';

export default (): EnvConfigType => ({
  app: {
    port: Number(process.env.APP_PORT) /*|| 3000*/,
    host: process.env.APP_HOST /*|| '0.0.0.0'*/,
  },
  postgres: {
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
});
