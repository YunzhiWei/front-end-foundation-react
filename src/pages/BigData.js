import React, { Component } from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';
// import SalesVolume from './BigData/SalesVolume';
import AirportCoordComponent from './BigData/AirportCoord';
// import LineAndHistogram from './BigData/LineAndHistogram';
import DynamicChartComponent from './BigData/DynamicChartComponent';
// import RadarChart from './BigData/RadarChart';
// import WeiboData from './BigData/WeiboData';

// import { BlockAreaDataArray } from './BigData/data/MapExampleBlockArea';
import { FromToLinesDataArray } from './BigData/data/MapExampleFromToLines';
// import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
// import radarDataArray from './BigData/data/RadarChartData';
import dynamicChart from './BigData/data/dynamicChart';
// import weiboData from './BigData/data/weibo.json';

class BigData extends Component {
    render() {
     		return (
      			<MuiThemeProvider>
        				<div className="large-screen">
            				<CardProvider className="col-md-6 col-lg-4" title="国内游客去向" color="light-green">
            					  <AirportCoordComponent FromToLinesData={FromToLinesDataArray[1]} />
            				</CardProvider>
                    <CardProvider className="col-md-12 col-lg-8" title="游客与游船数量" color="light-green">
              				  <DynamicChartComponent
                  					dynamicSeries={dynamicChart.dynamicSeries}
                  					dynamicXAxis={dynamicChart.dynamicXAxis}
                  					dynamicYAxis={dynamicChart.dynamicYAxis}
              				  />
            				</CardProvider>
        			  </div>
      			</MuiThemeProvider>
    		)
   	}
}

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
