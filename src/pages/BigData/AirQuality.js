import React,{ Component } from 'react';
import ReactEcharts from '../lib';
import { inject, observer } from 'mobx-react';
import echartsOption from '../function/function';

@inject("echartsData") @observer
class AirQualityComponent extends Component {
	render() {
		const { echartsData } = this.props;
		const option = echartsOption(echartsData.PM25, 'AirQuality');
		return (
			<div style={{width: "100%",height: "100%"}}>
				<div className="comfort" style={{width: "50%", height: "100%"}}>
					<p>实时温度：<span>{echartsData.comfort.temperature}</span></p>
					<p>实时湿度：<span>{echartsData.comfort.humidity}</span></p>
					<p>舒适指数：<span>{echartsData.comfort.comfortIndex}</span></p>
					<p>舒适度：<span>{echartsData.comfort.comfort}</span></p>
				</div>
			    <ReactEcharts
			      option={option}
			      style={{width: '50%',height: '100%', float:"left"}}
			      className='AirQuality'
			    />
		    </div>
		);
	}
}

export default AirQualityComponent;