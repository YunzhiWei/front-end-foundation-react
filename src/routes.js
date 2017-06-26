import React from 'react';
import { Route } from 'react-router-dom';
import pages from './pages';

const Routes = () =>
  <switch>
    <Route exact path={"/"} component={pages.AppLayout} />
    <Route path="/about" component={pages.AboutPage} />
    <Route path="/home" component={pages.HomePage} />
  </switch>

export default Routes;
