import React, {
  Component
} from 'react';

import logo from './logo.svg';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome Home Page</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default HomePage;