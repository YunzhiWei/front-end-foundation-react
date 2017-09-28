import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("echartsData") @observer
class AirQualityComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.PM25, 'AirQuality');
		return (
		    <ReactEcharts
		      option={option}
		      style={{width: '100%',height: '100%'}}
		      className='AirQuality'
		    />
		);
	}
}

export default AirQualityComponent;