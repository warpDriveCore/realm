import React, { PureComponent } from 'react';
import { getPortfolio, getCryptoListing } from '../utils/api.service';
import PieChart from '../components/PieChart';

class Portfolio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
      listing: [],
      loading: true,
    };
  }

  componentDidMount() {
    getPortfolio()
      .then(({ data: { coins } }) => {
        getCryptoListing()
          .then(({ data }) => {
            const listing = data;
            const portfolio = coins.map(coin => {
              const { holdings } = coin;
              const marketCoin = listing.find( ({ symbol }) => symbol === coin.symbol)
              let price = 0;
              if(marketCoin) price = marketCoin.quote.USD.price;
          
              return {
                ...coin,
                valueUsd: price,
                amount: holdings * price,
              };
            })
            this.setState({ portfolio, loading: false });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    const { portfolio, loading } = this.state;
    console.log(portfolio);
    return (
      <section className="ui-block">
        {loading ? (
          <span>Loading ...</span>
        ) : (
          <PieChart portfolio={portfolio} />
        )
        }
      </section>
    )
  }
}

export default Portfolio;
