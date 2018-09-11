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
        price: price > 1 ? price.toFixed(1) : price.toFixed(4),
        valueUsd: (holdings * price).toFixed(1),
      };
    });
  }

  render() {
    const { portfolio: { coins }, marketcup: { listing, isLoading } } = this.props;

    return (
      <section className="ui-block ui-block_blue ui-portfolio">
        <h2 className='ui-portfolio__header'>
          <img className='ui-portfolio__headerLogo' src='/assets/roket.png'></img>
          <span>Portfolio</span></h2>
        {isLoading ? (
          <span>Loading ...</span>
        ) : (
          <div className='ui-portfolio__content'>
            <div className='ui-portfolio__contentChart'>
              <PieChart coins={coins} />
            </div>
            <ul className='ui-portfolio__contentCoins'>
              <div className='ui-coin ui-coin_header'>
                <span class='ui-coin__symbol'>abbr</span>
                  <span class='ui-coin__name'>name</span>
                  <span class='ui-coin__holdings'>holdings</span>
                  <span class='ui-coin__value'>value</span>
                  <span class='ui-coin__price'>price</span>
              </div>
              {coins.map((({ symbol, name, holdings, valueUsd, price }) => (
                <li class='ui-coin'>
                  <span class='ui-coin__symbol'>{symbol}</span>
                  <span class='ui-coin__name'>{name}</span>
                  <span class='ui-coin__holdings'>{holdings}</span>
                  <span class='ui-coin__value'>{valueUsd}</span>
                  <span class='ui-coin__price'>{price}</span>
                </li>
              )))}
            </ul>
          </div>
        )
        }
      </section>
    )
  }
}

export default Portfolio;
