import React, { Component } from "react";
import './BigData/css/bigdata.css';
import './ParkingLot/css/parking.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './mui/CardProvider';

import ParkingHeatComponent from './ParkingLot/ParkingHeat';
import CarsDistributionComponent from './ParkingLot/CarsDistribution';
import StandingTimeComponent from './ParkingLot/StandingTime';
import IOCarsComponent from './ParkingLot/IOCars';
import IOCarsTimeComponent from './ParkingLot/IOCarsTime';

class ParkingLot extends Component {
    render() {
   		return (
   			<MuiThemeProvider>
				<div id="parking-lot" className="large-screen">
					<div className="bigdata_title">
						<a href="/bigdata">
							<span className="bigdata_l"></span>
							<span className="bigdata_c">仙女湖景区智能停车场</span>
							<span className="bigdata_r"></span>
						</a>
					</div>
					<div className="bigdata_content">
						<div className="c_content c_1">
							<CardProvider className="cards CarsDistri" title="仙女湖景区客源车辆统计" color="light-green">
								<CarsDistributionComponent />
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区车辆停留时间统计" color="light-green">
								<StandingTimeComponent />
							</CardProvider>
						</div>
						<div className="c_content c_2 c_center">
							<CardProvider className="cards ServiceCondition" title="仙女湖景区客停车场使用情况" color="light-green">
								<ParkingHeatComponent />
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区出入时间统计" color="light-green">
								<IOCarsTimeComponent />
							</CardProvider>
						</div>
						<div className="c_content c_4">
							<CardProvider className="cards IOSummary" title="仙女湖景区停车场实时进出场统计" color="light-green">
								<IOCarsComponent />
							</CardProvider>
							<CardProvider className="cards ParkingHeat" title="仙女湖景区停车场使用量热点图" color="light-green">
								<ParkingHeatComponent />
							</CardProvider>
						</div>
					</div>
			  	</div>
		  	</MuiThemeProvider>
  		)
	}
}


export default ParkingLot;