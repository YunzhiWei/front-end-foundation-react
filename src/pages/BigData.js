import React, { Component } from "react";
import './BigData/css/bigdata.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';
// import SalesVolume from './BigData/SalesVolume';
// import AirportCoordComponent from './BigData/AirportCoord';
import LineAndHistogram from './BigData/LineAndHistogram';
import DynamicChartComponent from './BigData/DynamicChartComponent';
import RadarChart from './BigData/RadarChart';
import WeiboData from './BigData/WeiboData';
import ParkingLotComponent from './BigData/ParkingLot';
import WeatherForeComponent from './BigData/WeatherFore';
import NumOfPassComponent from './BigData/NumOfPass';
import AirQualityComponent from './BigData/AirQuality';
import ResUtilizationComponent from './BigData/ResUtilization';
import TransportationComponent from './BigData/Transportation';
import SankeyComponent from './BigData/Sankey';
// import ErrorsComponent from './BigData/Errors';
import WeatherComponent from './BigData/Weather';
import TicketBusinessComponent from './BigData/TicketBusiness';
import TimeViewComponent from './BigData/TimeView';
import ParkingChargeComponent from './BigData/ParkingCharge';
import ParkingHeatComponent from './BigData/ParkingHeat';


// import { BlockAreaDataArray } from './BigData/data/MapExampleBlockArea';
// import { FromToLinesDataArray } from './BigData/data/MapExampleFromToLines';
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
                          <span className="bigdata_l"></span>
                          <span className="bigdata_c">仙女湖景区智慧旅游大数据</span>
                          <span className="bigdata_r"></span>
                      </div>
                      <div className="bigdata_content">
                          <div className="c_content c_1">
                              <CardProvider className="cards" title="仙女湖景区票务统计" color="light-green">
                                  <TicketBusinessComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="仙女湖景区车位管理" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="仙女湖景区车位收费管理" color="light-green">
                                  <ParkingChargeComponent />
                              </CardProvider>
                          </div>
                          <div className="c_content c_2">
                              <WeiboData weiboData={weiboData} />
                              <CardProvider className="cards" title="仙女湖景区人员流量" color="light-green">
                                  <NumOfPassComponent />
                              </CardProvider>
                          </div>
                          <div className="c_content c_3">
                              <ParkingHeatComponent />
                              <ResUtilizationComponent />
                              <CardProvider className="cards" title="仙女湖景区人员密度" color="light-green">
                                  <RadarChart />
                              </CardProvider>
                          </div>
                          <div className="c_content c_4">
                              <CardProvider className="cards" title="仙女湖景区天气预报" color="light-green">
                                  <WeatherComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="仙女湖景区空气质量" color="light-green">
                                  <AirQualityComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="仙女湖景区客源地统计" color="light-green">
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