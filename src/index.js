import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import stores from './stores';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA79AjEPLb1YzCOLMC34mIOp94YZMC1CUY",
  authDomain: "sync-with-mobx.firebaseapp.com",
  databaseURL: "https://sync-with-mobx.firebaseio.com",
  projectId: "sync-with-mobx",
  storageBucket: "sync-with-mobx.appspot.com",
  messagingSenderId: "920005046653"
};

firebase.initializeApp(config);
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
