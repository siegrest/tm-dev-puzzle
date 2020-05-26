import { EnvConf } from '../app/config.type';

export const environment: EnvConf = {
  production: false,
  server: {
    host: 'localhost',
    port: 3333
  },
  api: {
    key: '',
    URL: 'https://sandbox.iexapis.com',
    origin: 'http://localhost:4200',
    expiresIn: 60000,
    generateTimeout: 5000
  }
};
