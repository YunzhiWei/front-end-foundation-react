import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed: 60
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      console.log("sync up")
      this.setState({speed: snap.val()});
    });
  }

  onSpeedInputKeyPress(e) {
    if (e.which === 13) {
      const rootRef = firebase.database().ref().child('react');
      rootRef.set({ speed: e.target.value });
      e.target.value = "";
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <h1>{this.state.speed}</h1>
          <br />
          <input onKeyPress= {(e) => this.onSpeedInputKeyPress(e)} />
        </div>
      </div>
    );
  }
}

export default App;
