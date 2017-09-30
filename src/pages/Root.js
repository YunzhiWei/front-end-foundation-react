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
        <a href ="./bigdata" style={styles}>点击进入大数据平台</a>
        <a href ="./parkinglot" style={styles}>点击进入智能停车场管理</a>
        <a href ="./boat" style={styles}>点击进入智能游船调度</a>
      </div>
    );
  }
}

const styles = {
    display: 'block',
    background: 'rgba(97,218,251,.4)',
    height: '60px',
    lineHeight: '60px',
    width: '250px',
    borderRadius: '10px',
    margin: '50px auto',
    color: '#999',
    textDecoration: 'none',
    boxShadow: 'rgba(102, 102, 102, .4) 0px 5px 15px'
}

export default RootPage;
