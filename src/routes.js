import React from 'react';
import { Route } from 'react-router-dom';
import pages from './pages';

const Routes = () =>
  <switch>
    <Route exact path={"/"} component={pages.RootPage} />
    <Route path="/about" component={pages.AboutPage} />
    <Route path="/admin" component={pages.AdminPage} />
    <Route path="/home" component={pages.HomePage} />
    <Route path="/bigdata" component={pages.BigData} />
    <Route path="/parkinglot" component={pages.ParkingLot} />
    <Route path="/boat" component={pages.BoatSchedule} />
  </switch>

export default Routes;
