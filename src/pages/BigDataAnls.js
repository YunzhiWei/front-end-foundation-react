import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import './BigData/css/bigdata.css';
import './BigDataAnls/css/bigdataAnls.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CalendarGridComponent from './BigDataAnls/CalendarGrid';
import AnlsMapComponent from './BigDataAnls/AnlsMap';
import AnlsProvMapComponent from './BigDataAnls/AnlsProvMap';
import MaleToFemaleComponent from './BigDataAnls/MaleToFemale';
import IndvToGroupComponent from './BigDataAnls/IndvToGroup';
import OnToOffComponent from './BigDataAnls/OnToOff';
import AgeDistributionComponent from './BigDataAnls/AgeDistribution';
import RankingComponent from './BigDataAnls/Ranking';
import CustomerTendComponent from './BigDataAnls/CustomerTend';

import CardProvider from './mui/CardProvider';

@inject("hikApi") @observer
class BigDataAnls extends Component {
    render() {
   		return (
   			<MuiThemeProvider>
				<div id="bigdata-anls" className="large-screen">
					<div className="bigdata_title">
						<a href="/">
							<span className="bigdata_l"></span>
							<span className="bigdata_c">仙女湖景区大数据分析</span>
							<span className="bigdata_r"></span>
						</a>
					</div>
					<div className="bigdata_content">
						<div className="c_content c_1">
							<CalendarGridComponent />
						</div>
						<div className="c_content c_2">
							<CardProvider className="cards c_cube" title="景区全国游客分布" color="light-green">
								<AnlsMapComponent />
							</CardProvider>
							<CardProvider className="cards" title="全国客源统计排名（近一年）" color="light-green">
								<RankingComponent choose="china" />
							</CardProvider>
						</div>
						<div className="c_content c_3">
							<CardProvider className="cards c_cube" title="景区省内游客分布" color="light-green">
								<AnlsProvMapComponent />
							</CardProvider>
							<CardProvider className="cards" title="省内客源统计排名（近一年）" color="light-green">
								<RankingComponent choose="jiangxi" />
							</CardProvider>
						</div>
						<div className="c_content c_4">
							<CardProvider className="cards half first margin_right" title="景区门票线上线下占比（近一年）" color="light-green">
								<OnToOffComponent/>
							</CardProvider>
							<CardProvider className="cards half first" title="景区游客年龄分布（近一年）" color="light-green">
								<AgeDistributionComponent/>
							</CardProvider>
							<CardProvider className="cards half margin_right" title="景区团散客比例（近一年）" color="light-green">
								<IndvToGroupComponent/>
							</CardProvider>
							<CardProvider className="cards half" title="景区男女比例（近一年）" color="light-green">
								<MaleToFemaleComponent/>
							</CardProvider>
							<CardProvider className="cards" title="景区游客数量趋势（近七日）" color="light-green">
								<CustomerTendComponent/>
							</CardProvider>
						</div>
					</div>
			  	</div>
		  	</MuiThemeProvider>
  		)
	}
}


export default BigDataAnls;