export type EnvConf = {
  production: boolean;
  server: EnvConfServer;
  api: EnvConfApi;
};

export type EnvConfServer = {
  host: string;
  port: number;
};

export type EnvConfApi = {
  key: string;
  URL: string;
  origin: string;
  expiresIn: number;
  generateTimeout: number;
};
