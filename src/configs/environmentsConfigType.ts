export type EnvConfigType = {
  app: AppConfigType;
  postgres: PostgresConfigType;
  redis: RedisConfigType;
};

export type AppConfigType = {
  port: number;
  host: string;
};

export type PostgresConfigType = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};
export type RedisConfigType = {
  port: number;
  host: string;
  password: string;
};
