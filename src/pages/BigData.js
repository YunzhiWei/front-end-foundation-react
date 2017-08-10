import React, { Component } from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ReactEcharts from './BigData/lib';
import CardProvider from './BigData/mui/CardProvider';
import echartsOption from './function/function';

import { BlockAreaDataArray } from './BigData/data/MapExampleBlockArea';
import { FromToLinesDataArray } from './BigData/data/MapExampleFromToLines';
import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
import radarDataArray from './BigData/data/RadarChartData';
import dynamicChart from './BigData/data/dynamicChart';

require('./BigData/data/mapLib').airportCoordMap.map((item) => {
    return require("echarts/map/js/" + (item === 'china' ? 'china' : 'province/' + item) + ".js")
})
require('./BigData/data/mapLib').blockAreaMap.map((item) => {
    return require("echarts/map/js/" + (item === 'china' ? 'china' : 'province/' + item) + ".js")
})


// function TimerFunction() {
//     if (this.state.chartIndex === 0) this.setState({
//         chartIndex: 1
//     });
//     else if (this.state.chartIndex === 1) this.setState({
//         chartIndex: 2
//     });
//     else this.setState({
//         chartIndex: 0
//     });
// }

class BigData extends Component {
    render() {
        return (
            <MuiThemeProvider>
  				<div className="large-screen">
      				<CardProvider className="col-md-6 col-lg-4" title="折线图和柱状图" color="light-green">
      					         <ReactEcharts ref='echarts_react' option={echartsOption(BarLinesDataArray[1], 'BarLines')} style={{height: '100%'}} />
      				</CardProvider>
      				<CardProvider className="col-md-6 col-lg-4" title="江西省年均降雨量" color="bright-white">
                        <ReactEcharts ref='echarts_react' option={echartsOption(BlockAreaDataArray[1], 'SalesVolume')} style={{height: '100%'}} />
      				</CardProvider>
      				<CardProvider className="col-md-6 col-lg-4" title="国内游客去向" color="bright-green">
                        <ReactEcharts ref='echarts_react' option={echartsOption(FromToLinesDataArray[1], 'AirportCoordComponent')} style={{height: '100%'}} />
      				</CardProvider>
                    <CardProvider className="col-md-12 col-lg-8" title="游客与游船数量" color="light-pink">
                        <ReactEcharts ref='echarts_react' option={echartsOption(dynamicChart, 'DynamicChart')} style={{height: '100%'}} />
      				</CardProvider>
                    <CardProvider className="col-md-6  col-lg-4" title="预算与开销" color="purplish-red">
                        <ReactEcharts ref='echarts_react' option={echartsOption(radarDataArray[0], 'RadarChart')} style={{height: '100%'}} />
      				</CardProvider>
  			    </div>
			</MuiThemeProvider>
        )
    }
}


export default BigData;