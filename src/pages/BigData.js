import React, { Component } from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardProvider from './BigData/mui/CardProvider';

import SalesVolume from './BigData/SalesVolume';
import AirportCoordComponent from './BigData/AirportCoord';
import LineAndHistogram from './BigData/LineAndHistogram';
import DynamicChartComponent from './BigData/DynamicChartComponent';
import RadarChart from './BigData/RadarChart';

import blockAreaData from './BigData/data/MapExampleBlockArea';
import fromtoLinesData from './BigData/data/MapExampleFromToLines';
import barLinesData from './BigData/data/ChartExampleBarLines';
import radarChartData from './BigData/data/RadarChartData';
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
										<LineAndHistogram
											yAxisConfig={barLinesData.yAxisConfig}
											LegendData={barLinesData.legendData}
											xAxisData={barLinesData.xAxisData}
											seriesData={barLinesData.seriesData}
										/>
									</CardProvider>
								</td>
								<td style={tdStyle}>
									<CardProvider className="cardProvider" title="江西省年均降雨量" style={cardStyles}>
										<SalesVolume
											geoMapName={blockAreaData.geoMapName}
											visualMin={blockAreaData.visualMin}
											visualMax={blockAreaData.visualMax}
											visualLabel={blockAreaData.visualLabel}
											seriesData={blockAreaData.mapDataSeries}
										/>
									</CardProvider>
								</td>
								<td style={tdStyle}>
									<CardProvider className="cardProvider" title="国内游客去向" style={cardStyles}>
										<AirportCoordComponent
											geoMapName = {fromtoLinesData.geoMapName}
											directionOut = {fromtoLinesData.directionOut}
											fromtoLines = {fromtoLinesData.fromtoLines}
											iconPath = {fromtoLinesData.iconPath}
										/>
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
					    				<RadarChart 
					    					seriesData={radarChartData.radarSeries}
					    					radarIndicator={radarChartData.radarIndicator}
					    				/>
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

const tdStyle = {
	width: '33%',
}

export default BigData;

