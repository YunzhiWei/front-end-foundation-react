import React, { Component } from 'react';

import logo from './logo.svg';

class RootPage extends Component {
  render() {
    return (
      <div className="HomePage">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome Root Page</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>url</code> in the browser address input box.
        </p>
      </div>
    );
  }
}

export default RootPage;
