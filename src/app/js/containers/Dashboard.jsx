import React, { PureComponent } from 'react';
import Worker from '../components/Worker';
import Chart from '../components/Chart';

class Dashboard extends PureComponent {
  render() {
    const { dashboard: { data: { workers, statistics }, isLoading, failedToLoad }} = this.props;
    return (
      <section className="ui-block ui-block_blue ui-dashboard">
          {workers.map(worker => (
            <Worker data={worker} />
          ))}
          <Chart statistics={statistics} />
      </section>
    );
  }
}

export default Dashboard;
