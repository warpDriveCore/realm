import React, { PureComponent } from 'react';
import Pool from './Pool/Pool';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <main className="ui-wrapper">
        Hi ;)
        <Pool />
      </main>
    );
  }
}

export default App;
