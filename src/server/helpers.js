/* eslint-disable */
'use strict';

function mapPortfolio(portfolio, listing) {
  if(!(portfolio.length && listing.length)) return [];
  return portfolio.map(coin => {
    const { holdings } = coin;
    const marketCoin = listing.find( ({ symbol }) => symbol === coin.symbol)
    let price = 0;
    if(marketCoin) price = marketCoin.quote.USD.price;
    
    return {
      ...coin,
      price: price > 1 ? price.toFixed(1) : price.toFixed(4),
      valueUsd: (holdings * price).toFixed(1),
    };
  });
}

module.exports = {
  mapPortfolio,
};
