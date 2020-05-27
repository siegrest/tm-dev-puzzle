import { Server } from 'hapi';

export const stocksRoutePlugin = {
  name: 'stocksRoutePlugin',
  version: '1.0.0',
  register: async function(server: Server, options: {origin: string}) {
    server.route([
      {
        path: '/stocks/{symbol}/{range}',
        method: 'GET',
        handler: async request => {
          const { symbol, range } = request.params;
          return await server.methods.fetchStocks(symbol, range);
        },
        options: {
          cache: { privacy: 'public', expiresIn: 6000 },
          cors: { origin: [options.origin] }
        }
      }
    ]);
  }
};
