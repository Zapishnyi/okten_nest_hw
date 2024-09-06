export type EnvConfigType = {
  app: AppConfigType;
  sentry: SentryConfigType;
  postgres: PostgresConfigType;
  redis: RedisConfigType;
  jwt: JWTConfigType;
};

export type SentryConfigType = {
  dsn: string;
  env: string;
  debug: boolean;
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
export type JWTConfigType = {
  accessSecret: string;
  accessExpire: number;
  refreshSecret: string;
  refreshExpire: number;
};
