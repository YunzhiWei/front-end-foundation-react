import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import IconChart from 'material-ui/svg-icons/editor/insert-chart';
import IconArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';

import MenuItem from 'material-ui/MenuItem';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const {layoutmatch} = this.props;
    console.log("Layout match: ", layoutmatch);

    return(
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <RaisedButton label="Toggle" onTouchTap={this.handleToggle} />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({open})}
          >
          <Avatar
            size={180}
            src="https://yt3.ggpht.com/-m2q3GRTJ36E/AAAAAAAAAAI/AAAAAAAAAAA/bvrX-yV_EDQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
          />
          <MenuItem
            containerElement={ <Link to={`${layoutmatch.url}/dashboard`} /> }
            primaryText="Dashboard"
            leftIcon={<IconChart />}
            rightIcon={<IconArrowDropRight />}
          />
          <MenuItem
            containerElement={ <Link to={`${layoutmatch.url}/account`} /> }
            primaryText="Account"
            leftIcon={<IconChart />}
            rightIcon={<IconArrowDropRight />}
          />
        </Drawer>
      </div>
    )
  }
}

export default Layout;
