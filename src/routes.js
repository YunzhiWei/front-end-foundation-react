import React from 'react';
import { Route } from 'react-router-dom';
import pages from './pages';

const Routes = () =>
  <switch>
    <Route exact path={"/"} component={pages.RootPage} />
    <Route path="/bigdata" component={pages.BigData} />
    <Route path="/parkinglot" component={pages.ParkingLot} />
    <Route path="/boat" component={pages.BoatSchedule} />
    <Route path="/bigdata2" component={pages.BigDataAnls} />
  </switch>

export default Routes;
