import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  fetchDashboard,
  fetchRigs,
  fetchPortfolio,
  fetchCryproLising,
} from '../utils/reducer';

import Dashboard from './Dashboard';
import Farm from './Farm';
import Portfolio from './Portfolio';

class App extends PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {
      fetchDashboard,
      fetchRigs,
      fetchPortfolio,
      fetchCryproLising,
    } = this.props;

    fetchDashboard();
    fetchRigs();
    fetchPortfolio();
    fetchCryproLising();
  }

  render() {
    const {
      farm,
      dashboard,
      portfolio,
      marketcup,
    } = this.props;

    return (
        <main className="ui-wrapper">
          <Farm farm={farm} />
          <Portfolio portfolio={portfolio} marketcup={marketcup} />
          <Dashboard dashboard={dashboard} />
        </main>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoading,
    failedToLoad,
    farm,
    dashboard,
    portfolio,
    marketcup,
  } = state;

  return {
    isLoading,
    failedToLoad,
    farm,
    dashboard,
    portfolio,
    marketcup,
  }
}

const mapDispatchToProps = {
  fetchDashboard,
  fetchRigs,
  fetchPortfolio,
  fetchCryproLising,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
