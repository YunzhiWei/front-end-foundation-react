import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AdminWS from './adminworkspace';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const {match} = this.props;

    return(
      <div>
        <AdminWS.Layout layoutmatch={match}/>
        <Route path={`${match.url}/dashboard`} component={AdminWS.Dashboard}/>
        <Route path={`${match.url}/account`} component={AdminWS.Account}/>
      </div>
    )
  }
}

export default AdminPage;
