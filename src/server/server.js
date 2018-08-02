/* eslint-disable */
'use strict';

const Hapi = require('hapi');
const path = require('path');
const inert = require('inert')
const axios = require('axios');
const server = Hapi.server({
  host:'localhost',
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
      return axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200', {
        headers: {
          'X-CMC_PRO_API_KEY': '8a9cd3d5-b37a-42a8-8041-d20176627896',
        },
      })
        .then(({ data: { data } }) => h.response(data))
        .catch(err => console.error(err));
    }
  });

  await server.start();

  console.log('Server running at:', server.info.uri);
};

start();