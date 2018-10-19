import React, { PureComponent } from 'react';
import classNames from 'classNames';

import PieChart from '../components/PieChart';
import ChartInfo from '../components/ChartInfo';

class Portfolio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highLightedCoin: null
    }
  };

  highlightCoin = (coinSymbol) => {
    const { portfolio: { coins } } = this.props;
    const highLightedCoin = coins.find(({ symbol }) => symbol === coinSymbol);
    this.setState({
      highLightedCoin,
    });
  }

  render() {
    const { portfolio: { coins }, marketcup: { listing, isLoading } } = this.props;
    const { highLightedCoin } = this.state;
    const total = {
      symbol: 'Total',
      valueUsd: 56900,
    };

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
              <PieChart coins={coins} hover={this.highlightCoin} />
              {highLightedCoin ? (
                <ChartInfo coin={highLightedCoin} />
              ) : (
                <ChartInfo coin={total} />
              )}
            </div>
            <ul className='ui-portfolio__contentCoins'>
              <div className='ui-coin ui-coin_header'>
                <span className='ui-coin__symbol'>abbr</span>
                  <span className='ui-coin__name'>name</span>
                  <span className='ui-coin__holdings'>holdings</span>
                  <span className='ui-coin__value'>value</span>
                  <span className='ui-coin__price'>price</span>
              </div>
              {coins.map((({ symbol, name, holdings, valueUsd, price }) => (
                <li className={classNames('ui-coin', {'ui-coin_highlighted': highLightedCoin && symbol === highLightedCoin.symbol })}>
                  <span className='ui-coin__symbol'>{symbol}</span>
                  <span className='ui-coin__name'>{name}</span>
                  <span className='ui-coin__holdings'>{holdings}</span>
                  <span className='ui-coin__value'>{valueUsd}</span>
                  <span className='ui-coin__price'>{price}</span>
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
