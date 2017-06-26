import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
