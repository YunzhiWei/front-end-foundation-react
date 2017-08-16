import React, { Component } from "react";
import ReactEcharts from './lib';
import echartsOption from '../function/function';

require("echarts/map/js/china.js");

class WeiboData extends Component {
	render() {
        const option = echartsOption(this.props.weiboData, 'WeiboData');
		return (
			<ReactEcharts
              option={option}
              style={{width: '100%',height: '100%'}}
              className='react_for_echarts'
            />
		)
	}
}

export default WeiboData;