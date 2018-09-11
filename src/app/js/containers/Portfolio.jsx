import React, { PureComponent } from 'react';
import PieChart from '../components/PieChart';

class Portfolio extends PureComponent {
  mapData = (portfolio, listing) => {
    if(!(portfolio.length && listing.length)) return [];
    return portfolio.map(coin => {
      const { holdings } = coin;
      const marketCoin = listing.find( ({ symbol }) => symbol === coin.symbol)
      let price = 0;
      if(marketCoin) price = marketCoin.quote.USD.price;

      this.setState({ loading: false });
      
      return {
        ...coin,
        valueUsd: price,
        amount: holdings * price,
      };
    });
  }

  render() {
    const { portfolio: { coins }, marketcup: { listing, isLoading } } = this.props;

    const data = this.mapData(coins, listing);

    return (
      <section className="ui-block ui-portfolio">
        {isLoading ? (
          <span>Loading ...</span>
        ) : (
          <PieChart portfolio={data} />
        )
        }
      </section>
    )
  }
}

export default Portfolio;
