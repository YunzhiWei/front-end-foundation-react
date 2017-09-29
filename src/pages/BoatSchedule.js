import React, { Component } from "react";
import './BigData/css/bigdata.css';
import './BoatSchedule/css/boatschedule.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './mui/CardProvider';

import IOBoatsComponent from './BoatSchedule/IOBoats';

class BoatSchedule extends Component {
    render() {
   		return (
   			<MuiThemeProvider>
				<div id="boat-schedule" className="large-screen">
					<div className="bigdata_title">
						<span className="bigdata_l"></span>
						<span className="bigdata_c">仙女湖景区智能游船调度</span>
						<span className="bigdata_r"></span>
					</div>
					<div className="boat_top">
						<CardProvider className="cards" title="仙女湖景区客源车辆统计" color="light-green">
						
						</CardProvider>
					</div>
					<div className="bigdata_content">
						<div className="c_content c_1">
							<CardProvider className="cards" title="仙女湖景区客源车辆统计" color="light-green">
							
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区车辆停留时间统计" color="light-green">
							
							</CardProvider>
						</div>
						<div className="c_content c_2 c_center">
							<CardProvider className="cards boat-map" title="仙女湖景区客停车场使用情况" color="light-green">
								
							</CardProvider>
						</div>
						<div className="c_content c_4">
							<CardProvider className="cards" title="仙女湖景区停车场实时进出场统计" color="light-green">
								
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区停车场使用量热点图" color="light-green">
								
							</CardProvider>
						</div>
					</div>
			  	</div>
		  	</MuiThemeProvider>
  		)
	}
}


export default BoatSchedule;