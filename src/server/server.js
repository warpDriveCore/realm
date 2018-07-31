'use strict';

const Hapi = require('hapi');
const path = require('path');

const server=Hapi.server({
  host:'localhost',
  port: 3001
});


const start = async () => {

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.file(path.join(__dirname, '../../public/index.html'));
    }
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

  await server.start();

  console.log('Server running at:', server.info.uri);
};

start();