import React from 'react';
import { Route } from 'react-router-dom';

import RootPage from './pages/Root';
import BigData from './pages/BigData';
import ParkingLot from './pages/ParkingLot';
import BoatSchedule from './pages/BoatSchedule';
import BigDataAnls from './pages/BigDataAnls';

const Routes = () =>
  <switch>
    <Route exact path={"/"} component={RootPage} />
    <Route path="/bigdata" component={BigData} />
    <Route path="/parkinglot" component={ParkingLot} />
    <Route path="/boat" component={BoatSchedule} />
    <Route path="/bigdata2" component={BigDataAnls} />
  </switch>

export default Routes;
