import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import stores from './stores';

import injectTapEventPlugin from 'react-tap-event-plugin';

import * as wilddog from 'wilddog';

var config = {
  syncURL: "https://xnh-1.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);

injectTapEventPlugin();


ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
registerServiceWorker();
