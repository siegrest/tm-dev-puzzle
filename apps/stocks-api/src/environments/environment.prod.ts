import { EnvConf } from '@coding-challenge/stocks-api/data-access-app-config';

export const environment: EnvConf = {
  production: true,
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
