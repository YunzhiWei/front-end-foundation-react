import React, { Component } from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';
import SalesVolume from './BigData/SalesVolume';
import AirportCoordComponent from './BigData/AirportCoord';
import LineAndHistogram from './BigData/LineAndHistogram';
import DynamicChartComponent from './BigData/DynamicChartComponent';
import RadarChart from './BigData/RadarChart';

import BlockAreaDataArray from './BigData/data/MapExampleBlockArea';
import FromToLinesDataArray from './BigData/data/MapExampleFromToLines';
import BarLinesDataArray from './BigData/data/ChartExampleBarLines';
import radarDataArray from './BigData/data/RadarChartData';
import dynamicChart from './BigData/data/dynamicChart';

class BigData extends Component {
 	render() {
 		return (
			<MuiThemeProvider>
				<div style={{background: '#071B29'}}>
				    <table style={{width: '100%'}}>
				    	<tbody>
				    		<tr>
  								<td style={tdStyle}>
  									<CardProvider className="cardProvider" title="折线图和柱状图" style={cardStyles}>
  										<LineAndHistogram BarLinesData={BarLinesDataArray[2]} />
  									</CardProvider>
  								</td>
  								<td style={tdStyle}>
  									<CardProvider className="cardProvider" title="江西省年均降雨量" style={cardStyles}>
  										<SalesVolume BlockAreaData={BlockAreaDataArray[1]} />
  									</CardProvider>
  								</td>
  								<td style={tdStyle}>
  									<CardProvider className="cardProvider" title="国内游客去向" style={cardStyles}>
  										<AirportCoordComponent FromToLinesData={FromToLinesDataArray[0]} />
  									</CardProvider>
  								</td>
				    		</tr>
				    		<tr>
				    			<td colSpan="2" >
				                    <CardProvider className="cardProvider" title="游客与游船数量" style={cardStyles}>
					    				<DynamicChartComponent
					    					dynamicSeries={dynamicChart.dynamicSeries}
					    					dynamicXAxis={dynamicChart.dynamicXAxis}
					    					dynamicYAxis={dynamicChart.dynamicYAxis}
					    				/>
				    				</CardProvider>
				    			</td>
				    			<td>
				                    <CardProvider className="cardProvider" title="预算与开销" style={cardStyles}>
				                    	<RadarChart radarData={radarDataArray[0]} />
				    				</CardProvider>
				    			</td>
				    		</tr>
				    	</tbody>
				    </table>
			    </div>
			</MuiThemeProvider>
		)
 	}
}

const cardStyles = {
	background: '#122E41',
	width: '100%',
    header: {
    	paddingBottom: 8,
    	paddingTop: 8,
    	background: '#193D56',
    	titleStyle: {
	    	fontWeight: 600,
	    	color: '#BFDAED',
	    }
    },
    text: {
    	margin: '0 auto',
    	position: 'relative',
    }
};

const echartsStyle = {
	canvas: {
		width: '400px',
		height: '500px',
		margin: '0 0 0 -50%',
		left: '50%'
	}
}

const tdStyle = {
	width: '33%',
}


export default BigData;
