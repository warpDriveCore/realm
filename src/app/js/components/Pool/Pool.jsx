import React, { PureComponent } from 'react';
import { getMinerDashBoard, getCryptoListing } from '../../utils/api.service';

class Pool extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: null,
    };
  }

  componentDidMount() {
    getCryptoListing();
    getMinerDashBoard();
    // this.setState({
    //   dashboard,
    // });
  }

  render() {
    const { dashboard } = this.state;
    return (
      <main className="ui-wrapper">
        {JSON.stringify(dashboard)}
      </main>
    );
  }
}

export default Pool;
