import React, { Component } from "react";
import './BigData/css/bigdata.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';
// import SalesVolume from './BigData/SalesVolume';
// import AirportCoordComponent from './BigData/AirportCoord';
// import LineAndHistogram from './BigData/LineAndHistogram';
// import DynamicChartComponent from './BigData/DynamicChartComponent';
// import RadarChart from './BigData/RadarChart';
// import WeiboData from './BigData/WeiboData';
import ParkingLotComponent from './BigData/ParkingLot';
import WeatherForeComponent from './BigData/WeatherFore';

// import { BlockAreaDataArray } from './BigData/data/MapExampleBlockArea';
// import { FromToLinesDataArray } from /BigData/data/MapExampleFromToLines';
// import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
// import radarDataArray from './BigData/data/RadarChartData';
// import dynamicChart from './BigData/data/dynamicChart';
// import weiboData from './BigData/data/weibo.json';

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
                              <CardProvider className="cards" title="停车场使用量" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                          </div>
                          <div className="c_content c_2">
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                          </div>
                          <div className="c_content c_3">
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                          </div>
                          <div className="c_content c_4">
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <WeatherForeComponent />
                              </CardProvider>
                              <CardProvider className="cards" title="国内游客去向" color="light-green">
                                  <ParkingLotComponent />
                              </CardProvider>
                          </div>
                      </div>
          			  </div>
        			</MuiThemeProvider>
      		)
    	}
}


// <CardProvider className="col-md-6 col-lg-4" title="国内游客去向" color="light-green">
//     <AirportCoordComp onent FromToLinesData={FromToLinesDataArray[1]} />
// </CardProvider>
// <CardProvider className="col-md-12 col-lg-8" title="游客与游船数量" color="light-green">
//     <DynamicChartComponent
//         dynamicSeries={dynamicChart.dynamicSeries}
//         dynamicXAxis={dynamicChart.dynamicXAxis}
//         dynamicYAxis={dynamicChart.dynamicYAxis}
//     />
// </CardProvider>
// <CardProvider className="col-md-6 col-lg-4" title="折线图和柱状图" color="light-green">
//     <LineAndHistogram BarLinesData={BarLinesDataArray[1]} />
// </CardProvider>
// <CardProvider className="col-md-6 col-lg-4" title="江西省年均降雨量" color="light-green">
//     <WeiboData weiboData={weiboData} />
// </CardProvider>
// <CardProvider className="col-md-6  col-lg-4" title="预算与开销" color="light-green">
//     <RadarChart radarData={radarDataArray[0]} />
// </CardProvider>

export default BigData;