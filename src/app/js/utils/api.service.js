import axios from 'axios';

export function getMinerDashBoard() {
  return axios.get('http://localhost:3001/dashboard');
}

export function getFarms() {
  return axios.get('http://localhost:3001/farms');
}

export function getCryptoListing() {
  const url = 'http://localhost:3001/listing';
  return axios.get(url);
}

export function getPortfolio() {
  const url = 'http://localhost:3001/portfolio';
  return axios.get(url);
}

export function getTokeng(code) {
  const url = 'http://localhost:3001/login';
  axios.post(url, { twoFACode: code })
    .then(({ data }) => {
      console.log(data);
    });
}

