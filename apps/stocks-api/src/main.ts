/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { fetchStocksPlugin } from './app/plugins/methods/stocks-fetch.method';
import { stocksRoutePlugin } from './app/plugins/routes/stocks-client.route';
import { environment as env } from './environments/environment';

const init = async () => {
  const server = new Server({
    port: env.server.port,
    host: env.server.host
  });

  await server.register([
    {
      plugin: stocksRoutePlugin,
      options: {
        origin: env.api.origin
      }
    },
    {
      plugin: fetchStocksPlugin,
      options: env.api
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
