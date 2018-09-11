/* eslint-disable */
'use strict';

const axios = require('axios');
const path = require('path');
const fs = require('fs');
const tokenStore = require(path.join(__dirname, '../../user/hiveToken.json'));
const userData = require(path.join(__dirname, '../../user/credentials.json'));

const hiveBaseUri = 'https://api2.hiveos.farm/api/v2';

let authToken;

function readToken() {
  const { token } = tokenStore;
  authToken = token;
}

function getToken() {
  return authToken;
}

function refreshToken() {
  // setInterval(() => {
    const token = getToken();
    axios.post(`${hiveBaseUri}/auth/refresh`, {
        token
    })
    .then(response  => {
      const { access_token } = response.data;
      console.log('new token', access_token);
      saveToken(access_token);
    })
    .catch(err => console.log(err))
  // }, 3000)
};

function saveToken(token) {
  authToken = token;
  console.log('authToken', authToken);
  fs.writeFile(path.resolve(__dirname, '../../user/hiveToken.json'), JSON.stringify({ token: authToken }), (err) => {  
    if (err) throw err;
  });
}

function getFarms() {
  const token = getToken();

  return new Promise((resolve, reject) => {
    axios.get(`${hiveBaseUri}/farms/6340/workers`, {
      headers: {
        'Authorization': `bearer ${token}`,
      },
    })
    .then(response  => {
      const { data: { data }} = response;
      
      return resolve(mapFarmsData(data));
    })
    .catch(err => reject(err))
  });
}

function getMinerDashBoard() {
  const baseUrl = 'https://api.ethermine.org';
  const miner = userData.wallet;

  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/miner/${miner}/dashboard`)
    .then(response => {
      const { data: { data }} = response;
      delete data.settings;

      return resolve(data);
    })
    .catch(err => {
      return reject(err);
    });
  
  });
    
}

function mapFarmsData(data) {
  return data.map(miner => {
    const gpuStats = miner.gpu_stats;
    const minerStats = miner.miners_stats.hashrates[0];
    const { hashes } = minerStats;
    const stats = gpuStats.map((gpu, index) => ({
      ...gpu,
      hash: (hashes[index]/1000).toFixed(1),
    }));
    const minerSummary = miner.miners_summary;
    const { hash } = minerSummary.hashrates.pop();
    const powerDraw = miner.stats.power_draw;
    return ({
    name: miner.name,
    units: miner.units_count,
    active: miner.active,
    hashrate: (hash/1000).toFixed(1),
    powerDraw,
    gpus: stats
  })});
}

module.exports = {
  refreshToken,
  getFarms,
  getMinerDashBoard,
  readToken
};
