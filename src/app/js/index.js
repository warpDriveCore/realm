import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';


import '../css/main.scss';

const Main = () => (
  <main>
      <App />
  </main>
);

ReactDOM.render(<Main />, document.getElementById('app-root'));
