import React, { PureComponent } from 'react';
import Dashboard from './Dashboard';
import Farm from './Farm';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <main className="ui-wrapper">
        <div className="ui-wrapper__content">
          <Dashboard />
          <Farm />
        </div>
      </main>
    );
  }
}

export default App;
