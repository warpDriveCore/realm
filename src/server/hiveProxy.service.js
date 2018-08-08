/* eslint-disable */
'use strict';

const axios = require('axios');
const path = require('path');
const fs = require('fs');
const tokenStore = require(path.join(__dirname, '../../user/hiveToken.json'));
const userData = require(path.join(__dirname, '../../user/credentials.json'));
let authToken;
const hiveBaseUri = 'https://api2w.hiveos.farm/api/v2';

function readToken() {
  const { token } = tokenStore;
  authToken = token;
  return authToken;
}

function saveToken(token) {
  authToken = token;
  fs.writeFile(path.resolve(__dirname, '../../data/hiveToken.json'), JSON.stringify({ token: authToken }), (err) => {  
    if (err) throw err;
  });
}

function getToken(tFACode, h) {
  axios.get(`${hiveBaseUri}/auth/login`, {
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      twofa_code: tFACode
    })
  })
  .then(data => {
    return h.response(null);
  })
  .catch(err => {
    return h.response('Erro wrong 2FA Code');
  })
}

function getFarms() {
  if(authToken) {
    axios.get('url', {
      headers: {
        'Authorization': `bearer ${authToken}`,
      },
    })
    .then(data => {
      return data;
    })
  }
}

module.exports = {
  getToken,
  getFarms,
  saveToken
};
