/* eslint-disable */
'use strict';

const Hapi = require('hapi');
const path = require('path');
const inert = require('inert')
const axios = require('axios');

const hive = require('./hiveProxy.service.js');
const portfolio = require('./portfolio.json');
const server = Hapi.server({
  host: 'localhost',
  port: 3001
});

const start = async () => {

  await server.register(inert);

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.file(path.join(__dirname, '../../public/index.html'))
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/listing',
    handler: async (request, h) => {
      return axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=600', {
        headers: {
          'X-CMC_PRO_API_KEY': '8a9cd3d5-b37a-42a8-8041-d20176627896',
        },
      })
        .then(({ data: { data } }) => h.response(data))
        .catch(err => console.error(err));
    }
  });  
  
  server.route({
    method: 'GET',
    path: '/farms',
    handler: async () => {
      return hive.getFarms();
    }
  });
  
  server.route({
    method: 'GET',
    path: '/dashboard',
    handler: async () => {
      return hive.getMinerDashBoard();
    }
  });
  
  server.route({
    method: 'GET',
    path: '/portfolio',
    handler: async (request, h) => {
      return h.response(portfolio);
    }
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {
      const { twoFACode } = request.payload;
      
      return hive.getToken(twoFACode)
    }
  });

  await server.start();

  console.log('Server running at:', server.info.uri);

  hive.readToken();
  hive.refreshToken();
};

start();