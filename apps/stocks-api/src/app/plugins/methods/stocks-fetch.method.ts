import * as requestNative from 'request-promise-native';
import { Subject } from 'rxjs';
import { Server } from 'hapi';
import { EnvConfApi } from '../../config.type';

export const fetchStocksPlugin = {
  name: 'fetchStocks',
  version: '1.0.0',
  register: async function(server: Server, options: EnvConfApi) {
    const fetchStocks = async (symbol: string, range: string) => {
      const requestOptions = {
        uri: `${options.URL}/beta/stock/${symbol}/chart/${range}`,
        qs: { token: options.key },
        headers: { 'User-Agent': 'Request-Promise' },
        json: true
      };

      const subject = new Subject<any>();

      requestNative(requestOptions)
        .then(res => {
          subject.next(res);
        })
        .catch(err => {
          subject.next(err);
        })
        .finally(() => {
          subject.complete();
        });

      return await subject.toPromise();
    };

    server.method('fetchStocks', fetchStocks, {
      cache: {
        expiresIn: options.expiresIn,
        generateTimeout: options.generateTimeout
      }
    });
  }
};
