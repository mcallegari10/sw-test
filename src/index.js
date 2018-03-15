import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss';

import App from '~components/App'; // eslint-disable-line import/first

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(reg => {
    if (reg.installing) {
      console.log('Service worker installing') // eslint-disable-line no-console
    } else if (reg.active) {
      console.log('Service worker active') // eslint-disable-line no-console
    }
  }).catch(err => {
    console.log(`Registration failed! ${err}`) // eslint-disable-line no-console
  })
}
