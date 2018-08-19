import axios from 'axios';


export function getMinerDashBoard() {
  return axios.get('http://localhost:3001/dashboard')
}

export function getFarms() {
  return axios.get('http://localhost:3001/farms')
}

export function getCryptoListing() {
  const url = 'http://localhost:3001/listing';
  axios.get(url)
    .then(({ data }) => {
      console.log(data);
    });
}

export function getTokeng(code) {
  const url = 'http://localhost:3001/login';
  axios.post(url, { twoFACode: code })
    .then(({ data }) => {
      console.log(data);
    });
}

