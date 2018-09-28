import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react'
import echartsOption from '../function/function';

@inject("echartsData") @observer
class WeatherForeComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.weather, 'WeatherFore');
		return (
		    <ReactEcharts
		      option={option}
		      style={{width: '100%',height: '100%'}}
		      className='WeatherFore'
		    />
		);
	}
}

export default WeatherForeComponent;