import React, { Component } from "react";
import './BigData/css/bigdata.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CardProvider from './mui/CardProvider';

import LineAndHistogram from './BigData/LineAndHistogram';
import RadarChart from './BigData/RadarChart';
import WeiboData from './BigData/WeiboData';
import ParkingLotComponent from './BigData/ParkingLot';
import NumOfPassComponent from './BigData/NumOfPass';
import AirQualityComponent from './BigData/AirQuality';
import ResUtilizationComponent from './BigData/ResUtilization';
import WeatherComponent from './BigData/Weather';
import TicketBusinessComponent from './BigData/TicketBusiness';
import TimeViewComponent from './BigData/TimeView';
import ParkingChargeComponent from './BigData/ParkingCharge';

import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
import radarDataArray from './BigData/data/RadarChartData';
import dynamicChart from './BigData/data/dynamicChart';
import weiboData from './BigData/data/weibo.json';

class BigData extends Component {
    render() {
 		return (
  			<MuiThemeProvider>
				<div className="large-screen">
                    <div className="bigdata_title">
                        <a href="/">
                            <span className="bigdata_l"></span>
                            <span className="bigdata_c">仙女湖景区智能管控平台</span>
                            <span className="bigdata_r"></span>
                        </a>
                    </div>
                    <div className="bigdata_content">
                        <div className="c_content c_1">
                            <CardProvider className="cards" title="景区票务统计" color="light-green">
                                <a href="/bigdata2"></a>
                                <TicketBusinessComponent />
                            </CardProvider>
                            <CardProvider className="cards" title="景区车位游船管理" color="light-green">
                                <a className="h_half" href="/parkinglot"></a>
                                <a className="h_half down" href="/boat"></a>
                                <ParkingLotComponent />
                            </CardProvider>
                            <CardProvider className="cards" title="景区车位收费管理" color="light-green">
                                <ParkingChargeComponent />
                            </CardProvider>
                        </div>
                        <div className="c_content c_2">
                            <WeiboData weiboData={weiboData} />
                            <CardProvider className="cards" title="景区人员流量" color="light-green">
                                <NumOfPassComponent />
                            </CardProvider>
                        </div>
                        <div className="c_content c_3">
                            <TimeViewComponent />
                            <ResUtilizationComponent />
                            <CardProvider className="cards" title="景区人员密度" color="light-green">
                                <RadarChart />
                            </CardProvider>
                        </div>
                        <div className="c_content c_4">
                            <CardProvider className="cards" title="景区天气预报" color="light-green">
                                <WeatherComponent />
                            </CardProvider>
                            <CardProvider className="cards" title="景区空气质量" color="light-green">
                                <AirQualityComponent />
                            </CardProvider>
                            <CardProvider className="cards" title="景区客源地统计" color="light-green">
                                <LineAndHistogram BarLinesData={BarLinesDataArray[1]} />
                            </CardProvider>
                        </div>
                    </div>
                </div>
  			</MuiThemeProvider>
		)
  	}
}

export default BigData;