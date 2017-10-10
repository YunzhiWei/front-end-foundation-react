import React, { Component } from "react";
import './BigData/css/bigdata.css';
import './BigDataAnls/css/bigdataAnls.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CalendarGridComponent from './BigDataAnls/CalendarGrid';
import AnlsMapComponent from './BigDataAnls/AnlsMap';

import CardProvider from './mui/CardProvider';
115.431919,27.931156
class BigDataAnls extends Component {
    render() {
   		return (
   			<MuiThemeProvider>
				<div id="bigdata-anls" className="large-screen">
					<div className="bigdata_title">
						<span className="bigdata_l"></span>
						<span className="bigdata_c">仙女湖景区大数据分析</span>
						<span className="bigdata_r"></span>
					</div>
					<div className="bigdata_content">
						<div className="c_content c_1">
							<CalendarGridComponent />
						</div>
						<div className="c_content c_2">
							<CardProvider className="cards c_cube" title="仙女湖景区客停车场使用情况" color="light-green">
								<AnlsMapComponent />
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区出入时间统计" color="light-green">
							</CardProvider>
						</div>
						<div className="c_content c_3">
							<CardProvider className="cards c_cube" title="仙女湖景区停车场实时进出场统计" color="light-green">
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区停车场使用量热点图" color="light-green">
							</CardProvider>
						</div>
						<div className="c_content c_4">
							<CardProvider className="cards half first margin_right" title="停车场实时进出场统计" color="light-green">
							</CardProvider>
							<CardProvider className="cards half first" title="停车场实时进出场统计" color="light-green">
							</CardProvider>
							<CardProvider className="cards half margin_right" title="停车场实时进出场统计" color="light-green">
							</CardProvider>
							<CardProvider className="cards half" title="停车场使用量热点图" color="light-green">
							</CardProvider>
							<CardProvider className="cards" title="仙女湖景区停车场使用量热点图" color="light-green">
							</CardProvider>
						</div>
					</div>
			  	</div>
		  	</MuiThemeProvider>
  		)
	}
}


export default BigDataAnls;