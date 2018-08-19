import React, { PureComponent } from 'react';
import { getMinerDashBoard, getCryptoListing, getTokeng } from '../utils/api.service';
import Worker from '../components/Worker';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      workers: []
    };
  }

  componentDidMount() {
    getMinerDashBoard()
      .then(({ data }) => {
        const { workers } = data;
        this.setState({ workers });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { workers } = this.state;

    return (
      <section className="ui-block">
          {workers.map(worker => (
            <Worker data={worker} />
          ))}
      </section>
    );
  }
}

export default Dashboard;
