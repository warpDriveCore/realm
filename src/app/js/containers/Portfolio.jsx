import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PieChart from '../components/PieChart';
import ChartInfo from '../components/ChartInfo';

class Portfolio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highLightedCoin: null,
      addCoinActive: false,
      editCoinsActive: false,
    }
  };

  highlightCoin = (coinSymbol) => {
    const { portfolio: { coins } } = this.props;
    const highLightedCoin = coins.find(({ symbol }) => symbol === coinSymbol);
    this.setState({
      highLightedCoin,
    });
  };

	toggleAddCoin = (state) => {
	  this.setState({
			addCoinActive: state,
    })
  };

	hideAddCoin = () => this.toggleAddCoin(false);
	showAddCoin = () => this.toggleAddCoin(true);

  render() {
    const { portfolio: { coins }, marketcup: { listing, isLoading } } = this.props;
    const { highLightedCoin, addCoinActive } = this.state;
    const total = {
      symbol: 'Total',
      valueUsd: coins.reduce((acc, { valueUsd }) => acc + +valueUsd, 0),
    };
    console.log(addCoinActive);
    return (
      <section className="ui-block ui-block_blue ui-portfolio">
        <h2 className='ui-portfolio__header'>
          <img className='ui-portfolio__headerLogo' src='/assets/roket.png' />
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
              <li className='ui-coin ui-coin_header'>
                <span className='ui-coin__symbol'>abbr</span>
                  <span className='ui-coin__name'>name</span>
                  <span className='ui-coin__holdings'>holdings</span>
                  <span className='ui-coin__value'>value</span>
                  <span className='ui-coin__price'>price</span>
              </li>
              {coins.map((({ symbol, name, holdings, valueUsd, price }) => (
                <li className={classNames('ui-coin', {'ui-coin_highlighted': highLightedCoin && symbol === highLightedCoin.symbol })}>
                  <span className='ui-coin__symbol'>{symbol}</span>
                  <span className='ui-coin__name'>{name}</span>
                  <span className='ui-coin__holdings'>{holdings}</span>
                  <span className='ui-coin__value'>
                    ${valueUsd}
                  </span>
                  <span className='ui-coin__price'>
                    ${price}
                  </span>
                </li>
              )))}
              {addCoinActive && (
								<li className='ui-coin add-coin'>
									<input className='add-coin__input' placeholder='Abbr or Name' />
									<input className='add-coin__input' placeholder='Amount' />
									<button className='add-coin__addBtn'>
										Add
									</button>
									<button className='add-coin__dismissBtn' onClick={this.hideAddCoin}>
										Dismiss
									</button>
								</li>
              )}
              <li className='ui-coin ui-coin_footer'>
                <button className='ui-coin__editBtn' onClick={this.showAddCoin}>
                  Add coin
                </button>
                <button className='ui-coin__editBtn'>
                  Edit coins
                </button>
                <span className='ui-coin__total'>
                  Total: {total.valueUsd}$
                </span>
              </li>
            </ul>
          </div>
        )
        }
      </section>
    )
  }
}

export default Portfolio;
