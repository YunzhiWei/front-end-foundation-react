import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import './BigData/css/bigdata.css';
import './BoatSchedule/css/boatschedule.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './mui/CardProvider';

import IOBoatsComponent from './BoatSchedule/IOBoats';
import BoatsListComponent from './BoatSchedule/BoatsList';
import BoatPosComponent from './BoatSchedule/BoatPos';

@inject("hikApi") @observer
class BoatSchedule extends Component {
    render() {
   		return (
   			<MuiThemeProvider>
				<div id="boat-schedule" className="large-screen">
					<div className="bigdata_title">
						<a href="/">
							<span className="bigdata_l"></span>
							<span className="bigdata_c">仙女湖景区智能游船调度</span>
							<span className="bigdata_r"></span>
						</a>
					</div>
					<div className="boat_top">
						<CardProvider className="cards" title="景区游船使用量统计" color="light-green">
							<BoatsListComponent />
						</CardProvider>
					</div>
					<div className="bigdata_content">
						<div className="c_content c_1">
							<CardProvider className="cards" title="景区离港游船统计" color="light-green">
								<IOBoatsComponent name={"游船"} type={"游船出"} />
							</CardProvider>
							<CardProvider className="cards" title="景区入港游船统计" color="light-green">
								<IOBoatsComponent name={"游船"} type={"游船进"} />
							</CardProvider>
						</div>
						<div className="c_content c_2 c_center">
							<CardProvider className="cards boat-map" title="景区游船实时定位" color="light-green">
								<BoatPosComponent />
							</CardProvider>
						</div>
						<div className="c_content c_4">
							<CardProvider className="cards" title="景区离港快艇统计" color="light-green">
								<IOBoatsComponent name={"快艇"} type={"快艇出"} />
							</CardProvider>
							<CardProvider className="cards" title="景区入港快艇统计" color="light-green">
								<IOBoatsComponent name={"快艇"} type={"快艇进"} />
							</CardProvider>
						</div>
					</div>
			  	</div>
		  	</MuiThemeProvider>
  		)
	}
}


export default BoatSchedule;