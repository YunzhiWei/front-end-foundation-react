import React, { Component } from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';
import SalesVolume from './BigData/SalesVolume';
import AirportCoordComponent from './BigData/AirportCoord';
import LineAndHistogram from './BigData/LineAndHistogram';
import DynamicChartComponent from './BigData/DynamicChartComponent';
import RadarChart from './BigData/RadarChart';

import { BlockAreaDataArray } from './BigData/data/MapExampleBlockArea';
import { FromToLinesDataArray } from './BigData/data/MapExampleFromToLines';
import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
import radarDataArray from './BigData/data/RadarChartData';
import dynamicChart from './BigData/data/dynamicChart';

function TimerFunction() {
  if (this.state.chartIndex === 0) this.setState({ chartIndex: 1 });
  else if (this.state.chartIndex === 1) this.setState({ chartIndex: 2 });
  else this.setState({ chartIndex: 0 });
}

class BigData extends Component {
  constructor(props) {
      super(props)
      this.state = { chartIndex: 0, timeTicket: null }
  }
  componentDidMount() {
      this.state.timeTicket && clearInterval(this.state.timeTicket);
      this.setState({ timeTicket: setInterval(TimerFunction.bind(this), 5000) });
  }
  componentWillUnmount() {
      this.state.timeTicket && clearInterval(this.state.timeTicket);
  }
 	render() {
 		return (
			<MuiThemeProvider>
  				<div>
      				<CardProvider className="col-md-6 col-lg-4" title="折线图和柱状图" color="light-green">
      					  <LineAndHistogram	BarLinesData={BarLinesDataArray[this.state.chartIndex]}	/>
      				</CardProvider>
      				<CardProvider className="col-md-6 col-lg-4" title="江西省年均降雨量" color="bright-white">
      					  <SalesVolume BlockAreaData={BlockAreaDataArray[1]} />
      				</CardProvider>
      				<CardProvider className="col-md-6 col-lg-4" title="国内游客去向" color="bright-green">
      					  <AirportCoordComponent FromToLinesData={FromToLinesDataArray[1]} />
      				</CardProvider>
              <CardProvider className="col-md-12 col-lg-8" title="游客与游船数量" color="light-pink">
        				  <DynamicChartComponent
            					dynamicSeries={dynamicChart.dynamicSeries}
            					dynamicXAxis={dynamicChart.dynamicXAxis}
            					dynamicYAxis={dynamicChart.dynamicYAxis}
        				/>
      				</CardProvider>
              <CardProvider className="col-md-6  col-lg-4" title="预算与开销" color="purplish-red">
                  <RadarChart	radarData={radarDataArray[0]}	/>
      				</CardProvider>
  			  </div>
			</MuiThemeProvider>
		)
 	}
}


export default BigData;
