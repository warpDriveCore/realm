import React, { PureComponent } from 'react';
import Dashboard from './Dashboard';
import Farm from './Farm';
import Portfolio from './Portfolio';

class App extends PureComponent {
  render() {
    return (
      <main className="ui-wrapper">
        <div className="ui-wrapper__content">
          <Dashboard />
          <Farm />
          <Portfolio />
        </div>
      </main>
    );
  }
}

export default App;
