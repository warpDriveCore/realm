import axios from 'axios';

export function getMinerDashBoard() {
  const baseUrl = 'https://api.ethermine.org';
  const miner = '0x94dC448DDABb9A42F3f42dFAcD13d7110Db36867';

  axios.get(`${baseUrl}/miner/${miner}/dashboard`)
    .then(({ data: { data } }) => {
      console.log(data);
    });
}

export function getCryptoListing() {
  const url = 'http://localhost:3001/listing';
  axios.get(url)
    .then(({ data }) => {
      console.log(data);
    });
}
