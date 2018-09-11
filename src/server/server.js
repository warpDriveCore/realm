/* eslint-disable */
'use strict';

const Hapi = require('hapi');
const path = require('path');
const inert = require('inert')
const axios = require('axios');

const fs = require('fs');
const marketcup = require(path.join(__dirname, '../../user/marketcup.json'));

const hive = require('./hiveProxy.service.js');
const helpers = require('./helpers');
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
      // return axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=600', {
      //   headers: {
      //     'X-CMC_PRO_API_KEY': '93d2fa8b-dfe9-4249-a0ef-2c4145239f57',
      //   },
      // })
      //   .then(({ data: { data } }) => {
          // fs.writeFile(path.resolve(__dirname, '../../user/marketcup.json'), JSON.stringify({ data: data }), (err) => {  
          //   if (err) throw err;
          // });
          
          // return h.response(data)})
         
        // .catch(err => console.error(err));

        return h.response(marketcup.data);
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
      return h.response(helpers.mapPortfolio(portfolio.coins, marketcup.data));
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